import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Music2, SkipBack, SkipForward, Play, Pause, Repeat,
    Shuffle, Wifi, WifiOff, Radio, Loader2, Youtube, ExternalLink,
    Volume2, Volume1, VolumeX
} from 'lucide-react'

const MODE_CONFIG = t => ({
    streaming: { label: t('engine_streaming'), icon: Wifi, color: 'var(--text-muted)' },
    synced: { label: t('engine_synced'), icon: Radio, color: 'var(--primary)' },
    offline: { label: t('engine_offline'), icon: WifiOff, color: 'var(--text-muted)' },
})

const SOUNDCLOUD_CLIENT_ID = import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID || ''

function formatTime(s) {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const secs = Math.floor(s % 60)
    return `${m}:${secs < 10 ? '0' : ''}${secs}`
}

export default function MediaPlayer({ isHost = false, playbackMode = 'streaming', url = '', roomPlaybackState = null, onStateChange = null, portalTo = null, portalKey = '', initialMetadata = null, t = (k) => k }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [metadata, setMetadata] = useState(initialMetadata || {
        title: t('player_default_title'),
        artist: t('player_default_artist'),
        artwork: null,
        platform: null
    })

    // Sync metadata from props if it changes (optimistic updates)
    useEffect(() => {
        if (initialMetadata && initialMetadata.title !== metadata.title) {
            setMetadata(initialMetadata)
        }
    }, [initialMetadata])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [error, setError] = useState(null)
    const [fallbackUrl, setFallbackUrl] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [volume, setVolume] = useState(80)
    const [isMuted, setIsMuted] = useState(false)
    const [portalTarget, setPortalTarget] = useState(null)

    // Detect portal target with robust retry to handle mounting race conditions
    useLayoutEffect(() => {
        if (!portalTo) {
            setPortalTarget(null)
            return
        }

        const findTarget = () => {
            const el = document.querySelector(portalTo)
            if (el) {
                setPortalTarget(el)
                return true
            }
            return false
        }

        // Try immediately
        if (!findTarget()) {
            // Use MutationObserver for robust mounting detection (handles Framer Motion & async rendering)
            const observer = new MutationObserver(() => {
                if (findTarget()) {
                    observer.disconnect()
                }
            })
            observer.observe(document.body, { childList: true, subtree: true })
            return () => observer.disconnect()
        }
    }, [portalTo, portalKey])

    const modes = MODE_CONFIG(t)
    const mode = modes[playbackMode] || modes.streaming
    const ModeIcon = mode.icon

    // Iframe Refs
    const scIframeRef = useRef(null)
    const ytIframeRef = useRef(null)

    // Player Instance Refs
    const scPlayer = useRef(null)
    const ytPlayer = useRef(null)
    const progressInterval = useRef(null)

    // Safely parse URL
    const safeUrl = url || ''
    const isSpotify = safeUrl.includes('spotify.com')
    const isSoundCloud = safeUrl.includes('soundcloud.com')
    const isYouTubeMusic = safeUrl.includes('music.youtube.com')
    const isYouTube = (safeUrl.includes('youtube.com') || safeUrl.includes('youtu.be') || isYouTubeMusic)

    const effectiveUrl = fallbackUrl || safeUrl
    const isEffectiveSoundCloud = effectiveUrl ? effectiveUrl.includes('soundcloud.com') : false
    const isEffectiveYouTube = effectiveUrl ? (effectiveUrl.includes('youtube.com') || effectiveUrl.includes('youtu.be')) : false

    // 1. Fetch Metadata (OEmbed)
    useEffect(() => {
        if (!safeUrl) {
            setMetadata({ title: t('player_default_title'), artist: t('player_default_artist'), artwork: null, platform: null })
            setIsPlaying(false)
            setIsLoaded(false)
            setIsFinished(false)
            return
        }

        const fetchMetadata = async () => {
            setIsLoaded(false)
            setIsFinished(false)
            setError(null)
            setFallbackUrl(null)

            try {
                let endpoint = ''
                if (isSpotify) {
                    endpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(safeUrl)}`
                } else if (isSoundCloud) {
                    endpoint = `https://soundcloud.com/oembed?url=${encodeURIComponent(safeUrl)}&format=json`
                } else if (isYouTube) {
                    endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(safeUrl)}&format=json`
                } else {
                    return
                }

                const res = await fetch(endpoint)
                if (!res.ok) throw new Error('Network response was not ok')
                const data = await res.json()

                setMetadata({
                    title: data.title || 'Unknown Track',
                    artist: data.author_name || (isSpotify ? 'Spotify Artist' : 'Artist'),
                    artwork: data.thumbnail_url || null,
                    platform: isSpotify ? 'spotify' : isSoundCloud ? 'soundcloud' : isYouTubeMusic ? 'youtube-music' : 'youtube'
                })

                if (isSpotify && data.title) {
                    triggerSearchFallback(data.title, data.author_name)
                }

            } catch (err) {
                console.error('Metadata fetch error:', err)
                setError('Failed to fetch track details.')
            }
        }

        const triggerSearchFallback = async (title, artist) => {
            setIsSearching(true)
            try {
                const searchQ = encodeURIComponent(`${title} ${artist || ''} official audio`)
                const searchRes = await fetch(`https://www.youtube.com/results?search_query=${searchQ}`)
                const html = await searchRes.text()

                const vidMatch = html.match(/"videoId":"([^"]+)"/)
                if (vidMatch && vidMatch[1]) {
                    setFallbackUrl(`https://www.youtube.com/watch?v=${vidMatch[1]}`)
                } else if (SOUNDCLOUD_CLIENT_ID) {
                    const scSearchRes = await fetch(`https://api-v2.soundcloud.com/search/tracks?q=${searchQ}&client_id=${SOUNDCLOUD_CLIENT_ID}&limit=1`)
                    const scData = await scSearchRes.json()
                    if (scData.collection?.[0]) {
                        setFallbackUrl(scData.collection[0].permalink_url)
                    }
                }
            } catch (err) {
                console.error('Search fallback error:', err)
            } finally {
                setIsSearching(false)
            }
        }

        fetchMetadata()
    }, [safeUrl])

    // 2. Load External Scripts
    useEffect(() => {
        if (!window.SC && !document.getElementById('sc-sdk')) {
            const scScript = document.createElement('script')
            scScript.id = 'sc-sdk'
            scScript.src = 'https://w.soundcloud.com/player/api.js'
            document.body.appendChild(scScript)
        }
        if (!window.YT && !document.getElementById('yt-sdk')) {
            const ytScript = document.createElement('script')
            ytScript.id = 'yt-sdk'
            ytScript.src = 'https://www.youtube.com/iframe_api'
            document.body.appendChild(ytScript)
        }
    }, [])

    // 3. Initialize Engines
    useEffect(() => {
        if (!effectiveUrl) {
            setIsPlaying(false)
            if (scPlayer.current && scPlayer.current.pause) scPlayer.current.pause()
            if (ytPlayer.current && ytPlayer.current.pauseVideo) ytPlayer.current.pauseVideo()
            return
        }

        // Pause the inactive player
        if (isEffectiveSoundCloud && ytPlayer.current && ytPlayer.current.pauseVideo) ytPlayer.current.pauseVideo()
        if (isEffectiveYouTube && scPlayer.current && scPlayer.current.pause) scPlayer.current.pause()

        if (isEffectiveSoundCloud && scIframeRef.current) {
            const initSC = () => {
                if (!window.SC || !window.SC.Widget) return setTimeout(initSC, 100)

                // If player already exists, just load new url
                if (scPlayer.current) {
                    scPlayer.current.load(effectiveUrl, { auto_play: true, show_artwork: false, visual: false })
                    setIsLoaded(true)
                    return
                }

                const widget = window.SC.Widget(scIframeRef.current)
                scPlayer.current = widget

                widget.bind(window.SC.Widget.Events.READY, () => {
                    widget.load(effectiveUrl, { auto_play: true, show_artwork: false, visual: false })
                    widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true))
                    widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false))
                    widget.bind(window.SC.Widget.Events.FINISH, () => {
                        setIsPlaying(false)
                        setIsFinished(true)
                    })
                    widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e) => setProgress(e.currentPosition / 1000))
                    widget.getDuration(d => { setDuration(d / 1000); setIsLoaded(true) })
                })
            }
            initSC()
        }

        if (isEffectiveYouTube) {
            const videoId = effectiveUrl.includes('v=') ? effectiveUrl.split('v=')[1].split('&')[0] : effectiveUrl.split('/').pop() || ''

            const initYT = () => {
                if (!window.YT || !window.YT.Player) return setTimeout(initYT, 100)

                // If player exists and is functionable, reuse it to prevent React DOM detach issues
                if (ytPlayer.current && typeof ytPlayer.current.loadVideoById === 'function') {
                    try {
                        ytPlayer.current.loadVideoById(videoId)
                        setIsLoaded(true)
                        return
                    } catch (e) { console.error("YT Error reusing:", e) }
                }

                ytPlayer.current = new window.YT.Player(ytIframeRef.current, {
                    height: '0',
                    width: '0',
                    videoId: videoId,
                    playerVars: { autoplay: 1, controls: 0, showinfo: 0, rel: 0 },
                    events: {
                        onReady: (e) => {
                            setDuration(e.target.getDuration())
                            setIsLoaded(true)
                            e.target.playVideo()
                        },
                        onStateChange: (e) => {
                            if (e.data === window.YT.PlayerState.PLAYING) {
                                setIsPlaying(true)
                                setIsFinished(false)
                                setDuration(e.target.getDuration())
                                setIsLoaded(true)
                                startYTTimer()
                            } else if (e.data === window.YT.PlayerState.ENDED) {
                                setIsPlaying(false)
                                setIsFinished(true)
                                stopYTTimer()
                            } else {
                                setIsPlaying(false)
                                stopYTTimer()
                            }
                        }
                    }
                })
            }
            initYT()
        }

        // Important: Do not destroy the players here on url change!
        // Destroying the Youtube player breaks the React DOM and causes a black screen crash.
        // We reuse them via .loadVideoById and .load instead.
        return () => {
            stopYTTimer()
        }
    }, [effectiveUrl, isEffectiveSoundCloud, isEffectiveYouTube])

    // Cleanup on actual unmount
    useEffect(() => {
        return () => {
            if (ytPlayer.current) {
                try { ytPlayer.current.destroy() } catch (e) { }
            }
        }
    }, [])

    const startYTTimer = () => {
        stopYTTimer()
        progressInterval.current = setInterval(() => {
            if (ytPlayer.current && ytPlayer.current.getCurrentTime) {
                try { setProgress(ytPlayer.current.getCurrentTime()) } catch (e) { }
            }
        }, 1000)
    }
    const stopYTTimer = () => {
        if (progressInterval.current) clearInterval(progressInterval.current)
    }

    // 4. Volume Control
    useEffect(() => {
        const v = isMuted ? 0 : volume
        if (scPlayer.current && scPlayer.current.setVolume) scPlayer.current.setVolume(v)
        if (ytPlayer.current && ytPlayer.current.setVolume) ytPlayer.current.setVolume(v)
    }, [volume, isMuted])

    // 5. Notify Parent
    useEffect(() => {
        if (onStateChange) {
            onStateChange({ isPlaying, metadata, isLoaded, progress, duration, isFinished })
        }
    }, [isPlaying, metadata, isLoaded, progress, duration, isFinished])

    // 6. Sync Guest to Host State
    useEffect(() => {
        if (isHost || !roomPlaybackState || !isLoaded) return

        // Sync Play/Pause
        if (roomPlaybackState.isPlaying && !isPlaying) {
            setIsPlaying(true)
            if (isEffectiveSoundCloud && scPlayer.current) scPlayer.current.play()
            if (isEffectiveYouTube && ytPlayer.current) {
                try { ytPlayer.current.playVideo() } catch (e) { }
            }
        } else if (!roomPlaybackState.isPlaying && isPlaying) {
            setIsPlaying(false)
            if (isEffectiveSoundCloud && scPlayer.current) scPlayer.current.pause()
            if (isEffectiveYouTube && ytPlayer.current) {
                try { ytPlayer.current.pauseVideo() } catch (e) { }
            }
        }

        // Sync Progress (Allow 3s drift before forcing seek)
        const expectedProgress = roomPlaybackState.isPlaying
            ? roomPlaybackState.progress + ((Date.now() - roomPlaybackState.updatedAt) / 1000)
            : roomPlaybackState.progress

        if (Math.abs(progress - expectedProgress) > 3) {
            setProgress(expectedProgress)
            if (isEffectiveSoundCloud && scPlayer.current) scPlayer.current.seekTo(expectedProgress * 1000)
            if (isEffectiveYouTube && ytPlayer.current) {
                try { ytPlayer.current.seekTo(expectedProgress, true) } catch (e) { }
            }
        }
    }, [roomPlaybackState, isLoaded])

    const togglePlay = () => {
        if (playbackMode === 'synced' && !isHost) return
        if (isEffectiveSoundCloud && scPlayer.current) scPlayer.current.toggle()
        if (isEffectiveYouTube && ytPlayer.current) {
            const state = ytPlayer.current.getPlayerState()
            if (state === 1) ytPlayer.current.pauseVideo()
            else ytPlayer.current.playVideo()
        }
    }

    const progPct = duration > 0 ? (progress / duration) * 100 : 0

    // Separate UI from Engine to prevent unmounting during Portals
    const engineUI = (
        <>
            <div style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>
                <iframe
                    ref={scIframeRef}
                    id="sc-player"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&show_artwork=false"
                />
                <div ref={ytIframeRef} id="yt-player" />
            </div>

            {isSpotify && isLoaded && (
                <div className="spotify-embed-container">
                    <iframe
                        src={`https://open.spotify.com/embed/track/${safeUrl.split('/').pop()?.split('?')[0]}?utm_source=generator&theme=0`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        style={{ borderRadius: '12px', marginTop: '12px' }}
                    />
                </div>
            )}
        </>
    )

    const playerUI = (
        <div className="mixer-layout">
            <div className="mixer-mode-badge" style={{ color: mode.color }}>
                <ModeIcon size={11} />
                <span>{mode.label}</span>
            </div>

            <div className="mixer-art">
                <AnimatePresence mode="wait">
                    {metadata.artwork ? (
                        <motion.img
                            key={metadata.artwork}
                            src={metadata.artwork}
                            alt="Art"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <motion.div
                            key="placeholder"
                            animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ color: 'var(--primary)', opacity: 0.2 }}
                        >
                            <Music2 size={80} strokeWidth={1} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isLoaded && safeUrl && (
                    <div className="mixer-art-overlay">
                        <Loader2 className="spin" size={32} color="var(--primary)" />
                    </div>
                )}

                <div className="mixer-art-pill">
                    {isSearching ? <Loader2 size={10} className="spin" /> :
                        isYouTubeMusic ? <Youtube size={10} color="#ff0000" /> :
                            fallbackUrl ? <Youtube size={10} color="#ff0000" /> :
                                isSoundCloud ? <Music2 size={10} /> :
                                    <ExternalLink size={10} />}

                    <span>{
                        isSearching ? t('engine_bridging') :
                            isYouTubeMusic ? t('engine_native') :
                                fallbackUrl ? t('engine_bridge') :
                                    isSpotify ? t('engine_preview') : t('engine_streaming')
                    }</span>
                </div>
            </div>

            <div className="mixer-info">
                <div className="mixer-track-meta">
                    <h2 className="mixer-track-title">{metadata.title}</h2>
                    <p className="mixer-track-sub">{metadata.artist}</p>
                </div>

                <div className="mixer-controls">
                    <div className="mixer-controls-group">
                        <button className={`ctrl-btn ${!isHost ? 'ctrl-btn--disabled' : ''}`}><Shuffle size={14} /></button>
                        <button className={`ctrl-btn ${!isHost ? 'ctrl-btn--disabled' : ''}`}><SkipBack size={16} /></button>
                    </div>

                    <motion.button
                        className={`ctrl-btn ctrl-btn--play ${playbackMode === 'synced' && !isHost ? 'ctrl-btn--disabled' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause size={28} fill="currentColor" strokeWidth={0} /> : <Play size={28} fill="currentColor" strokeWidth={0} style={{ marginLeft: 3 }} />}
                    </motion.button>

                    <div className="mixer-controls-group">
                        <button className={`ctrl-btn ${!isHost ? 'ctrl-btn--disabled' : ''}`}><SkipForward size={16} /></button>
                        <button className={`ctrl-btn ${!isHost ? 'ctrl-btn--disabled' : ''}`}><Repeat size={14} /></button>
                    </div>
                </div>

                <div className="mixer-scrubber">
                    <div className="scrubber-track">
                        <motion.div
                            className="scrubber-fill"
                            animate={{ width: `${progPct}%` }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        />
                    </div>
                    <div className="scrubber-times">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="mixer-volume">
                    <button className="vol-btn" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted || volume === 0 ? <VolumeX size={16} /> : volume < 50 ? <Volume1 size={16} /> : <Volume2 size={16} />}
                    </button>
                    <div className="vol-track">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(parseInt(e.target.value))
                                if (isMuted) setIsMuted(false)
                            }}
                            className="vol-slider"
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* ENGINE LAYER: Permanent, non-moving location for iframes */}
            <div className="engine-layer" style={{ position: 'fixed', left: -9999, top: -9999, pointerEvents: 'none' }}>
                {engineUI}
            </div>

            {/* UI LAYER: Can be portalled without affecting audio playback */}
            {portalTarget
                ? createPortal(playerUI, portalTarget)
                : portalTo ? null : playerUI}
        </>
    )
}
