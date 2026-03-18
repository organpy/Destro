import { db } from './firebase'
import {
    doc, setDoc, getDoc, updateDoc, deleteDoc,
    onSnapshot, arrayUnion, arrayRemove, serverTimestamp
} from 'firebase/firestore'

/* ── Room Code Generator ────────────────────── */
function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no I/O/0/1 to avoid confusion
    let code = ''
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
    return `DESTRO-${code}`
}

/* ── Create Room ────────────────────────────── */
export async function createRoom(identity, email) {
    const code = generateRoomCode()
    const memberId = email || `guest-${Date.now()}`

    const roomData = {
        code,
        hostId: memberId,
        hostName: identity.name,
        hostColor: identity.color,
        createdAt: serverTimestamp(),
        syncUrl: '',
        settings: { anyoneCanSync: false, lockRoom: false, autoQueue: true },
        members: [{
            id: memberId,
            name: identity.name,
            color: identity.color,
            isHost: true,
            joinedAt: Date.now()
        }],
        queue: []
    }

    await setDoc(doc(db, 'rooms', code), roomData)
    return code
}

/* ── Join Room ──────────────────────────────── */
export async function joinRoom(code, identity, email) {
    const roomRef = doc(db, 'rooms', code.toUpperCase())
    const snap = await getDoc(roomRef)

    if (!snap.exists()) throw new Error('Room not found. Check the code and try again.')

    const data = snap.data()

    if (data.settings?.lockRoom) throw new Error('This room is locked by the host.')

    const memberId = email || `guest-${Date.now()}`
    const alreadyIn = data.members?.some(m => m.id === memberId)

    if (!alreadyIn) {
        await updateDoc(roomRef, {
            members: arrayUnion({
                id: memberId,
                name: identity.name,
                color: identity.color,
                isHost: false,
                joinedAt: Date.now()
            })
        })
    }

    return { code: data.code, memberId, isHost: data.hostId === memberId }
}

/* ── Leave Room ─────────────────────────────── */
export async function leaveRoom(code, memberId, memberObj) {
    const roomRef = doc(db, 'rooms', code)
    try {
        // arrayRemove needs exact object match, so pass the full member object
        if (memberObj) {
            await updateDoc(roomRef, { members: arrayRemove(memberObj) })
        }
    } catch (err) {
        console.warn('leaveRoom error (room may already be deleted):', err)
    }
}

/* ── End Room (Host Only) ───────────────────── */
export async function endRoom(code) {
    try {
        await deleteDoc(doc(db, 'rooms', code))
    } catch (err) {
        console.warn('endRoom error:', err)
    }
}

/* ── Sync Track URL ─────────────────────────── */
export async function syncTrack(code, url) {
    await updateDoc(doc(db, 'rooms', code), { syncUrl: url, playbackState: { isPlaying: true, progress: 0, updatedAt: Date.now() } })
}

/* ── Sync Playback State ────────────────────── */
export async function syncPlaybackState(code, state) {
    await updateDoc(doc(db, 'rooms', code), { playbackState: { ...state, updatedAt: Date.now() } })
}

/* ── Queue Management ───────────────────────── */
export async function enqueueTrack(code, track) {
    await updateDoc(doc(db, 'rooms', code), {
        queue: arrayUnion(track)
    })
}

export async function updateQueue(code, queueData) {
    await updateDoc(doc(db, 'rooms', code), { queue: queueData })
}

/* ── Update Room Settings ───────────────────── */
export async function updateRoomSettings(code, settings) {
    await updateDoc(doc(db, 'rooms', code), { settings })
}

/* ── Subscribe to Room (Real-time) ──────────── */
export function subscribeToRoom(code, callback) {
    const roomRef = doc(db, 'rooms', code)
    return onSnapshot(roomRef, (snap) => {
        if (snap.exists()) {
            callback({ exists: true, ...snap.data() })
        } else {
            callback({ exists: false })
        }
    }, (err) => {
        console.error('Room subscription error:', err)
        callback({ exists: false, error: err.message })
    })
}
