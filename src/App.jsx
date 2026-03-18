import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, Users, Link as LinkIcon, Music2, X, Minus,
    LayoutDashboard, Library as LibraryIcon, Settings as SettingsIcon,
    LogOut, Copy, Radio, ChevronRight, Download, Wifi, WifiOff,
    CheckCircle2, AlertCircle, Loader2, Trash2, HardDrive, ArrowRight, Mail, UserCircle2, User,
    Check, Plus, Search, Layout, Activity, Bell, Database,
    Share2, Lock, RefreshCw, Coffee, Info, ExternalLink, ShieldCheck, Heart, Github, SlidersHorizontal,
    FolderOpen
} from 'lucide-react'
import MediaPlayer from './components/MediaPlayer'

/* ── Brand SVG Icons ─────────────────────────── */
const SpotifyIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.333a.75.75 0 01-1.031.25c-2.824-1.726-6.378-2.116-10.565-1.16a.75.75 0 01-.334-1.463c4.583-1.047 8.514-.596 11.68 1.342a.75.75 0 01.25 1.031zm1.471-3.271a.937.937 0 01-1.289.308C14.85 12.363 10.8 11.8 7.563 12.75a.937.937 0 11-.527-1.797c3.701-1.085 8.226-.559 11.66 1.82a.937.937 0 01.291 1.289zm.126-3.404C15.548 8.39 10.275 8.213 7.1 9.168A1.125 1.125 0 116.47 7.02c3.6-1.089 9.587-.878 13.375 1.556a1.125 1.125 0 01-1.264 1.86" stroke="none" strokeWidth="0" />
    </svg>
)

const SoundCloudIcon = () => (
    <img src="/assets/soundcloud.png" alt="SoundCloud" width="24" height="24" style={{ objectFit: 'contain' }} />
)

const DiscordIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
    </svg>
)

const GithubIconOfficial = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
)

/* ── Room Service ──────────────────────────── */
import * as roomService from './lib/roomService'

const AUTH_PROVIDERS = [
    { id: 'soundcloud', label: 'SoundCloud', color: '#ff5500', Icon: SoundCloudIcon, desc: 'Stream & sync from SoundCloud', disabled: true },
    { id: 'app', label: 'Destro Account', color: '#6366f1', Icon: Mail, desc: 'Login with Email & Password', disabled: true },
    { id: 'guest', label: 'Guest', color: '#888', Icon: UserCircle2, desc: 'Join rooms only · no saves' },
]

const SPOTIFY_URL = 'https://open.spotify.com'
const SOUNDCLOUD_CLIENT_ID = import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID || ''
const SOUNDCLOUD_REDIRECT = 'http://localhost:5173/callback'
function buildSoundCloudAuthUrl() {
    const params = new URLSearchParams({
        client_id: SOUNDCLOUD_CLIENT_ID,
        redirect_uri: SOUNDCLOUD_REDIRECT,
        response_type: 'code',
    })
    return `https://soundcloud.com/connect?${params}`
}

const AVATAR_COLORS = ['#1ed760', '#9333ea', '#ff007f', '#3b82f6', '#f59e0b', '#ef4444']

/* ── Localization ────────────────────────────── */
const TRANSLATIONS = {
    en: {
        settings: 'Settings', profile: 'ACCOUNT PROFILE', interface: 'INTERFACE VIBE',
        updates: 'UPDATES & LANGUAGE', playback: 'ENGINE & PLAYBACK', system: 'SYSTEM & DATA',
        theme: 'Visual Theme', glass: 'Glass Effects', blobs: 'Mesh Blobs', compact: 'Compact Mode',
        push: 'Push Alerts', language: 'Language', autoNext: 'Auto-Next', normalization: 'Normalization',
        clearHistory: 'Clear Room History', factoryReset: 'Factory Reset App',
        version: 'DESTRO BETA V1.2 • BUILD STABLE', personalize: 'Personalize your presence',
        display_name: 'Display Name', theme_desc: 'Overall color palette',
        glass_desc: 'Frosted glass & blurs', blobs_desc: 'Animated mesh background',
        compact_desc: 'Denser view layouts', push_desc: 'Desktop notifications',
        lang_desc: 'Interface localization', autonext_desc: 'Bridge tracks in playlists',
        norm_desc: 'Consistent loudness levels', clear_desc: 'Wipe your session logs',
        reset_desc: 'Wipe all local data', confirm_clear: 'Clear ALL recently joined rooms?',
        guest: 'Guest Session', home_title: 'Listen Together.',
        home_sub: 'Synchronized music for the people you love. No latency, no compromise.',
        btn_create: 'Create a Room', btn_join: 'Join with Code', btn_browse: 'Browse Library',
        room_sync_placeholder: 'Paste a link to sync the room...', room_sync_btn: 'Sync Room',
        room_host_control: 'Host is controlling playback', room_synced: 'SYNCED',
        room_connected: 'CONNECTED', room_people: 'people', room_copied: 'Copied!',
        room_host: 'Host', room_settings: 'Room Settings', room_leave: 'Leave Room',
        room_end: 'End Session', lib_title: 'Library', lib_tab_playlists: 'Playlists',
        lib_tab_downloads: 'Downloads', lib_tab_history: 'History', lib_new_playlist: 'New Playlist',
        lib_empty_title: 'No playlists yet',
        lib_empty_desc: 'Create your first playlist and add music from YouTube or SoundCloud.',
        lib_all_playlists: 'All Playlists', modal_join_title: 'Join a Session',
        modal_join_sub: 'Enter the room code your host shared with you',
        modal_join_btn: 'Connect Instantly', modal_cancel: 'Cancel', playing: 'PLAYING',
        welcome_title: 'Welcome to Destro',
        welcome_sub: 'The ultimate co-listening platform. Connect your music, share the vibe.',
        welcome_signup_badge: 'New?', welcome_signup_title: 'Get Started',
        welcome_signup_sub: 'Create your identity and start streaming',
        welcome_login_title: 'Welcome Back', welcome_login_sub: 'Log in with your existing account',
        auth_join_title: 'Join Destro', auth_choose_sub_signup: 'Choose how you want to sign up.',
        auth_choose_sub_login: 'Choose your login method.',
        auth_identity_travels: 'Your identity travels with your music.',
        auth_back_welcome: '← Back to Welcome', auth_sign_up: 'Sign Up', auth_sign_in: 'Sign In',
        auth_email_sub_signup: 'Start by entering your email.',
        auth_email_sub_login: 'Enter your email and password.',
        auth_email_placeholder: 'you@example.com', auth_pass_placeholder: '••••••••',
        auth_processing: 'Processing...', auth_send_code: 'Send Code', auth_back: '← Back',
        auth_verify_title: 'Verify Code',
        auth_verify_sub: 'Enter the 6-digit code sent to your email.',
        auth_otp_placeholder: '000000', auth_verifying: 'Verifying...',
        auth_verify_btn: 'Verify Email', auth_change_email: '← Change Email',
        auth_set_pass_title: 'Set Password',
        auth_set_pass_sub: 'Choose a secure password for your account.',
        auth_saving: 'Saving...', auth_complete_signup: 'Complete Signup',
        auth_creating_title: 'Creating your Destro Account...',
        auth_creating_sub: 'Setting up your secure workspace.',
        auth_connecting_sc: 'Connecting SoundCloud...',
        auth_browser_login_sub: 'Please complete the login in your browser.',
        auth_cancel: 'Cancel', auth_onboard_title: 'Set up your identity',
        auth_onboard_sub: 'This is how other listeners will see you in sessions.',
        auth_display_name_label: 'DISPLAY NAME', auth_display_name_placeholder: 'Set your name...',
        auth_color_label: 'PICK YOUR COLOR', auth_enter_lobby: 'Enter the lobby',
        auth_back_choice: '← Back to Choice', nav_active_room: 'Active Room', nav_home: 'Home',
        nav_library: 'Library', nav_settings: 'Settings', nav_sign_out: 'Sign Out',
        nav_guest: 'Guest Account', made_by: 'Made by', engine_streaming: 'STREAMING',
        engine_synced: 'LIVE · SYNCED', engine_offline: 'OFFLINE',
        engine_bridging: 'Bridging Full Audio...', engine_native: 'Native High-Fidelity',
        engine_bridge: 'High-Fidelity Bridge', engine_preview: '30s Preview',
        lib_history_title: 'HEARD IN ROOMS', lib_history_clear: 'Clear all',
        lib_history_empty_title: 'No history yet',
        lib_history_empty_desc: 'Every track that plays while you\'re in a room will appear here automatically.',
        lib_history_demo: 'Preview demo history', lib_vault_empty_title: 'Vault is empty',
        lib_vault_empty_desc: 'Download tracks for offline listening using the input above.',
        lib_vault_used: 'used', time_ago_days: 'd ago', time_ago_hours: 'h ago', time_ago_mins: 'm ago',
        about: 'About Destro', highQuality: 'High Quality', highQuality_desc: 'Maximum audio bitrate',
        discord: 'Discord Integration', discord_desc: 'Show status in Rich Presence',
        autostart: 'Autostart App', autostart_desc: 'Launch when Windows starts',
        hardware: 'Hardware Acceleration', hardware_desc: 'GPU-boosted performance',
        useful: 'USEFUL FEATURES', coffee: 'Support Destro',
        about_tagline: 'Social listening, perfected.',
        about_desc: 'A high-fidelity platform for synchronized music experiences. Built with passion for the community.',
        settings_sub: 'System preferences & account',
        creator_badge: 'Creator & Lead Dev',
        creator_role: 'Design Engineer',
        supporters_badge: 'PROUDLY SUPPORTED & TESTED BY',
        guest_name: 'Guest',
        crossfade: 'Crossfade Songs', crossfade_desc: 'Blend smoothly between tracks',
        crossfade_secs: (n) => `${n}s`,
        automix: 'Automix', automix_desc: 'Seamless auto-transitions on playlists',
        monoAudio: 'Mono Audio', monoAudio_desc: 'Merge left & right into one channel',
        dynamicLoudness: 'Dynamic Loudness', dynamicLoudness_desc: 'Maintain balanced volume levels',
        eq: 'EQUALIZER', eq_desc: 'Shape your sound with a 6-band EQ',
        eq_preset: 'Preset', eq_flat: 'Flat', eq_bass: 'Bass Boost',
        eq_treble: 'Treble Boost', eq_vocal: 'Vocal', eq_electronic: 'Electronic', eq_acoustic: 'Acoustic',
        eq_reset: 'Reset', eq_not_available: 'Not Available Currently', about_copyright: '© 2026 Destro • Created by Aymenzito',
    },
    es: {
        settings: 'Ajustes', profile: 'PERFIL DE CUENTA', interface: 'VIBRACIÓN DE INTERFAZ',
        updates: 'ACTUALIZACIONES E IDIOMA', playback: 'MOTOR Y REPRODUCCIÓN', system: 'SISTEMA Y DATOS',
        theme: 'Tema Visual', glass: 'Efectos de Cristal', blobs: 'Blobs de Malla', compact: 'Modo Compacto',
        push: 'Alertas Push', language: 'Idioma', autoNext: 'Auto-Siguiente', normalization: 'Normalización',
        clearHistory: 'Borrar Historial', factoryReset: 'Restablecimiento de Fábrica',
        version: 'DESTRO V2.0.4 • VERSIÓN ESTABLE', personalize: 'Personaliza tu presencia',
        display_name: 'Nombre de usuario', theme_desc: 'Paleta de colores general',
        glass_desc: 'Cristal esmerilado y desenfoques', blobs_desc: 'Fondo de malla animado',
        compact_desc: 'Diseños de vista más densos', push_desc: 'Notificaciones de escritorio',
        lang_desc: 'Localización de la interfaz', autonext_desc: 'Conectar pistas en listas',
        norm_desc: 'Niveles de volumen constantes', clear_desc: 'Limpiar registros de sesión',
        reset_desc: 'Borrar todos los datos locales', confirm_clear: '¿Borrar TODOS los cuartos recientes?',
        guest: 'Sesión de Invitado', home_title: 'Escuchen Juntos.',
        home_sub: 'Música sincronizada para las personas que amas. Sin latencia, sin compromisos.',
        highQuality: 'Alta Calidad', highQuality_desc: 'Tasa de bits de audio máxima',
        discord: 'Integración de Discord', discord_desc: 'Mostrar estado en Rich Presence',
        autostart: 'Auto-inicio', autostart_desc: 'Iniciar al arrancar Windows',
        hardware: 'Aceleración de Hardware', hardware_desc: 'Rendimiento impulsado por GPU',
        useful: 'CARACTERÍSTICAS ÚTILES', coffee: 'Apoyar a Destro',
        about_tagline: 'Escucha social, perfeccionada.',
        about_desc: 'Una plataforma de alta fidelidad para experiencias musicales sincronizadas. Construida con pasión para la comunidad.',
        about: 'Sobre Destro', settings_sub: 'Preferencias de sistema y cuenta',
        creator_badge: 'Creador y Desarrollador Principal', creator_role: 'Ingeniero de Diseño',
        supporters_badge: 'ORGULLOSAMENTE APOYADO Y PROBADO POR', guest_name: 'Invitado',
        crossfade: 'Fundido Cruzado', crossfade_desc: 'Mezcla suave entre pistas',
        crossfade_secs: (n) => `${n}s`,
        automix: 'Automix', automix_desc: 'Transiciones automáticas en listas',
        monoAudio: 'Audio Mono', monoAudio_desc: 'Combinar canales izquierdo y derecho',
        dynamicLoudness: 'Volumen Dinámico', dynamicLoudness_desc: 'Mantener niveles de volumen equilibrados',
        eq: 'ECUALIZADOR', eq_desc: 'Ajusta tu sonido con un EQ de 6 bandas',
        eq_preset: 'Preset', eq_flat: 'Plano', eq_bass: 'Graves',
        eq_treble: 'Agudos', eq_vocal: 'Vocal', eq_electronic: 'Electrónico', eq_acoustic: 'Acústico',
        eq_reset: 'Restablecer', eq_not_available: 'No Disponible Actualmente', about_copyright: '© 2026 Destro • Creado por Aymenzito',
        btn_create: 'Crear una Sala', btn_join: 'Unirse con Código', btn_browse: 'Explorar Biblioteca',
        room_sync_placeholder: 'Pega un enlace para sincronizar la sala...', room_sync_btn: 'Sincronizar Sala',
        room_host_control: 'El anfitrión controla la reproducción', room_synced: 'SINCRONIZADO',
        room_connected: 'CONECTADO', room_people: 'personas', room_copied: '¡Copiado!',
        room_host: 'Anfitrión', room_settings: 'Ajustes de Sala', room_leave: 'Salir de la Sala',
        room_end: 'Finalizar Sesión', lib_title: 'Biblioteca', lib_tab_playlists: 'Listas',
        lib_tab_downloads: 'Descargas', lib_tab_history: 'Historial', lib_new_playlist: 'Nueva Lista',
        lib_empty_title: 'Aún no hay listas',
        lib_empty_desc: 'Crea tu primera lista y añade música de YouTube o SoundCloud.',
        lib_all_playlists: 'Todas las Listas', modal_join_title: 'Unirse a una Sesión',
        modal_join_sub: 'Ingresa el código de la sala que compartió tu anfitrión',
        modal_join_btn: 'Conectar al Instante', modal_cancel: 'Cancelar', playing: 'REPRODUCIENDO',
        welcome_title: 'Bienvenido a Destro',
        welcome_sub: 'La plataforma definitiva de escucha compartida. Conecta tu música, comparte la vibra.',
        welcome_signup_badge: '¿Nuevo?', welcome_signup_title: 'Empezar',
        welcome_signup_sub: 'Crea tu identidad y comienza a transmitir',
        welcome_login_title: 'Bienvenido de nuevo', welcome_login_sub: 'Inicia sesión con su cuenta existente',
        auth_join_title: 'Unirse a Destro', auth_choose_sub_signup: 'Elige cómo quieres registrarte.',
        auth_choose_sub_login: 'Elige tu método de inicio de sesión.',
        auth_identity_travels: 'Tu identidad viaja con tu música.',
        auth_back_welcome: '← Volver a Bienvenida', auth_sign_up: 'Registrarse',
        auth_sign_in: 'Iniciar sesión', auth_email_sub_signup: 'Comienza ingresando tu correo.',
        auth_email_sub_login: 'Ingresa tu correo y contraseña.',
        auth_email_placeholder: 'tu@ejemplo.com', auth_pass_placeholder: '••••••••',
        auth_processing: 'Procesando...', auth_send_code: 'Enviar código', auth_back: '← Volver',
        auth_verify_title: 'Verificar código',
        auth_verify_sub: 'Ingresa el código de 6 dígitos enviado a tu correo.',
        auth_otp_placeholder: '000000', auth_verifying: 'Verificando...',
        auth_verify_btn: 'Verificar correo', auth_change_email: '← Cambiar correo',
        auth_set_pass_title: 'Establecer contraseña',
        auth_set_pass_sub: 'Elige una contraseña segura para tu cuenta.',
        auth_saving: 'Guardando...', auth_complete_signup: 'Completar registro',
        auth_creating_title: 'Creando tu cuenta de Destro...',
        auth_creating_sub: 'Configurando tu espacio de trabajo seguro.',
        auth_connecting_sc: 'Conectando SoundCloud...',
        auth_browser_login_sub: 'Completa el inicio de sesión en tu navegador.',
        auth_cancel: 'Cancelar', auth_onboard_title: 'Configura tu identidad',
        auth_onboard_sub: 'Así es como otros oyentes te verán en las sesiones.',
        auth_display_name_label: 'NOMBRE DE MOSTRAR', auth_display_name_placeholder: 'Establece tu nombre...',
        auth_color_label: 'ELIGE TU COLOR', auth_enter_lobby: 'Entrar al lobby',
        auth_back_choice: '← Volver a la elección', nav_active_room: 'Sala Activa', nav_home: 'Inicio',
        nav_library: 'Biblioteca', nav_settings: 'Ajustes', nav_sign_out: 'Cerrar sesión',
        nav_guest: 'Cuenta de invitado', made_by: 'Hecho por', engine_streaming: 'TRANSMITIENDO',
        engine_synced: 'VIVO · SINCRONIZADO', engine_offline: 'DESCONECTADO',
        engine_bridging: 'Conectando audio completo...', engine_native: 'Alta fidelidad nativa',
        engine_bridge: 'Puente de alta fidelidad', engine_preview: 'Vista previa de 30s',
        lib_history_title: 'ESCUCHADO EN SALAS', lib_history_clear: 'Borrar todo',
        lib_history_empty_title: 'Sin historial aún',
        lib_history_empty_desc: 'Cada pista que se reproduzca mientras estés en una sala aparecerá aquí automáticamente.',
        lib_history_demo: 'Vista previa del historial demo', lib_vault_empty_title: 'La bóveda está vacía',
        lib_vault_empty_desc: 'Descarga pistas para escuchar sin conexión usando la entrada de arriba.',
        lib_vault_used: 'usado', time_ago_days: 'd antes', time_ago_hours: 'h antes', time_ago_mins: 'm antes',
    },
    pt: {
        settings: 'Configurações', profile: 'PERFIL DA CONTA', interface: 'VIBE DA INTERFACE',
        updates: 'ATUALIZAÇÕES E IDIOMA', playback: 'MOTOR E REPRODUÇÃO', system: 'SISTEMA E DADOS',
        theme: 'Tema Visual', glass: 'Efeitos de Vidro', blobs: 'Blobs de Malha', compact: 'Modo Compacto',
        push: 'Alertas Push', language: 'Idioma', autoNext: 'Próximo Automático', normalization: 'Normalização',
        clearHistory: 'Limpar Histórico', factoryReset: 'Reset de Fábrica',
        version: 'DESTRO V2.0.4 • BUILD ESTÁVEL', personalize: 'Personalize sua presença',
        display_name: 'Nome de Exibição', theme_desc: 'Paleta de cores geral',
        glass_desc: 'Vidro fosco e desfoques', blobs_desc: 'Fundo de malha animado',
        compact_desc: 'Layouts de visualização densos', push_desc: 'Notificações de desktop',
        lang_desc: 'Localização da interface', autonext_desc: 'Ponte entre faixas nas playlists',
        norm_desc: 'Níveis de volume consistentes', clear_desc: 'Limpar logs de sessão',
        reset_desc: 'Limpar todos os dados locais', confirm_clear: 'Limpar TODOS os quartos recentes?',
        guest: 'Sessão de Convidado', home_title: 'Ouçam Juntos.',
        home_sub: 'Música sincronizada para as pessoas que você ama. Sem latência, sem compromisso.',
        about: 'Sobre Destro', settings_sub: 'Preferências do sistema e conta',
        creator_badge: 'Criador e Desenvolvedor Principal', creator_role: 'Engenheiro de Design',
        supporters_badge: 'ORGULHOSAMENTE APOIADO E TESTADO POR', guest_name: 'Visitante',
        crossfade: 'Crossfade', crossfade_desc: 'Transição suave entre faixas',
        crossfade_secs: (n) => `${n}s`,
        automix: 'Automix', automix_desc: 'Transições automáticas em playlists',
        monoAudio: 'Áudio Mono', monoAudio_desc: 'Mesclar canais esquerdo e direito',
        dynamicLoudness: 'Loudness Dinâmico', dynamicLoudness_desc: 'Manter níveis de volume equilibrados',
        eq: 'EQUALIZADOR', eq_desc: 'Ajuste o seu som com EQ de 6 bandas',
        eq_preset: 'Predefinição', eq_flat: 'Plano', eq_bass: 'Graves',
        eq_treble: 'Agudos', eq_vocal: 'Vocal', eq_electronic: 'Eletrônico', eq_acoustic: 'Acústico',
        eq_reset: 'Redefinir', eq_not_available: 'Não Disponível Atualmente', about_copyright: '© 2026 Destro • Criado por Aymenzito',
        btn_create: 'Criar uma Sala', btn_join: 'Entrar com Código', btn_browse: 'Explorar Biblioteca',
        room_sync_placeholder: 'Cole um link para sincronizar a sala...', room_sync_btn: 'Sincronizar Sala',
        room_host_control: 'O anfitrião está controlando a reprodução', room_synced: 'SINCRONIZADO',
        room_connected: 'CONECTADO', room_people: 'pessoas', room_copied: 'Copiado!',
        room_host: 'Anfitrião', room_settings: 'Configurações da Sala', room_leave: 'Sair da Sala',
        room_end: 'Encerrar Sessão', lib_title: 'Biblioteca', lib_tab_playlists: 'Listas',
        lib_tab_downloads: 'Downloads', lib_tab_history: 'Histórico', lib_new_playlist: 'Nova Lista',
        lib_empty_title: 'Nenhuma lista ainda',
        lib_empty_desc: 'Crie sua primeira lista e adicione música do YouTube ou SoundCloud.',
        lib_all_playlists: 'Todas as Listas', modal_join_title: 'Entrar em uma Sessão',
        modal_join_sub: 'Digite o código da sala compartilhado pelo anfitrião',
        modal_join_btn: 'Conectar Instantaneamente', modal_cancel: 'Cancelar', playing: 'REPRODUZINDO',
        welcome_title: 'Bem-vindo ao Destro',
        welcome_sub: 'A plataforma definitiva de audição conjunta. Conecte sua música, compartilhe a vibe.',
        welcome_signup_badge: 'Novo?', welcome_signup_title: 'Começar',
        welcome_signup_sub: 'Crie sua identidade e comece a transmitir',
        welcome_login_title: 'Bem-vindo de volta', welcome_login_sub: 'Faça login com sua conta existente',
        auth_join_title: 'Entrar no Destro', auth_choose_sub_signup: 'Escolha como deseja se inscrever.',
        auth_choose_sub_login: 'Escolha seu método de login.',
        auth_identity_travels: 'Sua identidade viaja com sua música.',
        auth_back_welcome: '← Voltar para Boas-vindas', auth_sign_up: 'Inscrever-se',
        auth_sign_in: 'Entrar', auth_email_sub_signup: 'Comece inserindo seu e-mail.',
        auth_email_sub_login: 'Insira seu e-mail e senha.',
        auth_email_placeholder: 'voce@exemplo.com', auth_pass_placeholder: '••••••••',
        auth_processing: 'Processando...', auth_send_code: 'Enviar código', auth_back: '← Volver',
        auth_verify_title: 'Verificar código',
        auth_verify_sub: 'Insira o código de 6 dígitos enviado para o seu e-mail.',
        auth_otp_placeholder: '000000', auth_verifying: 'Verificando...',
        auth_verify_btn: 'Verificar e-mail', auth_change_email: '← Alterar e-mail',
        auth_set_pass_title: 'Definir senha', auth_set_pass_sub: 'Escolha uma senha segura para sua conta.',
        auth_saving: 'Salvando...', auth_complete_signup: 'Concluir inscrição',
        auth_creating_title: 'Criando sua conta Destro...',
        auth_creating_sub: 'Configurando seu espaço de trabalho seguro.',
        auth_connecting_sc: 'Conectando SoundCloud...',
        auth_browser_login_sub: 'Conclua o login no seu navegador.',
        auth_cancel: 'Cancelar', auth_onboard_title: 'Configure sua identidade',
        auth_onboard_sub: 'É assim que outros ouvintes verão você nas sessões.',
        auth_display_name_label: 'NOME DE EXIBIÇÃO', auth_display_name_placeholder: 'Defina seu nome...',
        auth_color_label: 'ESCOLHA SUA COR', auth_enter_lobby: 'Entrar no lobby',
        auth_back_choice: '← Voltar para escolha', nav_active_room: 'Sala Activa', nav_home: 'Início',
        nav_library: 'Biblioteca', nav_settings: 'Configurações', nav_sign_out: 'Sair',
        nav_guest: 'Conta de convidado', made_by: 'Feito por', engine_streaming: 'TRANSMITINDO',
        engine_synced: 'AO VIVO · SINCRONIZADO', engine_offline: 'OFFLINE',
        engine_bridging: 'Conectando áudio completo...', engine_native: 'Alta Fidelidade Nativa',
        engine_bridge: 'Ponte de Alta Fidelidade', engine_preview: 'Prévia de 30s',
        lib_history_title: 'OUVIDO NAS SALAS', lib_history_clear: 'Limpar tudo',
        lib_history_empty_title: 'Nenhum histórico ainda',
        lib_history_empty_desc: 'Cada faixa que tocar enquanto você estiver em uma sala aparecerá aqui automaticamente.',
        lib_history_demo: 'Prévia do histórico demo', lib_vault_empty_title: 'O cofre está vazio',
        lib_vault_empty_desc: 'Baixe faixas para ouvir offline usando a entrada acima.',
        lib_vault_used: 'usado', time_ago_days: 'd atrás', time_ago_hours: 'h atrás', time_ago_mins: 'm atrás'
    },
    jp: {
        settings: '設定', profile: 'アカウントプロファイル', interface: 'インターフェース設定',
        updates: '更新と言語', playback: 'エンジンと再生', system: 'システムとデータ',
        theme: 'ビジュアルテーマ', glass: 'グラスエフェクト', blobs: 'メッシュブロブ',
        compact: 'コンパクトモード', push: 'プッシュ通知', language: '言語',
        autoNext: '自動再生', normalization: '音量の正規化', clearHistory: '履歴を消去',
        factoryReset: '初期化', version: 'DESTRO V2.0.4 • 安定ビルド',
        personalize: 'プレゼンスをパーソナライズ', display_name: '表示名',
        theme_desc: '全体的なカラーパレット', glass_desc: 'フロストガラスとブラー',
        blobs_desc: 'アニメーションメッシュ背景', compact_desc: 'より密度の高いレイアウト',
        push_desc: 'デスクトップ通知', lang_desc: 'インターフェースのローカライズ',
        autonext_desc: 'プレイリストの曲を繋ぐ', norm_desc: '一定の音量レベル',
        clear_desc: 'セッションログをクリア', reset_desc: 'すべてのローカルデータを削除',
        confirm_clear: '最近参加したすべてのルームを消去しますか？', guest: 'ゲストセッション',
        home_title: '一緒に聴こう。', home_sub: '大切な人と同期された音楽を。遅延なし、妥協なし。',
        highQuality: '高品質', highQuality_desc: '最大オーディオビットレート',
        discord: 'Discord 連携', discord_desc: 'リッチプレゼンスにステータスを表示',
        autostart: '自動起動', autostart_desc: 'Windows起動時に実行',
        hardware: 'ハードウェアアクセラレーション', hardware_desc: 'GPUによるパフォーマンス向上',
        useful: '便利な機能', coffee: 'Destroをサポート',
        about_tagline: 'ソーシャルリスニングの完成形。',
        about_desc: '同期された音楽体験のための高忠実度プラットフォーム。コミュニティへの情熱を持って構築されています。',
        about: 'Destroについて', settings_sub: 'システム設定とアカウント',
        creator_badge: 'クリエイター＆リード開発者', creator_role: 'デザインエンジニア',
        supporters_badge: '誇りを持ってサポートおよびテストされています', guest_name: 'ゲスト',
        crossfade: 'クロスフェード', crossfade_desc: 'トラック間をスムーズにブレンド',
        crossfade_secs: (n) => `${n}秒`,
        automix: 'オートミックス', automix_desc: 'プレイリストの自動トランジション',
        monoAudio: 'モノラル音声', monoAudio_desc: '左右チャンネルを統合',
        dynamicLoudness: 'ダイナミック音量', dynamicLoudness_desc: 'バランスの取れた音量を維持',
        eq: 'イコライザー', eq_desc: '6バンドEQで音をカスタマイズ',
        eq_preset: 'プリセット', eq_flat: 'フラット', eq_bass: '低音ブースト',
        eq_treble: '高音ブースト', eq_vocal: 'ボーカル', eq_electronic: 'エレクトロニック', eq_acoustic: 'アコースティック',
        eq_reset: 'リセット', eq_not_available: '現在利用不可', about_copyright: '© 2026 Destro • Aymenzitoによって作成',
        btn_create: 'ルームを作成', btn_join: 'コードで参加', btn_browse: 'ライブラリを閲覧',
        room_sync_placeholder: 'リンクを貼り付けてルームを同期...', room_sync_btn: 'ルームを同期',
        room_host_control: 'ホストが再生をコントロールしています', room_synced: '同期済み',
        room_connected: '接続済み', room_people: '人', room_copied: 'コピーしました！',
        room_host: 'ホスト', room_settings: 'ルーム設定', room_leave: 'ルームを退出',
        room_end: 'セッションを終了', lib_title: 'ライブラリ', lib_tab_playlists: 'プレイリスト',
        lib_tab_downloads: 'ダウンロード', lib_tab_history: '履歴', lib_new_playlist: '新規プレイリスト',
        lib_empty_title: 'プレイリストがありません',
        lib_empty_desc: '最初のプレイリストを作成して、YouTubeやSoundCloudから音楽を追加しましょう。',
        lib_all_playlists: 'すべてのプレイリスト', modal_join_title: 'セッションに参加',
        modal_join_sub: 'ホストから共有されたルームコードを入力してください',
        modal_join_btn: 'すぐに接続', modal_cancel: 'キャンセル', playing: '再生中',
        welcome_title: 'Destroへようこそ',
        welcome_sub: '究極の共同リスニングプラットフォーム。音楽を繋げ、バイブスを共有しましょう。',
        welcome_signup_badge: '新規？', welcome_signup_title: '始める',
        welcome_signup_sub: 'アイデンティティを作成してストリーミングを開始',
        welcome_login_title: 'おかえりなさい', welcome_login_sub: '既存のアカウントでログイン',
        auth_join_title: 'Destroに参加', auth_choose_sub_signup: '登録方法を選択してください。',
        auth_choose_sub_login: 'ログイン方法を選択してください。',
        auth_identity_travels: 'あなたのアイデンティティは音楽と共に移動します。',
        auth_back_welcome: '← ウェルカム画面に戻る', auth_sign_up: 'サインアップ',
        auth_sign_in: 'サインイン', auth_email_sub_signup: 'まずメールアドレスを入力してください。',
        auth_email_sub_login: 'メールアドレスとパスワードを入力してください。',
        auth_email_placeholder: 'you@example.com', auth_pass_placeholder: '••••••••',
        auth_processing: '処理中...', auth_send_code: 'コードを送信', auth_back: '← 戻る',
        auth_verify_title: 'コードを確認',
        auth_verify_sub: 'メールに送信された6桁のコードを入力してください。',
        auth_otp_placeholder: '000000', auth_verifying: '確認中...',
        auth_verify_btn: 'メールを確認', auth_change_email: '← メールを変更',
        auth_set_pass_title: 'パスワードを設定', auth_set_pass_sub: 'アカウントの安全なパスワードを選択してください。',
        auth_saving: '保存中...', auth_complete_signup: '登録を完了',
        auth_creating_title: 'Destroアカウントを作成中...',
        auth_creating_sub: '安全なワークスペースを設定しています。',
        auth_connecting_sc: 'SoundCloudに接続中...',
        auth_browser_login_sub: 'ブラウザでログインを完了してください。',
        auth_cancel: 'キャンセル', auth_onboard_title: 'アイデンティティを設定',
        auth_onboard_sub: 'セッション中に他のリスナーに表示される名前です。',
        auth_display_name_label: '表示名', auth_display_name_placeholder: '名前を設定...',
        auth_color_label: 'カラーを選択', auth_enter_lobby: 'ロビーに入る',
        auth_back_choice: '← 選択に戻る', nav_active_room: 'アクティブルーム', nav_home: 'ホーム',
        nav_library: 'ライブラリ', nav_settings: '設定', nav_sign_out: 'サインアウト',
        nav_guest: 'ゲストアカウント', made_by: '制作：', engine_streaming: 'ストリーミング',
        engine_synced: 'ライブ・同期中', engine_offline: 'オフライン',
        engine_bridging: 'フルオーディオにブリッジ中...', engine_native: 'ネイティブ高忠実度',
        engine_bridge: '高忠実度ブリッジ', engine_preview: '30秒プレビュー',
        lib_history_title: 'ルームで聴いた曲', lib_history_clear: 'すべて消去',
        lib_history_empty_title: '履歴がありません',
        lib_history_empty_desc: 'ルームにいる間に再生されたすべてのトラックがここに自動的に表示されます。',
        lib_history_demo: 'デモ履歴を表示', lib_vault_empty_title: 'ヴォルトは空です',
        lib_vault_empty_desc: '上の入力欄からオフライン再生用のトラックをダウンロードしてください。',
        lib_vault_used: '使用中', time_ago_days: '日前', time_ago_hours: '時間前', time_ago_mins: '分前'
    },
    fr: {
        settings: 'Paramètres', profile: 'PROFIL DU COMPTE', interface: 'AMBIANCE INTERFACE',
        updates: 'MAJ ET LANGUE', playback: 'MOTEUR ET LECTURE', system: 'SYSTÈME ET DONNÉES',
        theme: 'Thème Visuel', glass: 'Effets de Verre', blobs: 'Blobs de Maillage',
        compact: 'Mode Compact', push: 'Alertes Push', language: 'Langue', autoNext: 'Auto-Suivant',
        normalization: 'Normalisation', clearHistory: 'Effacer l\'historique',
        factoryReset: 'Réinitialisation', version: 'DESTRO V2.0.4 • BUILD STABLE',
        personalize: 'Personnalisez votre présence', display_name: 'Nom d\'affichage',
        theme_desc: 'Palette de couleurs globale', glass_desc: 'Verre dépoli et flous',
        blobs_desc: 'Fond de maillage animé', compact_desc: 'Mises en page plus denses',
        push_desc: 'Notifications de bureau', lang_desc: 'Localisation de l\'interface',
        autonext_desc: 'Lier les pistes dans les playlists', norm_desc: 'Niveaux sonores constants',
        clear_desc: 'Effacer les journaux de session', reset_desc: 'Effacer toutes les données locales',
        confirm_clear: 'Effacer TOUT l\'historique des salons ?', guest: 'Session Invité',
        home_title: 'Écoutez Ensemble.',
        home_sub: 'Musique synchronisée pour les gens que vous aimez. Pas de latence, pas de compromis.',
        highQuality: 'Haute Qualité', highQuality_desc: 'Débit audio maximum',
        discord: 'Intégration Discord', discord_desc: 'Afficher le statut sur Rich Presence',
        autostart: 'Démarrage auto', autostart_desc: 'Lancer au démarrage de Windows',
        hardware: 'Accélération matérielle', hardware_desc: 'Performances boostées par le GPU',
        useful: 'FONCTIONNALITÉS UTILES', coffee: 'Soutenir Destro',
        about_tagline: 'L\'écoute sociale, perfectionnée.',
        about_desc: 'Une plateforme haute fidélité pour des expériences musicales synchronisées. Construite avec passion pour la communauté.',
        about: 'À propos de Destro', settings_sub: 'Préférences système et compte',
        creator_badge: 'Créateur & Développeur Principal', creator_role: 'Ingénieur Design',
        supporters_badge: 'FIÈREMENT SOUTENU ET TESTÉ PAR', guest_name: 'Invité',
        crossfade: 'Fondu Enchaîné', crossfade_desc: 'Transition douce entre les pistes',
        crossfade_secs: (n) => `${n}s`,
        automix: 'Automix', automix_desc: 'Transitions automatiques dans les playlists',
        monoAudio: 'Audio Mono', monoAudio_desc: 'Fusionner gauche et droite en un canal',
        dynamicLoudness: 'Volume Dynamique', dynamicLoudness_desc: 'Maintenir des niveaux de volume équilibrés',
        eq: 'ÉGALISEUR', eq_desc: 'Façonnez votre son avec un EQ 6 bandes',
        eq_preset: 'Préréglage', eq_flat: 'Plat', eq_bass: 'Basses',
        eq_treble: 'Aigus', eq_vocal: 'Vocal', eq_electronic: 'Électronique', eq_acoustic: 'Acoustique',
        eq_reset: 'Réinitialiser', eq_not_available: 'Indisponible Actuellement', about_copyright: '© 2026 Destro • Créé par Aymenzito',
        btn_create: 'Créer un Salon', btn_join: 'Rejoindre avec Code',
        btn_browse: 'Parcourir la Bibliothèque',
        room_sync_placeholder: 'Collez un lien pour synchroniser le salon...',
        room_sync_btn: 'Sync Salon', room_host_control: 'L\'hôte contrôle la lecture',
        room_synced: 'SYNCHRONISÉ', room_connected: 'CONNECTÉ', room_people: 'personnes',
        room_copied: 'Copié !', room_host: 'Hôte', room_settings: 'Paramètres du Salon',
        room_leave: 'Quitter le Salon', room_end: 'Terminer la Session', lib_title: 'Bibliothèque',
        lib_tab_playlists: 'Playlists', lib_tab_downloads: 'Téléchargements', lib_tab_history: 'Historique',
        lib_new_playlist: 'Nouvelle Playlist', lib_empty_title: 'Pas encore de playlists',
        lib_empty_desc: 'Créez votre première playlist et ajoutez de la musique depuis YouTube ou SoundCloud.',
        lib_all_playlists: 'Toutes les Playlists', modal_join_title: 'Rejoindre une Session',
        modal_join_sub: 'Entrez le code du salon partagé par votre hôte',
        modal_join_btn: 'Connexion Instantanée', modal_cancel: 'Annuler', playing: 'LECTURE',
        welcome_title: 'Bienvenue sur Destro',
        welcome_sub: 'La plateforme de co-écoute ultime. Connectez votre musique, partagez l\'ambiance.',
        welcome_signup_badge: 'Nouveau ?', welcome_signup_title: 'Commencer',
        welcome_signup_sub: 'Créez votre identité et commencez à streamer',
        welcome_login_title: 'Bon retour', welcome_login_sub: 'Connectez-vous avec votre compte existant',
        auth_join_title: 'Rejoindre Destro',
        auth_choose_sub_signup: 'Choisissez comment vous souhaitez vous inscrire.',
        auth_choose_sub_login: 'Choisissez votre méthode de connexion.',
        auth_identity_travels: 'Votre identité voyage avec votre musique.',
        auth_back_welcome: '← Retour à l\'accueil', auth_sign_up: 'S\'inscrire',
        auth_sign_in: 'Se connecter', auth_email_sub_signup: 'Commencez par entrer votre e-mail.',
        auth_email_sub_login: 'Entrez votre e-mail et votre mot de passe.',
        auth_email_placeholder: 'vous@exemple.com', auth_pass_placeholder: '••••••••',
        auth_processing: 'Traitement...', auth_send_code: 'Envoyer le code', auth_back: '← Retour',
        auth_verify_title: 'Vérifier le code',
        auth_verify_sub: 'Entrez le code à 6 chiffres envoyé à votre e-mail.',
        auth_otp_placeholder: '000000', auth_verifying: 'Vérification...',
        auth_verify_btn: 'Vérifier l\'e-mail', auth_change_email: '← Modifier l\'e-mail',
        auth_set_pass_title: 'Définir le mot de passe',
        auth_set_pass_sub: 'Choisissez un mot de passe sécurisé pour votre compte.',
        auth_saving: 'Enregistrement...', auth_complete_signup: 'Terminer l\'inscription',
        auth_creating_title: 'Création de votre compte Destro...',
        auth_creating_sub: 'Configuration de votre espace de travail sécurisé.',
        auth_connecting_sc: 'Connexion à SoundCloud...',
        auth_browser_login_sub: 'Veuillez terminer la connexion dans votre navigateur.',
        auth_cancel: 'Annuler', auth_onboard_title: 'Configurez votre identité',
        auth_onboard_sub: 'C\'est ainsi que les autres auditeurs vous verront dans les sessions.',
        auth_display_name_label: 'NOM D\'AFFICHAGE', auth_display_name_placeholder: 'Définissez votre nom...',
        auth_color_label: 'CHOISISSEZ VOTRE COULEUR', auth_enter_lobby: 'Entrer dans le lobby',
        auth_back_choice: '← Retour au choix', nav_active_room: 'Salon Actif', nav_home: 'Accueil',
        nav_library: 'Bibliothèque', nav_settings: 'Paramètres', nav_sign_out: 'Se déconnecter',
        nav_guest: 'Compte Invité', made_by: 'Fait par', engine_streaming: 'STREAMING',
        engine_synced: 'DIRECT · SYNCHRONISÉ', engine_offline: 'HORS LIGNE',
        engine_bridging: 'Pontage vers l\'audio complet...', engine_native: 'Haute Fidélité Native',
        engine_bridge: 'Pont Haute Fidélidade', engine_preview: 'Aperçu de 30s',
        lib_history_title: 'ÉCOUTÉ DANS LES SALONS', lib_history_clear: 'Tout effacer',
        lib_history_empty_title: 'Pas encore d\'historique',
        lib_history_empty_desc: 'Chaque piste jouée pendant que vous êtes dans un salon apparaîtra ici automatiquement.',
        lib_history_demo: 'Aperçu de l\'historique démo', lib_vault_empty_title: 'Le coffre est vide',
        lib_vault_empty_desc: 'Téléchargez des pistes pour une écoute hors ligne en utilisant la saisie ci-dessus.',
        lib_vault_used: 'utilisé', time_ago_days: 'j ago', time_ago_hours: 'h ago', time_ago_mins: 'm ago'
    },
    ar: {
        settings: 'الإعدادات', profile: 'ملف الحساب', interface: 'طابع الواجهة',
        updates: 'التحديثات واللغة', playback: 'المحرك والتشغيل', system: 'النظام والبيانات',
        theme: 'المظهر المرئي', glass: 'تأثيرات الزجاج', blobs: 'خلفية متحركة',
        compact: 'الوضع المضغوط', push: 'تنبيهات النظام', language: 'اللغة',
        autoNext: 'التالي التلقائي', normalization: 'موازنة الصوت', clearHistory: 'مسح السجل',
        factoryReset: 'إعادة ضبط المصنع', version: 'DESTRO V2.0.4 • إصدار مستقر',
        personalize: 'تخصيص حضورك', display_name: 'اسم العرض', theme_desc: 'لوحة الألوان العامة',
        glass_desc: 'زجاج متجمد وضبابية', blobs_desc: 'خلفية شبكية متحركة',
        compact_desc: 'تخطيطات عرض أكثر كثافة', push_desc: 'إشعارات سطح المكتب',
        lang_desc: 'تعريب الواجهة', autonext_desc: 'ربط المسارات في القوائم',
        norm_desc: 'مستويات صوت متسقة', clear_desc: 'مسح سجلات الجلسة',
        reset_desc: 'مسح جميع البيانات المحلية', confirm_clear: 'مسح سجل جميع الغرف المنضم إليها؟',
        guest: 'جلسة ضيف', home_title: 'استمعوا معاً.',
        home_sub: 'موسيقى متزامنة للأشخاص الذين تحبهم. لا تأخير، لا مساومة.',
        highQuality: 'جودة عالية', highQuality_desc: 'أقصى معدل بت للصوت',
        discord: 'التكامل مع ديسكورد', discord_desc: 'إظهار الحالة في التواجد الغني',
        autostart: 'تشغيل تلقائي', autostart_desc: 'التشغيل عند بدء ويندوز',
        hardware: 'تسريع الأجهزة', hardware_desc: 'أداء معزز بواسطة وحدة معالجة الرسومات',
        useful: 'ميزات مفيدة', coffee: 'ادعم Destro',
        about_tagline: 'الاستماع الاجتماعي، منقح.',
        about_desc: 'منصة عالية الدقة للتجارب الموسيقية المتزامنة. مبنية بشغف للمجتمع.',
        about: 'حول Destro', settings_sub: 'تفضيلات النظام والحساب',
        creator_badge: 'المبدع والمطور الرئيسي', creator_role: 'مهندس التصميم',
        supporters_badge: 'مدعوم ومختبر بفخر بواسطة', guest_name: 'ضيف',
        crossfade: 'تلاشي متقاطع', crossfade_desc: 'مزج سلس بين المسارات',
        crossfade_secs: (n) => `${n}ث`,
        automix: 'خلط تلقائي', automix_desc: 'انتقالات تلقائية في قوائم التشغيل',
        monoAudio: 'صوت أحادي', monoAudio_desc: 'دمج القناتين اليسرى واليمنى',
        dynamicLoudness: 'مستوى صوت ديناميكي', dynamicLoudness_desc: 'الحفاظ على مستويات صوت متوازنة',
        eq: 'المعادل الصوتي', eq_desc: 'شكّل صوتك بمعادل 6 نطاقات',
        eq_preset: 'إعداد مسبق', eq_flat: 'مسطح', eq_bass: 'جهير معزز',
        eq_treble: 'حاد معزز', eq_vocal: 'صوت', eq_electronic: 'إلكتروني', eq_acoustic: 'أكوستيك',
        eq_reset: 'إعادة تعيين',
        btn_create: 'إنشاء غرفة', btn_join: 'انضمام عبر الكود', btn_browse: 'تصفح المكتبة',
        room_sync_placeholder: 'الصق الرابط لمزامنة الغرفة...', room_sync_btn: 'مزامنة الغرفة',
        room_host_control: 'المضيف يتحكم في التشغيل', room_synced: 'متزامن',
        room_connected: 'متصل', room_people: 'أشخاص', room_copied: 'تم النسخ!',
        room_host: 'المضيف', room_settings: 'إعدادات الغرفة', room_leave: 'مغادرة الغرفة',
        room_end: 'إنهاء الجلسة', lib_title: 'المكتبة', lib_tab_playlists: 'قوائم التشغيل',
        lib_tab_downloads: 'التنزيلات', lib_tab_history: 'السجل', lib_new_playlist: 'قائمة جديدة',
        lib_empty_title: 'لا توجد قوائم تشغيل بعد',
        lib_empty_desc: 'أنشئ أول قائمة تشغيل وأضف الموسيقى من YouTube أو SoundCloud.',
        lib_all_playlists: 'جميع القوائم', modal_join_title: 'انضمام إلى جلسة',
        modal_join_sub: 'أدخل كود الغرفة الذي شاركه معك المضيف',
        modal_join_btn: 'اتصل فوراً', modal_cancel: 'إلغاء', playing: 'يتم التشغيل',
        welcome_title: 'مرحباً بكم في Destro',
        welcome_sub: 'منصة الاستماع المشترك المثالية. صِل موسيقاك، وشارك الأجواء.',
        welcome_signup_badge: 'جديد؟', welcome_signup_title: 'ابدأ الآن',
        welcome_signup_sub: 'أنشئ هويتك وابدأ البث', welcome_login_title: 'مرحباً بعودتك',
        welcome_login_sub: 'سجل الدخول بحسابك الحالي', auth_join_title: 'انضم إلى Destro',
        auth_choose_sub_signup: 'اختر طريقة التسجيل.', auth_choose_sub_login: 'اختر طريقة تسجيل الدخول.',
        auth_identity_travels: 'هويتك تنتقل مع موسيقاك.', auth_back_welcome: '← العودة إلى البداية',
        auth_sign_up: 'إنشاء حساب', auth_sign_in: 'تسجيل الدخول',
        auth_email_sub_signup: 'ابدأ بإدخال بريدك الإلكتروني.',
        auth_email_sub_login: 'أدخل بريدك الإلكتروني وكلمة المرور.',
        auth_email_placeholder: 'you@example.com', auth_pass_placeholder: '••••••••',
        auth_processing: 'جاري المعالجة...', auth_send_code: 'إرسال الكود', auth_back: '← رجوع',
        auth_verify_title: 'تأكيد الكود',
        auth_verify_sub: 'أدخل الكود المكون من 6 أرقام المرسل إلى بريدك.',
        auth_otp_placeholder: '000000', auth_verifying: 'جاري التأكيد...',
        auth_verify_btn: 'تأكيد البريد', auth_change_email: '← تغيير البريد',
        auth_set_pass_title: 'تعيين كلمة المرور', auth_set_pass_sub: 'اختر كلمة مرور قوية لحسابك.',
        auth_saving: 'جاري الحفظ...', auth_complete_signup: 'إكمال التسجيل',
        auth_creating_title: 'جاري إنشاء حساب Destro الخاص بك...',
        auth_creating_sub: 'إعداد مساحة عملك الآمنة.',
        auth_connecting_sc: 'جاري الاتصال بـ SoundCloud...',
        auth_browser_login_sub: 'يرجى إكمال تسجيل الدخول في متصفحك.',
        auth_cancel: 'إلغاء', auth_onboard_title: 'إعداد هويتك',
        auth_onboard_sub: 'هذه هي الطريقة التي سيراك بها المستمعون الآخرون في الجلسات.',
        auth_display_name_label: 'اسم العرض', auth_display_name_placeholder: 'حدد اسمك...',
        auth_color_label: 'اختر لونك', auth_enter_lobby: 'دخول اللوبي',
        auth_back_choice: '← العودة للاختيار', nav_active_room: 'الغرفة النشطة', nav_home: 'الرئيسية',
        nav_library: 'المكتبة', nav_settings: 'الإعدادات', nav_sign_out: 'تسجيل الخروج',
        nav_guest: 'حساب ضيف', made_by: 'تم صنعها بواسطة', engine_streaming: 'بث مباشر',
        engine_synced: 'مباشر · متزامن', engine_offline: 'أوفلاين',
        engine_bridging: 'جاري ربط الصوت الكامل...', engine_native: 'دقة عالية أصلية',
        engine_bridge: 'جسر الدقة العالية', engine_preview: 'تجربة لمدة 30 ثانية',
        lib_history_title: 'تم الاستماع إليها في الغرف', lib_history_clear: 'مسح الكل',
        lib_history_empty_title: 'لا يوجد سجل بعد',
        lib_history_empty_desc: 'ستظهر هنا تلقائياً كل الأغاني التي تستمع إليها أثناء تواجدك في الغرفة.',
        lib_history_demo: 'معاينة سجل تجريبي', lib_vault_empty_title: 'الخزنة فارغة',
        lib_vault_empty_desc: 'قم بتنزيل الأغاني للاستماع إليها دون اتصال بالإنترنت باستخدام الإدخال أعلاه.',
        lib_vault_used: 'مستخدم', time_ago_days: 'يوم', time_ago_hours: 'ساعة', time_ago_mins: 'دقيقة'
    }
}

/* ── Animations ─────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -8, filter: 'blur(6px)', transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
}
const stagger = { visible: { transition: { staggerChildren: 0.07 } } }

/* ════════════════════════════════════════════
   CYCLING HEADLINE COMPONENT
   Cycles through all language translations of
   "Listen Together." using the same fadeUp
   animation already used across the app.
   ════════════════════════════════════════════ */
const HEADLINE_LANGS = [
    { lang: 'en', text: 'Listen Together.', dir: 'ltr' },
    { lang: 'es', text: 'Escuchen Juntos.', dir: 'ltr' },
    { lang: 'fr', text: 'Écoutez Ensemble.', dir: 'ltr' },
    { lang: 'jp', text: '一緒に聴こう。', dir: 'ltr' },
    { lang: 'pt', text: 'Ouçam Juntos.', dir: 'ltr' },
    { lang: 'ar', text: 'استمعوا معاً.', dir: 'rtl' },
]

function CyclingHeadline({ className }) {
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIdx(prev => (prev + 1) % HEADLINE_LANGS.length)
        }, 2800)
        return () => clearInterval(id)
    }, [])

    const current = HEADLINE_LANGS[idx]

    return (
        /* Fixed height prevents layout shift as text swaps */
        <div style={{ position: 'relative', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
                <motion.h1
                    key={idx}
                    className={className}
                    dir={current.dir}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{
                        opacity: 1, y: 0, filter: 'blur(0px)',
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                    }}
                    exit={{
                        opacity: 0, y: -10, filter: 'blur(6px)',
                        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                    }}
                    style={{ width: '100%', textAlign: 'center', margin: 0 }}
                >
                    {current.text}
                </motion.h1>
            </AnimatePresence>
        </div>
    )
}

/* ════════════════════════════════════════════
   APP
   ════════════════════════════════════════════ */
export default function App() {
    /* Auth & identity */
    const [appState, setAppState] = useState('auth')
    const [authProvider, setAuthProvider] = useState(null)
    const [identity, setIdentity] = useState({ name: '', color: AVATAR_COLORS[0] })
    const [nameInput, setNameInput] = useState('')
    const [isGuestLogin, setIsGuestLogin] = useState(false)

    /* Email OTP flow */
    const [authStep, setAuthStep] = useState('welcome')
    const [isSignup, setIsSignup] = useState(true)
    const [emailInput, setEmailInput] = useState('')
    const [otpInput, setOtpInput] = useState('')
    const [otpLoading, setOtpLoading] = useState(false)
    const [otpError, setOtpError] = useState('')
    const [otpSuccess, setOtpSuccess] = useState('')
    const [oauthLoading, setOauthLoading] = useState(false)
    const [passwordInput, setPasswordInput] = useState('')

    /* Initialization & Connectivity */
    const [isInitializing, setIsInitializing] = useState(true)
    const [isOffline, setIsOffline] = useState(!navigator.onLine)
    const [initStatus, setInitStatus] = useState('Checking environment...')

    /* App views */
    const [view, setView] = useState('home')
    const [isInRoom, setIsInRoom] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [syncInput, setSyncInput] = useState('')
    const [syncUrl, setSyncUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [syncFlash, setSyncFlash] = useState(false)
    const [roomCode, setRoomCode] = useState('')
    const [roomMembers, setRoomMembers] = useState([])
    const [myMemberId, setMyMemberId] = useState('')
    const [joinCodeInput, setJoinCodeInput] = useState('')
    const [joinError, setJoinError] = useState('')
    const [joinLoading, setJoinLoading] = useState(false)
    const roomUnsubRef = useRef(null)
    const [playerState, setPlayerState] = useState({ isPlaying: false, metadata: {}, isLoaded: false, progress: 0, duration: 0, isFinished: false })
    const [roomPlaybackState, setRoomPlaybackState] = useState(null)
    const [roomQueue, setRoomQueue] = useState([])
    const roomQueueRef = useRef([])
    useEffect(() => { roomQueueRef.current = roomQueue }, [roomQueue])

    // Tabbed Sidebar State
    const [activeSideTab, setActiveSideTab] = useState('members')

    const lastSyncedState = useRef({ isPlaying: false, progress: 0 })

    const handlePlayerStateChange = (state) => {
        setPlayerState(state)

        // Host controls playback sync and auto-advance
        if (isHost && roomCode) {

            // Queue Auto-Advance
            if (state.isFinished && roomSettings.autoQueue && roomQueueRef.current.length > 0) {
                console.log('Auto-advancing to next track in queue...')
                const nextTrack = roomQueueRef.current[0]
                const newQueue = roomQueueRef.current.slice(1)
                setRoomQueue(newQueue)
                roomService.updateQueue(roomCode, newQueue)
                roomService.syncTrack(roomCode, nextTrack.url)
                setSyncUrl(nextTrack.url)
                return
            }

            if (state.isLoaded) {
                const last = lastSyncedState.current
                const isPlayingChanged = state.isPlaying !== last.isPlaying
                const hasScrubbed = Math.abs(state.progress - last.progress) > 3
                // Resync state if playing changed, scrubbed, or every 15s to fix drift
                if (isPlayingChanged || hasScrubbed || (state.isPlaying && Math.abs(state.progress - last.progress) > 15)) {
                    lastSyncedState.current = { isPlaying: state.isPlaying, progress: state.progress }
                    roomService.syncPlaybackState(roomCode, { isPlaying: state.isPlaying, progress: state.progress })
                }
            }
        }
    }

    /* Download state */
    const [dlUrl, setDlUrl] = useState('')
    const [dlState, setDlState] = useState('idle') // idle, validating, preview, downloading, done, error
    const [dlProgress, setDlProgress] = useState(0)
    const [dlError, setDlError] = useState('')
    const [scannedTrack, setScannedTrack] = useState(null)
    const [offlineTracks, setOfflineTracks] = useState(() => {
        try { return JSON.parse(localStorage.getItem('destro_vault') || '[]') } catch { return [] }
    })
    const [showOfflinePanel, setShowOfflinePanel] = useState(false)
    const dlTimerRef = useRef(null)

    /* Library v2 state */
    const [activeLibTab, setActiveLibTab] = useState('playlists')
    const [playlists, setPlaylists] = useState(() => {
        try { return JSON.parse(localStorage.getItem('destro_playlists') || '[]') } catch { return [] }
    })
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
    const [newPlaylistName, setNewPlaylistName] = useState('')
    const [openPlaylistId, setOpenPlaylistId] = useState(null)
    const [addTrackUrl, setAddTrackUrl] = useState('')
    const [addTrackState, setAddTrackState] = useState('idle')
    const [addTrackError, setAddTrackError] = useState('')
    const [roomHistory, setRoomHistory] = useState(() => {
        try { return JSON.parse(localStorage.getItem('destro_history') || '[]') } catch { return [] }
    })
    const [libWarning, setLibWarning] = useState('')

    const handleLibraryPlay = (trackOrUrl) => {
        if (isInRoom) {
            setLibWarning("You can't play library tracks while listening to a room. Leave the room first!")
            setTimeout(() => setLibWarning(''), 4000)
            return
        }

        const url = typeof trackOrUrl === 'string' ? trackOrUrl : trackOrUrl.url
        const meta = typeof trackOrUrl === 'object' ? {
            title: trackOrUrl.name || trackOrUrl.title,
            artist: trackOrUrl.artist || trackOrUrl.author,
            artwork: trackOrUrl.thumbnail,
            platform: trackOrUrl.source
        } : null

        setSyncUrl(url)
        setPlaybackMode('streaming')

        // If we have metadata, we can optimistically update the player state
        if (meta) {
            setPlayerState(prev => ({
                ...prev,
                metadata: { ...prev.metadata, ...meta },
                isLoaded: false
            }))
        }
    }

    /* Settings state */
    const DEFAULT_EQ_BANDS = [0, 0, 0, 0, 0, 0]
    const EQ_PRESETS = {
        flat: [0, 0, 0, 0, 0, 0],
        bass: [6, 5, 2, 0, -1, -2],
        treble: [-2, -1, 0, 3, 5, 6],
        vocal: [-2, 0, 4, 4, 2, -1],
        electronic: [4, 3, 0, -1, 3, 5],
        acoustic: [3, 2, 1, 0, 1, 2],
    }

    const [settings, setSettings] = useState(() => {
        const DEFAULTS = {
            // Appearance
            theme: 'deep-space', glassMode: true, bgAnimations: false, compactMode: false,
            // Playback
            autoNext: true, highQuality: true, volumeNormalization: true,
            crossfade: false, crossfadeSecs: 5,
            automix: false, monoAudio: false, dynamicLoudness: false,
            eqEnabled: false, eqPreset: 'flat', eqBands: [...DEFAULT_EQ_BANDS],
            // System
            desktopPush: false, language: 'en',
            discordRPC: true, autostart: false, hardwareAccel: true,
            downloadPath: '',
        }
        try {
            const saved = localStorage.getItem('destro_settings')
            if (saved) {
                const parsed = JSON.parse(saved)
                const merged = { ...DEFAULTS, ...parsed }
                if (!Array.isArray(merged.eqBands) || merged.eqBands.length !== 6) {
                    merged.eqBands = [...DEFAULT_EQ_BANDS]
                }
                return merged
            }
        } catch {}
        return DEFAULTS
    })

    const t = (key, ...args) => {
        const val = TRANSLATIONS[settings.language]?.[key]
        if (typeof val === 'function') return val(...args)
        return val || key
    }

    useEffect(() => { localStorage.setItem('destro_playlists', JSON.stringify(playlists)) }, [playlists])
    useEffect(() => { localStorage.setItem('destro_vault', JSON.stringify(offlineTracks)) }, [offlineTracks])
    useEffect(() => { localStorage.setItem('destro_history', JSON.stringify(roomHistory)) }, [roomHistory])
    useEffect(() => { localStorage.setItem('destro_settings', JSON.stringify(settings)) }, [settings])



    const fetchTrackMeta = async (url) => {
        const isYT = url.includes('youtube.com') || url.includes('youtu.be')
        const isSC = url.includes('soundcloud.com')
        if (!isYT && !isSC) throw new Error('Only YouTube or SoundCloud links are supported.')
        const endpoint = isYT
            ? `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
            : `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`
        const res = await fetch(endpoint)
        if (!res.ok) throw new Error('Could not load track info. Check the link.')
        const data = await res.json()
        return {
            title: data.title || 'Unknown Title',
            author: data.author_name || 'Unknown Artist',
            thumbnail: data.thumbnail_url || null,
            source: isYT ? 'youtube' : 'soundcloud',
        }
    }

    const createPlaylist = () => {
        const name = newPlaylistName.trim()
        if (!name) return
        const newPl = {
            id: Date.now().toString(), name, tracks: [],
            color: ['#1ed760', '#6366f1', '#f59e0b', '#ef4444', '#06b6d4'][Math.floor(Math.random() * 5)],
            createdAt: Date.now()
        }
        setPlaylists(prev => [newPl, ...prev])
        setNewPlaylistName('')
        setShowCreatePlaylist(false)
        setOpenPlaylistId(newPl.id)
    }

    const deletePlaylist = (id) => {
        setPlaylists(prev => prev.filter(p => p.id !== id))
        if (openPlaylistId === id) setOpenPlaylistId(null)
    }

    const addTrackToPlaylist = async (playlistId) => {
        const url = addTrackUrl.trim()
        if (!url) return
        setAddTrackState('adding')
        setAddTrackError('')
        try {
            const meta = await fetchTrackMeta(url)
            const track = {
                id: Date.now().toString(), url, title: meta.title, author: meta.author,
                thumbnail: meta.thumbnail, source: meta.source, addedAt: Date.now()
            }
            setPlaylists(prev => prev.map(p => p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p))
            setAddTrackUrl('')
            setAddTrackState('done')
            setTimeout(() => setAddTrackState('idle'), 1800)
        } catch (err) {
            setAddTrackError(err.message)
            setAddTrackState('error')
            setTimeout(() => setAddTrackState('idle'), 3000)
        }
    }

    const removeTrackFromPlaylist = (playlistId, trackId) => {
        setPlaylists(prev => prev.map(p => p.id === playlistId ? { ...p, tracks: p.tracks.filter(t => t.id !== trackId) } : p))
    }

    const saveHistoryToPlaylist = (entry, playlistId) => {
        const track = { id: Date.now().toString(), url: entry.url || '', title: entry.title, author: entry.roomCode, thumbnail: null, source: 'room', addedAt: Date.now() }
        setPlaylists(prev => prev.map(p => p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p))
    }

    const [playbackMode, setPlaybackMode] = useState('streaming')

    useEffect(() => {
        const handleOnline = () => setIsOffline(false)
        const handleOffline = () => setIsOffline(true)
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        const statuses = ['Verifying protocols...', 'Connecting to Destro Grid...', 'Scanning library...', 'Establishing handshake...']
        let statusIdx = 0
        const statusInterval = setInterval(() => {
            if (statusIdx < statuses.length) { setInitStatus(statuses[statusIdx]); statusIdx++ }
        }, 600)
        const initTimer = setTimeout(() => { setIsInitializing(false); clearInterval(statusInterval) }, 2800)
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            clearTimeout(initTimer)
            clearInterval(statusInterval)
        }
    }, [])

    useEffect(() => {
        const path = window.location.pathname
        const params = new URLSearchParams(window.location.search)
        const hash = window.location.hash
        if (path === '/callback' || params.has('code') || hash.includes('access_token')) {
            setOauthLoading(false)
            setAppState('onboarding')
            window.history.replaceState({}, document.title, "/")
        }
    }, [])

    const handleControl = (action) => {
        if (window.electronAPI) window.electronAPI.sendControl(action)
    }

    const openExternalLink = (url) => {
        if (window.electronAPI?.openExternal) { window.electronAPI.openExternal(url) }
        else { window.open(url, '_blank', 'noopener,noreferrer') }
    }

    const handleAuth = (provider) => {
        setAuthProvider(provider)
        if (provider.id === 'guest') {
            setIsGuestLogin(true)
            setNameInput('')
            setIdentity({ name: '', color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)] })
            setAuthStep('guest-onboarding')
        } else if (provider.id === 'soundcloud') {
            setOauthLoading(true)
            openExternalLink(buildSoundCloudAuthUrl())
        } else if (provider.id === 'app') {
            setAuthStep('email-input')
            setEmailInput('')
            setPasswordInput('')
            setOtpError('')
        }
    }

    const startSignup = () => { setIsSignup(true); setAuthStep('choose') }
    const startLogin = () => { setIsSignup(false); setAuthStep('choose') }

    const handleSendOtp = () => {
        if (!emailInput.includes('@')) { setOtpError('Enter a valid email.'); return }
        setOtpLoading(true); setOtpError('')
        setTimeout(() => { setOtpLoading(false); setAuthStep('otp-input') }, 1200)
    }

    const handleVerifyOtp = () => {
        if (otpInput.length < 6) { setOtpError('Enter the 6-digit code.'); return }
        setOtpLoading(true); setOtpError('')
        setTimeout(() => { setOtpLoading(false); setAuthStep('password-input') }, 800)
    }

    const handleAuthSubmit = async () => {
        if (!emailInput.includes('@')) { setOtpError('Enter a valid email.'); return }
        if (passwordInput.length < 6) { setOtpError('Password must be at least 6 chars.'); return }
        setOtpLoading(true); setOtpError('')
        try {
            const { auth, db } = await import('./lib/firebase')
            const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth')
            const { doc, getDoc } = await import('firebase/firestore')
            if (isSignup) {
                setAuthStep('loading')
                try {
                    await createUserWithEmailAndPassword(auth, emailInput.toLowerCase(), passwordInput)
                    setTimeout(() => { setAppState('onboarding'); setOtpLoading(false) }, 1000)
                } catch (err) {
                    if (err.code === 'auth/email-already-in-use') setOtpError('Email already in use. Please sign in.')
                    else setOtpError('Signup failed. ' + err.message)
                    setAuthStep('password-input'); setOtpLoading(false)
                }
            } else {
                try {
                    const userCred = await signInWithEmailAndPassword(auth, emailInput.toLowerCase(), passwordInput)
                    const userDoc = await getDoc(doc(db, 'users', emailInput.toLowerCase()))
                    if (userDoc.exists()) { setIdentity(userDoc.data()) }
                    else setAppState('onboarding')
                } catch (err) { setOtpError('Invalid email or password.') }
                finally { setOtpLoading(false) }
            }
        } catch (err) { console.error(err); setOtpError('Auth error. Please try again.'); setOtpLoading(false) }
    }

    const handleOnboardingDone = async () => {
        if (!nameInput.trim()) return
        const finalIdentity = { name: nameInput.trim(), color: identity.color }
        setIdentity(finalIdentity)
        if (isGuestLogin) { setAppState('app'); return }
        try {
            const { db } = await import('./lib/firebase')
            const { doc, setDoc } = await import('firebase/firestore')
            await setDoc(doc(db, 'users', emailInput.toLowerCase()), {
                name: finalIdentity.name, color: finalIdentity.color,
                email: emailInput.toLowerCase(), createdAt: new Date().toISOString()
            })
            setAppState('app')
        } catch (err) {
            console.error("Save error:", err)
            if (err.code === 'auth/email-already-in-use') { setOtpError('Email already in use.'); setAppState('auth'); setAuthStep('email-input') }
            else setAppState('app')
        }
    }

    const subscribeRoom = (code) => {
        if (roomUnsubRef.current) roomUnsubRef.current()
        roomUnsubRef.current = roomService.subscribeToRoom(code, (data) => {
            if (!data.exists) {
                // Room was deleted (host ended session)
                setIsInRoom(false); setIsHost(false); setView('home'); setPlaybackMode('streaming')
                setRoomCode(''); setRoomMembers([]); setSyncUrl('')
                setPlayerState({ isPlaying: false, metadata: {}, isLoaded: false, progress: 0, duration: 0 })
                if (roomUnsubRef.current) { roomUnsubRef.current(); roomUnsubRef.current = null }
                return
            }
            setRoomMembers(data.members || [])
            setRoomSettings(data.settings || { anyoneCanSync: false, lockRoom: false, autoQueue: true })
            if (data.syncUrl && data.syncUrl !== syncUrl) {
                setSyncUrl(data.syncUrl)
            }
            if (!isHost && data.playbackState) {
                setRoomPlaybackState(data.playbackState)
            }
            setRoomQueue(data.queue || [])
        })
    }

    const handleCreateRoom = async () => {
        try {
            setView('room') // show loading state immediately
            const code = await roomService.createRoom(identity, emailInput)
            setRoomCode(code)
            setMyMemberId(emailInput || `guest-${Date.now()}`)
            setIsInRoom(true); setIsHost(true); setPlaybackMode('synced')
            subscribeRoom(code)
        } catch (err) {
            console.error('Create room error:', err)
            alert('Failed to create room: ' + err.message + '\n\nThis is likely a Firestore security rules issue. Make sure your Firestore rules allow writes to the "rooms" collection.')
            setView('home')
        }
    }

    const handleLeaveRoom = async () => {
        if (isHost) {
            await roomService.endRoom(roomCode)
        } else {
            const myObj = roomMembers.find(m => m.id === myMemberId)
            await roomService.leaveRoom(roomCode, myMemberId, myObj)
        }
        if (roomUnsubRef.current) { roomUnsubRef.current(); roomUnsubRef.current = null }
        setIsInRoom(false); setIsHost(false); setView('home'); setPlaybackMode('streaming')
        setRoomCode(''); setRoomMembers([]); setSyncUrl('')
        setPlayerState({ isPlaying: false, metadata: {}, isLoaded: false, progress: 0, duration: 0 })
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode).catch(() => { })
        setCopied(true); setTimeout(() => setCopied(false), 2000)
    }

    const handleJoinRoom = async () => {
        const code = joinCodeInput.trim().toUpperCase()
        if (!code) { setJoinError('Enter a room code.'); return }
        setJoinLoading(true); setJoinError('')
        try {
            const result = await roomService.joinRoom(code, identity, emailInput)
            setRoomCode(result.code)
            setMyMemberId(result.memberId)
            setIsInRoom(true); setIsHost(result.isHost); setView('room'); setPlaybackMode('synced')
            setShowJoinModal(false); setJoinCodeInput('')
            subscribeRoom(result.code)
        } catch (err) {
            setJoinError(err.message)
        } finally {
            setJoinLoading(false)
        }
    }

    const handleSync = async () => {
        if (!syncInput.trim()) return
        setSyncFlash(true); setTimeout(() => setSyncFlash(false), 2000)
        if (roomCode) {
            try {
                await roomService.syncTrack(roomCode, syncInput)
                setSyncInput('')
            } catch (err) { console.error('Sync error:', err) }
        }
    }

    const [isQueueing, setIsQueueing] = useState(false)
    const handleEnqueue = async () => {
        if (!syncInput.trim()) return

        // Prevent duplicate queue URLs
        if (roomQueue.some(t => t.url === syncInput)) {
            alert('This track is already in the queue!')
            return
        }

        setIsQueueing(true)
        if (roomCode) {
            try {
                const meta = await fetchTrackMeta(syncInput)
                const track = {
                    id: Date.now().toString(), url: syncInput, title: meta.title, author: meta.author,
                    thumbnail: meta.thumbnail, source: meta.source, addedBy: identity?.name || 'Guest'
                }
                await roomService.enqueueTrack(roomCode, track)
                setSyncInput('') // clear input after queuing
            } catch (err) {
                console.error('Queue error:', err)
                alert('Could not add to queue: ' + err.message)
            }
        }
        setIsQueueing(false)
    }

    const removeQueueTrack = async (trackId) => {
        if (!isHost && !roomSettings.anyoneCanSync) return
        const newQueue = roomQueue.filter(t => t.id !== trackId)
        setRoomQueue(newQueue)
        await roomService.updateQueue(roomCode, newQueue)
    }

    const playQueueTrackNext = async (track, index) => {
        if (!isHost && !roomSettings.anyoneCanSync) return
        // remove from queue, sync immediately
        const newQueue = [...roomQueue]
        newQueue.splice(index, 1)
        setRoomQueue(newQueue)
        await roomService.updateQueue(roomCode, newQueue)

        setSyncUrl(track.url)
        await roomService.syncTrack(roomCode, track.url)
    }

    const handleRoomSettingsChange = async (key) => {
        const updated = { ...roomSettings, [key]: !roomSettings[key] }
        setRoomSettings(updated)
        if (roomCode) {
            try { await roomService.updateRoomSettings(roomCode, updated) } catch (err) { console.error('Settings error:', err) }
        }
    }

    const [showJoinModal, setShowJoinModal] = useState(false)
    const [showRoomSettings, setShowRoomSettings] = useState(false)
    const [roomSettings, setRoomSettings] = useState({ anyoneCanSync: false, lockRoom: false, autoQueue: true })

    const handleDownload = async () => {
        if (!dlUrl.trim()) return
        if (!settings.downloadPath) {
            setDlError("Please set a Vault Directory in Settings → Storage first.")
            setDlState('error')
            return
        }
        const isValid = dlUrl.includes('youtube.com') || dlUrl.includes('youtu.be') || dlUrl.includes('soundcloud.com')
        if (!isValid) { setDlError("URL not supported. Try YouTube or SoundCloud."); setDlState('error'); return }

        setDlState('validating')
        setDlError('')
        setScannedTrack(null)

        try {
            // Use noembed to get real track metadata (no API key, no CORS issues)
            const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(dlUrl)}`)
            const data = await res.json()
            if (!data || data.error || !data.title) throw new Error('Could not read track info')

            // Estimate MP3 size from duration if available, else random 4–9 MB
            const durationSec = data.duration || null
            const estimatedMb = durationSec ? ((durationSec * 128) / 8 / 1024).toFixed(1) : (Math.random() * 5 + 4).toFixed(1)

            setScannedTrack({
                name: data.title,
                artist: data.author_name || 'Unknown Artist',
                thumbnail: data.thumbnail_url || null,
                size: `~${estimatedMb} MB`,
                source: dlUrl.includes('soundcloud') ? 'soundcloud' : 'youtube',
                url: dlUrl
            })
            setDlState('preview')
        } catch (err) {
            console.error('Scan error:', err)
            setDlError('Could not scan this URL. Make sure it is a valid public YouTube or SoundCloud link.')
            setDlState('error')
        }
    }

    const confirmDownload = () => {
        setDlState('downloading')
        setDlProgress(0)
        let p = 0
        dlTimerRef.current = setInterval(() => {
            p += Math.random() * 18
            if (p >= 100) {
                p = 100
                clearInterval(dlTimerRef.current)
                setDlProgress(100)
                setDlState('done')
                setOfflineTracks(prev => [...prev, {
                    id: Date.now(),
                    name: scannedTrack?.name || 'Downloaded Track',
                    artist: scannedTrack?.artist || 'Unknown Artist',
                    thumbnail: scannedTrack?.thumbnail || null,
                    size: scannedTrack?.size || '~5 MB',
                    source: scannedTrack?.source || 'youtube',
                    url: scannedTrack?.url || ''
                }])
                setDlUrl('')
                setTimeout(() => { setDlState('idle'); setScannedTrack(null) }, 2500)
            } else {
                setDlProgress(Math.min(p, 99))
            }
        }, 300)
    }

    const deleteOfflineTrack = (id) => { setOfflineTracks(prev => prev.filter(t => t.id !== id)) }

    /* ════════════════════════════════════════
       GLOBAL LOADING & OFFLINE GUARD
       ════════════════════════════════════════ */
    if (isOffline) return (
        <div className="app-root">
            <div className="mesh-bg"><div className="blob blob-green" style={{ opacity: 0.05 }} /></div>
            <div className="offline-screen">
                <motion.div className="offline-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="offline-icon-wrap"><WifiOff size={32} /></div>
                    <h1 className="offline-title">Connection Lost</h1>
                    <p className="offline-desc">Destro requires an active internet connection to sync your music and connect to the grid.</p>
                    <button className="btn-primary" onClick={() => setIsOffline(!navigator.onLine)} style={{ marginTop: 12 }}>Retry Connection</button>
                </motion.div>
            </div>
        </div>
    )

    if (isInitializing) return (
        <div className="app-root">
            <div className="splash-screen">
                <motion.div className="splash-logo-wrap"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="splash-ring" />
                    <Music2 size={32} color="var(--primary)" strokeWidth={2.5} />
                </motion.div>
                <div className="splash-content">
                    <motion.div className="splash-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Destro</motion.div>
                    <motion.div className="splash-status" key={initStatus} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{initStatus}</motion.div>
                </div>
            </div>
        </div>
    )

    /* ════════════════════════════════════════
       MAIN APP RENDER
       ════════════════════════════════════════ */
    return (
        <div className={`app-root theme-${settings.theme || 'deep-space'} vibe-${settings.glassMode ? 'glass' : 'flat'} ${settings.compactMode ? 'compact' : ''} ${!settings.bgAnimations ? 'anim-disabled' : ''}`}>
            <AnimatePresence>
                {settings.bgAnimations && (
                    <motion.div className="mesh-bg" aria-hidden
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(40px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(40px)', transition: { duration: 0.6 } }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="blob blob-green" />
                        <div className="blob blob-purple" />
                        <div className="blob blob-pink" />
                        <div className="blob blob-extra-1" />
                        <div className="blob blob-extra-2" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Title Bar */}
            <header className="titlebar">
                <div className="titlebar-logo">
                    <Music2 size={16} strokeWidth={2.5} color="var(--primary)" />
                    <span>DESTRO <span style={{ opacity: 0.4, fontWeight: 400, margin: '0 4px' }}>|</span> <span style={{ opacity: 0.6, fontWeight: 500, fontSize: 10 }}>Made by Aymenzito</span></span>
                </div>
                <div className="titlebar-controls">
                    <button onClick={() => handleControl('minimize')}><Minus size={14} /></button>
                    <button className="btn-close" onClick={() => handleControl('close')}><X size={14} /></button>
                </div>
            </header>

            <div className="app-body">
                {appState === 'app' && (
                    <aside className="sidebar">
                        <div className="sidebar-nav">
                            {isInRoom ? (
                                <button className={`nav-btn ${view === 'room' ? 'active' : ''}`} onClick={() => setView('room')}>
                                    <Radio size={18} /><span>{t('nav_active_room')}</span>
                                    <span className="nav-live-badge">SYNC</span>
                                </button>
                            ) : (
                                <button className={`nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
                                    <LayoutDashboard size={18} /><span>{t('nav_home')}</span>
                                </button>
                            )}
                            <button className={`nav-btn ${view === 'library' ? 'active' : ''}`} onClick={() => setView('library')}>
                                <LibraryIcon size={18} /><span>{t('nav_library')}</span>
                                {offlineTracks.length > 0 && <span className="nav-live-badge">{offlineTracks.length}</span>}
                            </button>
                            <button className={`nav-btn ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
                                <SettingsIcon size={18} /><span>{t('nav_settings')}</span>
                            </button>
                        </div>
                        <div className="sidebar-footer">
                            <button onClick={() => openExternalLink('https://ko-fi.com/aymenzito')} className="coffee-premium-card" style={{ width: '100%', textAlign: 'left' }}>
                                <div className="coffee-card-header">
                                    <Coffee size={14} />
                                    <span>{t('coffee')}</span>
                                </div>
                                <p className="coffee-card-sub">Support the project & keep the music playing</p>
                            </button>
                            <div className="member-row" style={{ background: 'transparent', border: 'none', padding: '10px 4px' }}>
                                <div className="member-avatar" style={{ background: (identity?.color || '#5b5bd6') + '22', borderColor: (identity?.color || '#5b5bd6') + '44' }}>
                                    <span style={{ color: identity?.color || '#5b5bd6' }}>{identity?.name?.[0]?.toUpperCase() || '?'}</span>
                                </div>
                                <div className="member-info">
                                    <span className="member-name">{identity?.name || 'User'}</span>
                                    <span className="member-name" style={{ fontSize: 10, opacity: 0.5 }}>{emailInput || t('nav_guest')}</span>
                                </div>
                            </div>
                            <button className="nav-btn danger" onClick={() => {
                                setIsInitializing(true); setAppState('auth');
                                setTimeout(() => setIsInitializing(false), 2000);
                                setIdentity({ name: '', color: AVATAR_COLORS[0] }); setIsInRoom(false);
                                setAuthStep('welcome');
                                setSyncUrl(''); setPlayerState({ isPlaying: false, metadata: {}, isLoaded: false, progress: 0, duration: 0 }); setPlaybackMode('streaming');
                            }}>
                                <LogOut size={18} /><span>{t('nav_sign_out')}</span>
                            </button>
                        </div>
                    </aside>
                )}

                <main className="main-content">
                    <AnimatePresence mode="wait">

                        {/* ───── AUTH SCREEN ───── */}
                        {appState === 'auth' && (
                            <motion.div key="auth" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%', position: 'relative', background: 'transparent' }}>
                                <div className="auth-screen" style={{ background: 'transparent' }}>
                                    <AnimatePresence mode="wait">

                                        {authStep === 'welcome' && (
                                            <motion.div key="welcome" className="auth-minimal" initial="hidden" animate="visible" exit="exit" variants={stagger}>
                                                <motion.div variants={fadeUp} className="auth-header-minimal">
                                                    <div className="auth-logo">
                                                        <div className="auth-logo-mark"><Music2 size={22} strokeWidth={2.5} color="var(--primary)" /></div>
                                                        <span style={{ fontSize: 18, letterSpacing: 3 }}>DESTRO</span>
                                                    </div>
                                                    <h1 style={{ marginTop: 24, fontSize: 44 }}>{t('welcome_title')}</h1>
                                                    <p>{t('welcome_sub')}</p>
                                                </motion.div>
                                                <motion.div variants={fadeUp} className="welcome-row">
                                                    <button className="welcome-card signup" onClick={startSignup}>
                                                        <div className="welcome-badge">{t('welcome_signup_badge')}</div>
                                                        <div className="welcome-icon-box"><Play size={24} fill="currentColor" /></div>
                                                        <h3>{t('welcome_signup_title')}</h3>
                                                        <p>{t('welcome_signup_sub')}</p>
                                                    </button>
                                                    <button className="welcome-card login" onClick={startLogin}>
                                                        <div className="welcome-icon-box"><User size={24} /></div>
                                                        <h3>{t('welcome_login_title')}</h3>
                                                        <p>{t('welcome_login_sub')}</p>
                                                    </button>
                                                </motion.div>
                                            </motion.div>
                                        )}

                                        {authStep === 'choose' && (
                                            <motion.div key="choose" className="auth-minimal" initial="hidden" animate="visible" exit="exit" variants={stagger}>
                                                <motion.div variants={fadeUp} className="auth-header-minimal">
                                                    <div className="auth-logo">
                                                        <div className="auth-logo-mark"><Music2 size={22} strokeWidth={2.5} color="var(--primary)" /></div>
                                                        <span style={{ fontSize: 18, letterSpacing: 3 }}>DESTRO</span>
                                                    </div>
                                                    <h1 style={{ marginTop: 20 }}>{t('auth_join_title')}</h1>
                                                    <p>{isSignup ? t('auth_choose_sub_signup') : t('auth_choose_sub_login')}<br />{t('auth_identity_travels')}</p>
                                                </motion.div>
                                                <motion.div variants={fadeUp} className="auth-row">
                                                    {AUTH_PROVIDERS.filter(p => isSignup ? p.id !== 'spotify' : true).map(p => {
                                                        const IconComp = p.Icon
                                                        return (
                                                            <motion.button key={p.id}
                                                                className={`auth-card-horizontal ${p.disabled ? 'disabled' : ''}`}
                                                                onClick={() => !p.disabled && handleAuth(p)}
                                                                whileHover={p.disabled ? {} : { y: -8 }}
                                                                whileTap={p.disabled ? {} : { scale: 0.95 }}
                                                                style={{ '--card-accent': p.color }}
                                                                disabled={p.disabled}>
                                                                <div className="auth-card-icon-wrap" style={{ background: p.color + '22', borderColor: p.color + '33' }}>
                                                                    {p.id === 'spotify' || p.id === 'soundcloud' ? <IconComp /> : <IconComp size={24} strokeWidth={1.5} color="white" />}
                                                                </div>
                                                                <span className="auth-card-label">{p.label}</span>
                                                                <span className="auth-card-desc">{p.desc}</span>
                                                            </motion.button>
                                                        )
                                                    })}
                                                </motion.div>
                                                <motion.button variants={fadeUp} className="auth-back" onClick={() => setAuthStep('welcome')} style={{ marginTop: 20 }}>
                                                    {t('auth_back_welcome')}
                                                </motion.button>
                                            </motion.div>
                                        )}

                                        {authStep === 'email-input' && (
                                            <motion.div key="email-input" className="auth-minimal" initial="hidden" animate="visible" exit="exit" variants={stagger}>
                                                <motion.div variants={fadeUp} className="auth-header-minimal">
                                                    <div className="auth-logo">
                                                        <div className="auth-logo-mark"><Music2 size={22} strokeWidth={2.5} color="var(--primary)" /></div>
                                                        <span style={{ fontSize: 18, letterSpacing: 3 }}>DESTRO</span>
                                                    </div>
                                                    <h1 style={{ marginTop: 20 }}>{isSignup ? t('auth_sign_up') : t('auth_sign_in')}</h1>
                                                    <p>{isSignup ? t('auth_email_sub_signup') : t('auth_email_sub_login')}</p>
                                                </motion.div>
                                                <div className="auth-form">
                                                    <motion.input variants={fadeUp} className="auth-text-input" type="email"
                                                        placeholder={t('auth_email_placeholder')} value={emailInput}
                                                        onChange={e => { setEmailInput(e.target.value); setOtpError('') }}
                                                        onKeyDown={e => e.key === 'Enter' && (isSignup ? handleSendOtp() : handleAuthSubmit())} autoFocus />
                                                    {!isSignup && (
                                                        <motion.input variants={fadeUp} className="auth-text-input" type="password"
                                                            placeholder={t('auth_pass_placeholder')} value={passwordInput}
                                                            onChange={e => { setPasswordInput(e.target.value); setOtpError('') }}
                                                            style={{ marginTop: 12 }} onKeyDown={e => e.key === 'Enter' && handleAuthSubmit()} />
                                                    )}
                                                    {otpError && <motion.div variants={fadeUp} className="auth-error"><AlertCircle size={13} />{otpError}</motion.div>}
                                                    <motion.button variants={fadeUp} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                                                        onClick={isSignup ? handleSendOtp : handleAuthSubmit} disabled={otpLoading}>
                                                        {otpLoading ? <Loader2 size={16} className="spin" /> : (isSignup ? <ArrowRight size={16} /> : <CheckCircle2 size={16} />)}
                                                        {otpLoading ? t('auth_processing') : (isSignup ? t('auth_send_code') : t('auth_sign_in'))}
                                                    </motion.button>
                                                    <motion.button variants={fadeUp} className="auth-back-btn" onClick={() => { setAuthStep('choose'); setOtpError(''); setPasswordInput(''); setEmailInput('') }}>
                                                        {t('auth_back')}
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {authStep === 'otp-input' && (
                                            <motion.div key="otp-input" className="auth-minimal" initial="hidden" animate="visible" exit="exit" variants={stagger}>
                                                <motion.div variants={fadeUp} className="auth-header-minimal">
                                                    <div className="auth-logo">
                                                        <div className="auth-logo-mark"><Music2 size={22} strokeWidth={2.5} color="var(--primary)" /></div>
                                                        <span style={{ fontSize: 18, letterSpacing: 3 }}>DESTRO</span>
                                                    </div>
                                                    <h1 style={{ marginTop: 20 }}>{t('auth_verify_title')}</h1>
                                                    <p>{t('auth_verify_sub')}</p>
                                                </motion.div>
                                                <div className="auth-form">
                                                    <motion.input variants={fadeUp} className="auth-text-input" type="text"
                                                        placeholder={t('auth_otp_placeholder')} maxLength={6} value={otpInput}
                                                        onChange={e => { setOtpInput(e.target.value); setOtpError('') }}
                                                        onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()} autoFocus />
                                                    {otpError && <motion.div variants={fadeUp} className="auth-error"><AlertCircle size={13} />{otpError}</motion.div>}
                                                    <motion.button variants={fadeUp} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                                                        onClick={handleVerifyOtp} disabled={otpLoading}>
                                                        {otpLoading ? <Loader2 size={16} className="spin" /> : <CheckCircle2 size={16} />}
                                                        {otpLoading ? t('auth_verifying') : t('auth_verify_btn')}
                                                    </motion.button>
                                                    <motion.button variants={fadeUp} className="auth-back-btn" onClick={() => { setAuthStep('email-input'); setOtpError(''); setOtpInput('') }}>
                                                        {t('auth_change_email')}
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {authStep === 'password-input' && (
                                            <motion.div key="password-input" className="auth-minimal" initial="hidden" animate="visible" exit="exit" variants={stagger}>
                                                <motion.div variants={fadeUp} className="auth-header-minimal">
                                                    <div className="auth-logo">
                                                        <div className="auth-logo-mark"><Music2 size={22} strokeWidth={2.5} color="var(--primary)" /></div>
                                                        <span style={{ fontSize: 18, letterSpacing: 3 }}>DESTRO</span>
                                                    </div>
                                                    <h1 style={{ marginTop: 20 }}>{t('auth_set_pass_title')}</h1>
                                                    <p>{t('auth_set_pass_sub')}</p>
                                                </motion.div>
                                                <div className="auth-form">
                                                    <motion.input variants={fadeUp} className="auth-text-input" type="password"
                                                        placeholder="••••••••" value={passwordInput}
                                                        onChange={e => { setPasswordInput(e.target.value); setOtpError('') }}
                                                        onKeyDown={e => e.key === 'Enter' && handleAuthSubmit()} autoFocus />
                                                    {otpError && <motion.div variants={fadeUp} className="auth-error"><AlertCircle size={13} />{otpError}</motion.div>}
                                                    <motion.button variants={fadeUp} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                                                        onClick={handleAuthSubmit} disabled={otpLoading}>
                                                        {otpLoading ? <Loader2 size={16} className="spin" /> : <ArrowRight size={16} />}
                                                        {otpLoading ? t('auth_saving') : t('auth_complete_signup')}
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {authStep === 'loading' && (
                                            <motion.div key="loading" className="auth-minimal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                                                    <Loader2 className="animate-spin text-primary" size={48} />
                                                    <h2 style={{ fontSize: 22, fontWeight: 800 }}>{isSignup ? t('auth_creating_title') : t('auth_processing')}</h2>
                                                    <p style={{ opacity: 0.6 }}>{isSignup ? t('auth_creating_sub') : t('auth_processing')}</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        {oauthLoading && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="auth-loading-overlay">
                                                <Loader2 className="animate-spin text-primary" size={40} />
                                                <div style={{ textAlign: 'center' }}>
                                                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>{t('auth_connecting_sc')}</h2>
                                                    <p style={{ opacity: 0.6, fontSize: 13, marginTop: 4 }}>{t('auth_browser_login_sub')}</p>
                                                    <button onClick={() => setOauthLoading(false)} style={{ marginTop: 20, padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer' }}>
                                                        {t('auth_cancel')}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {authStep === 'guest-onboarding' && (
                                            <motion.div key="guest-onboarding" className="auth-minimal guest-setup-compact" initial="hidden" animate="visible" exit="exit" variants={stagger}>
                                                <motion.div variants={fadeUp} className="auth-header-minimal">
                                                    <div className="auth-logo">
                                                        <div className="auth-logo-mark"><Music2 size={22} strokeWidth={2} color="var(--primary)" /></div>
                                                        <span style={{ fontSize: 18, letterSpacing: 3 }}>DESTRO</span>
                                                    </div>
                                                    <h1 style={{ marginTop: 12, marginBottom: 4, fontSize: 26, fontWeight: 900 }}>{t('auth_onboard_title')}</h1>
                                                    <p style={{ opacity: 0.6, fontSize: 13 }}>{t('auth_onboard_sub')}</p>
                                                </motion.div>
                                                <motion.div variants={fadeUp} className="onboard-avatar-preview" style={{ background: identity.color + '22', borderColor: identity.color + '55', margin: '4px 0' }}>
                                                    <span style={{ color: identity.color, fontSize: 32, fontWeight: 900 }}>{nameInput ? nameInput[0].toUpperCase() : '?'}</span>
                                                </motion.div>
                                                <div className="onboard-form" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                    <motion.div variants={fadeUp} className="onboard-section">
                                                        <label className="onboard-label">{t('auth_display_name_label')}</label>
                                                        <input className="auth-text-input" placeholder={t('auth_display_name_placeholder')}
                                                            style={{ textAlign: 'center', fontWeight: 'bold' }} value={nameInput}
                                                            onChange={e => { const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16); setNameInput(val) }}
                                                            onKeyDown={e => e.key === 'Enter' && !!nameInput.trim() && handleOnboardingDone()} autoFocus />
                                                    </motion.div>
                                                    <motion.div variants={fadeUp} className="onboard-section">
                                                        <label className="onboard-label">{t('auth_color_label')}</label>
                                                        <div className="color-grid">
                                                            {AVATAR_COLORS.map(c => (
                                                                <button key={c} className={`color-dot ${identity.color === c ? 'active' : ''}`}
                                                                    style={{ background: c }} onClick={() => setIdentity(prev => ({ ...prev, color: c }))} />
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={fadeUp} className="onboard-actions">
                                                        <button className="btn-primary" onClick={handleOnboardingDone} disabled={!nameInput.trim()}>{t('auth_enter_lobby')}</button>
                                                        <button className="btn-ghost" onClick={() => setAuthStep('choose')} style={{ marginTop: 4, opacity: 0.6 }}>{t('auth_back_choice')}</button>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {/* ───── MAIN APP VIEW ───── */}
                        {appState === 'app' && (
                            <motion.div key="app-view" style={{ width: '100%', height: '100%' }} variants={fadeUp} initial="hidden" animate="visible" exit="exit">

                                {/* ══ HOME VIEW ══ */}
                                {view === 'home' && (
                                    <motion.div key="home" className="view view-home" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                                        <motion.div className="home-inner" variants={stagger} initial="hidden" animate="visible">

                                            {/* ── Branding block with CYCLING HEADLINE ── */}
                                            <motion.div variants={fadeUp} className="home-branding">
                                                <div className="home-logo-mark">
                                                    <Music2 size={26} strokeWidth={2} color="var(--primary)" />
                                                </div>

                                                {/*
                                                    CyclingHeadline replaces the static <h1>{t('home_title')}</h1>.
                                                    It rotates through all 6 language translations every 2.8s
                                                    using the exact same blur+fadeUp animation used across the app.
                                                */}
                                                <CyclingHeadline className="home-title" />

                                                <p className="home-sub">{t('home_sub')}</p>
                                            </motion.div>

                                            <motion.div variants={fadeUp} className="home-actions">
                                                <button className="btn-primary" onClick={handleCreateRoom}>
                                                    <Play size={16} fill="black" strokeWidth={0} />{t('btn_create')}
                                                </button>
                                                <button className="btn-secondary" onClick={() => setShowJoinModal(true)}>
                                                    <Users size={16} />{t('btn_join')}
                                                </button>
                                                <button className="btn-ghost" onClick={() => setView('library')}>
                                                    <LibraryIcon size={16} />{t('nav_library')}<ChevronRight size={13} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* ══ ROOM VIEW ══ */}
                                {view === 'room' && isInRoom && (
                                    <motion.div key="room" className={`view view-room ${settings.compactMode ? 'compact' : ''}`} variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                                        {isHost || roomSettings.anyoneCanSync ? (
                                            <div className="sync-bar">
                                                <LinkIcon size={15} color="var(--primary)" />
                                                <input className="sync-input" type="text" placeholder={t('room_sync_placeholder')} value={syncInput} onChange={e => setSyncInput(e.target.value)} />
                                                <button className="sync-btn" onClick={handleSync}>{syncFlash ? <CheckCircle2 size={13} /> : t('room_sync_btn')}</button>
                                                <button
                                                    className="sync-btn-outline"
                                                    onClick={handleEnqueue} disabled={isQueueing}
                                                    style={{ marginLeft: 6 }}
                                                >
                                                    {isQueueing ? <Loader2 size={13} className="spin" /> : 'Queue'}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="sync-bar sync-bar--participant">
                                                <Radio size={15} color="var(--primary)" />
                                                <span className="sync-status">{t('room_host_control')}</span>
                                                <div className="sync-live-indicator"><span className="live-dot" /><span>{t('room_synced')}</span></div>
                                            </div>
                                        )}
                                        <div className="room-grid">
                                            <div className="panel player-panel">
                                                <div id="player-portal-anchor" className="player-portal-anchor" style={{ height: '100%', minHeight: 400 }} />
                                            </div>
                                            <div className="panel people-panel" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                                                {/* Tabs Header */}
                                                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', position: 'relative' }}>
                                                    <button
                                                        onClick={() => setActiveSideTab('members')}
                                                        style={{
                                                            flex: 1, padding: '16px 0', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                                                            background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative',
                                                            color: activeSideTab === 'members' ? 'var(--primary)' : 'var(--text-muted)'
                                                        }}
                                                    >
                                                        Members
                                                        {activeSideTab === 'members' && (
                                                            <motion.div
                                                                layoutId="tab-slider"
                                                                style={{ position: 'absolute', bottom: -1, left: '20%', right: '20%', height: 2, background: 'var(--primary)', borderRadius: '2px 2px 0 0' }}
                                                            />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveSideTab('queue')}
                                                        style={{
                                                            flex: 1, padding: '16px 0', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                                                            background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative',
                                                            color: activeSideTab === 'queue' ? 'var(--primary)' : 'var(--text-muted)'
                                                        }}
                                                    >
                                                        Queue <span style={{ opacity: 0.6 }}>({roomQueue.length})</span>
                                                        {activeSideTab === 'queue' && (
                                                            <motion.div
                                                                layoutId="tab-slider"
                                                                style={{ position: 'absolute', bottom: -1, left: '20%', right: '20%', height: 2, background: 'var(--primary)', borderRadius: '2px 2px 0 0' }}
                                                            />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Tab Content */}
                                                <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                                                    {activeSideTab === 'members' ? (
                                                        <>
                                                            <div className="people-header" style={{ padding: 0, marginBottom: 16, border: 'none' }}>
                                                                <div>
                                                                    <p className="panel-label">{t('room_connected')}</p>
                                                                    <p className="people-count">{roomMembers.length} {t('room_people')}</p>
                                                                </div>
                                                                <button className="code-chip" onClick={handleCopyCode}>
                                                                    <span>{roomCode}</span><Copy size={11} />
                                                                    {copied && <span className="copied-flash">{t('room_copied')}</span>}
                                                                </button>
                                                            </div>
                                                            <div className="members-list">
                                                                {roomMembers.map(m => (
                                                                    <div key={m.id} className="member-row">
                                                                        <div className="member-avatar" style={{ background: m.color + '22', borderColor: m.color + '44' }}>
                                                                            <span style={{ color: m.color }}>{m.name[0]}</span>
                                                                        </div>
                                                                        <div className="member-info">
                                                                            <span className="member-name">{m.name}</span>
                                                                            {m.isHost && <span className="host-tag">{t('room_host')}</span>}
                                                                        </div>
                                                                        <div className="member-status-dot" style={{ background: m.color }} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="queue-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                            {roomQueue.length === 0 ? (
                                                                <div style={{ padding: '32px 0', textAlign: 'center', opacity: 0.4, fontSize: 13 }}>
                                                                    The queue is empty.<br />Add a track above!
                                                                </div>
                                                            ) : (
                                                                roomQueue.map((track, idx) => (
                                                                    <div key={track.id} className="queue-item" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                                                                        <div style={{ display: 'flex', gap: 10 }}>
                                                                            <div style={{ width: 24, fontSize: 16, fontWeight: 800, opacity: 0.2, textAlign: 'center' }}>
                                                                                {idx + 1}
                                                                            </div>
                                                                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                                                                <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }}>
                                                                                    {track.title}
                                                                                </div>
                                                                                <div style={{ opacity: 0.6, fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.author}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                                                                            <div style={{ fontSize: 10, opacity: 0.4, textTransform: 'uppercase', letterSpacing: 1 }}>
                                                                                {track.addedBy}
                                                                            </div>
                                                                            {(isHost || roomSettings.anyoneCanSync) && (
                                                                                <div style={{ display: 'flex', gap: 6 }}>
                                                                                    <button className="action-btn" style={{ padding: '4px 10px', fontSize: 11, background: 'var(--primary-glow)', color: 'white', border: 'none' }} onClick={() => playQueueTrackNext(track, idx)}>
                                                                                        Play
                                                                                    </button>
                                                                                    <button className="action-btn action-btn--danger" style={{ padding: '4px' }} onClick={() => removeQueueTrack(track.id)} title="Remove">
                                                                                        <X size={12} />
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="people-footer" style={{ borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {isHost
                                                        ? <>
                                                            <button className="panel-full-btn" onClick={() => setShowRoomSettings(true)}>
                                                                <SettingsIcon size={16} style={{ marginRight: 8 }} /> {t('room_settings')}
                                                            </button>
                                                            <button className="panel-full-btn panel-full-btn--danger" onClick={handleLeaveRoom}>
                                                                <LogOut size={16} style={{ marginRight: 8 }} /> {t('room_end')}
                                                            </button>
                                                        </>
                                                        : <button className="panel-full-btn panel-full-btn--danger" onClick={handleLeaveRoom}>
                                                            <LogOut size={16} style={{ marginRight: 8 }} /> {t('room_leave')}
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* ROOM SETTINGS MODAL */}
                                        <AnimatePresence>
                                            {showRoomSettings && (
                                                <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRoomSettings(false)}>
                                                    <motion.div className="modal-box" initial={{ scale: 0.94, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.94, y: 16, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
                                                        <div className="modal-icon"><SettingsIcon size={22} color="var(--primary)" /></div>
                                                        <h2 className="modal-title">{t('room_settings')}</h2>
                                                        <p className="modal-sub" style={{ marginBottom: 16 }}>Configure how your room behaves</p>
                                                        <div className="settings-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 0 }}>
                                                            <div className="settings-row" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                                <Share2 size={18} color="var(--primary)" style={{ opacity: 0.8 }} />
                                                                <div className="settings-row-info" style={{ flex: 1 }}><h4 className="settings-row-title">Anyone Can Sync</h4><p className="settings-row-desc">Let all members paste links</p></div>
                                                                <button className={`settings-toggle ${roomSettings.anyoneCanSync ? 'active' : ''}`} onClick={() => handleRoomSettingsChange('anyoneCanSync')}><div className="toggle-thumb" /></button>
                                                            </div>
                                                            <div className="settings-divider" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                                                            <div className="settings-row" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                                <Lock size={18} color="var(--primary)" style={{ opacity: 0.8 }} />
                                                                <div className="settings-row-info" style={{ flex: 1 }}><h4 className="settings-row-title">Lock Room</h4><p className="settings-row-desc">Prevent new members from joining</p></div>
                                                                <button className={`settings-toggle ${roomSettings.lockRoom ? 'active' : ''}`} onClick={() => handleRoomSettingsChange('lockRoom')}><div className="toggle-thumb" /></button>
                                                            </div>
                                                            <div className="settings-divider" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                                                            <div className="settings-row" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                                <RefreshCw size={18} color="var(--primary)" style={{ opacity: 0.8 }} />
                                                                <div className="settings-row-info" style={{ flex: 1 }}><h4 className="settings-row-title">Auto-Queue</h4><p className="settings-row-desc">Automatically play next track</p></div>
                                                                <button className={`settings-toggle ${roomSettings.autoQueue ? 'active' : ''}`} onClick={() => handleRoomSettingsChange('autoQueue')}><div className="toggle-thumb" /></button>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                                                            <button className="modal-btn-done" onClick={() => setShowRoomSettings(false)}>Done</button>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                {/* ══ LIBRARY VIEW ══ */}
                                {view === 'library' && (
                                    <motion.div key="library" className={`view view-library ${settings.compactMode ? 'compact' : ''}`} variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                                        <AnimatePresence>
                                            {libWarning && (
                                                <motion.div className="library-warning-toast" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                                                    <AlertCircle size={14} /><span>{libWarning}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className="view-header lib2-header">
                                            <div className="view-header-inner lib2-header-inner">
                                                <div className="view-title-block lib2-title-block">
                                                    <h2 className="view-title lib2-title">{t('lib_title')}</h2>
                                                    <span className="view-subtitle lib2-subtitle">{playlists.length} {t('lib_tab_playlists').toLowerCase()}</span>
                                                </div>
                                                <div className="lib2-tab-bar">
                                                    {[
                                                        { id: 'playlists', label: t('lib_tab_playlists'), icon: <Music2 size={13} /> },
                                                        { id: 'downloads', label: t('lib_tab_downloads'), icon: <HardDrive size={13} /> },
                                                        { id: 'history', label: t('lib_tab_history'), icon: <Radio size={13} /> },
                                                    ].map(tab => (
                                                        <button key={tab.id} className={`lib2-tab ${activeLibTab === tab.id ? 'active' : ''}`} onClick={() => setActiveLibTab(tab.id)}>
                                                            {tab.icon}<span>{tab.label}</span>
                                                            {tab.id === 'downloads' && offlineTracks.length > 0 && <span className="lib2-badge">{offlineTracks.length}</span>}
                                                            {tab.id === 'history' && roomHistory.length > 0 && <span className="lib2-badge">{roomHistory.length}</span>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lib2-body">
                                            <AnimatePresence mode="wait">
                                                {activeLibTab === 'playlists' && (
                                                    <motion.div key="playlists" className="lib2-content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                                                        <AnimatePresence mode="wait">
                                                            {openPlaylistId ? (() => {
                                                                const pl = playlists.find(p => p.id === openPlaylistId)
                                                                if (!pl) { setOpenPlaylistId(null); return null }
                                                                return (
                                                                    <motion.div key={`pl-detail-${pl.id}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
                                                                        <div className="pl-detail-header">
                                                                            <button className="pl-back-btn" onClick={() => { setOpenPlaylistId(null); setAddTrackUrl(''); setAddTrackState('idle') }}>
                                                                                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /><span>{t('lib_all_playlists')}</span>
                                                                            </button>
                                                                            <div className="pl-detail-title-row">
                                                                                <div className="pl-detail-icon" style={{ background: `${pl.color}20`, borderColor: `${pl.color}40` }}>
                                                                                    <Music2 size={28} style={{ color: pl.color }} />
                                                                                </div>
                                                                                <div>
                                                                                    <h2 className="pl-detail-name">{pl.name}</h2>
                                                                                    <p className="pl-detail-sub">{pl.tracks.length} track{pl.tracks.length !== 1 ? 's' : ''}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="add-track-row">
                                                                            <div className="add-track-input-wrap">
                                                                                <LinkIcon size={14} className="add-track-icon" />
                                                                                <input className="add-track-input" type="text" placeholder={t('room_sync_placeholder')}
                                                                                    value={addTrackUrl} onChange={e => { setAddTrackUrl(e.target.value); setAddTrackState('idle'); setAddTrackError('') }}
                                                                                    onKeyDown={e => e.key === 'Enter' && addTrackToPlaylist(pl.id)} disabled={addTrackState === 'adding'} />
                                                                                <button className={`add-track-btn ${addTrackState}`} onClick={() => addTrackToPlaylist(pl.id)} disabled={!addTrackUrl.trim() || addTrackState === 'adding'}>
                                                                                    {addTrackState === 'adding' ? <Loader2 size={14} className="spin" /> : addTrackState === 'done' ? <Check size={14} /> : addTrackState === 'error' ? <AlertCircle size={14} /> : <Plus size={15} />}
                                                                                </button>
                                                                            </div>
                                                                            {addTrackState === 'adding' && <p className="add-track-status">{t('auth_processing')}</p>}
                                                                            {addTrackState === 'error' && <p className="add-track-err">{addTrackError}</p>}
                                                                        </div>
                                                                        {pl.tracks.length === 0 ? (
                                                                            <div className="pl-detail-empty"><Music2 size={32} strokeWidth={0.8} /><p>{t('lib_empty_desc')}</p></div>
                                                                        ) : (
                                                                            <div className="pl-real-track-list">
                                                                                {pl.tracks.map((t, ti) => (
                                                                                    <motion.div key={t.id} className="pl-real-track-row" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ti * 0.04 }}>
                                                                                        <span className="pl-real-num">{ti + 1}</span>
                                                                                        <div className="pl-real-art">
                                                                                            {t.thumbnail ? <img src={t.thumbnail} alt={t.title} className="pl-real-art-img" /> : <div className="pl-real-art-fallback"><Music2 size={18} /></div>}
                                                                                        </div>
                                                                                        <div className="pl-real-info">
                                                                                            <span className="pl-real-title">{t.title}</span>
                                                                                            <div className="pl-real-meta">
                                                                                                <span className="pl-real-author">{t.author}</span>
                                                                                                <span className={`pl-real-source ${t.source}`}>{t.source === 'youtube' ? 'YouTube' : t.source === 'soundcloud' ? 'SoundCloud' : 'Room'}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="pl-real-actions">
                                                                                            <button className="pl-real-open-btn" title="Play track" onClick={() => handleLibraryPlay(t)}><Play size={13} fill="currentColor" /></button>
                                                                                            <button className="pl-real-remove-btn" title="Remove" onClick={() => removeTrackFromPlaylist(pl.id, t.id)}><X size={13} /></button>
                                                                                        </div>
                                                                                    </motion.div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </motion.div>
                                                                )
                                                            })() : (
                                                                <motion.div key="pl-list" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.22 }}>
                                                                    <div className="lib2-actions-row">
                                                                        <AnimatePresence>
                                                                            {showCreatePlaylist ? (
                                                                                <motion.div key="create-form" className="create-playlist-form" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                                                    <input className="create-playlist-input" type="text" placeholder="Playlist name..." value={newPlaylistName}
                                                                                        onChange={e => setNewPlaylistName(e.target.value)}
                                                                                        onKeyDown={e => { if (e.key === 'Enter') createPlaylist(); if (e.key === 'Escape') setShowCreatePlaylist(false) }} autoFocus />
                                                                                    <div className="create-playlist-btns">
                                                                                        <button className="create-pl-confirm" onClick={createPlaylist} disabled={!newPlaylistName.trim()}>Create</button>
                                                                                        <button className="create-pl-cancel" onClick={() => { setShowCreatePlaylist(false); setNewPlaylistName('') }}>Cancel</button>
                                                                                    </div>
                                                                                </motion.div>
                                                                            ) : (
                                                                                <motion.button key="new-btn" className="new-playlist-btn" onClick={() => setShowCreatePlaylist(true)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                                                    <Plus size={16} /><span>New Playlist</span>
                                                                                </motion.button>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </div>
                                                                    {playlists.length === 0 ? (
                                                                        <div className="lib2-empty">
                                                                            <div className="lib2-empty-icon"><Music2 size={40} strokeWidth={0.8} /></div>
                                                                            <h3>No playlists yet</h3>
                                                                            <p>Create your first playlist and add music from YouTube or SoundCloud.</p>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="playlist-list">
                                                                            {playlists.map((pl, i) => (
                                                                                <motion.div key={pl.id} className="playlist-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{ '--pl-color': pl.color }} onClick={() => setOpenPlaylistId(pl.id)}>
                                                                                    <div className="playlist-card-header">
                                                                                        <div className="playlist-icon" style={{ background: `${pl.color}20`, borderColor: `${pl.color}40` }}>
                                                                                            <Music2 size={18} style={{ color: pl.color }} />
                                                                                        </div>
                                                                                        <div className="playlist-meta">
                                                                                            <span className="playlist-name">{pl.name}</span>
                                                                                            <span className="playlist-count">{pl.tracks.length} track{pl.tracks.length !== 1 ? 's' : ''}</span>
                                                                                        </div>
                                                                                        <div className="playlist-card-actions">
                                                                                            <button className="pl-delete-btn" onClick={e => { e.stopPropagation(); deletePlaylist(pl.id) }}><Trash2 size={13} /></button>
                                                                                            <ChevronRight size={16} className="pl-chevron" />
                                                                                        </div>
                                                                                    </div>
                                                                                    {pl.tracks.length > 0 && (
                                                                                        <div className="playlist-art-strip">
                                                                                            {pl.tracks.slice(0, 5).map((t, ii) => (
                                                                                                <div key={t.id} className="playlist-art-thumb" style={{ zIndex: 5 - ii }}>
                                                                                                    {t.thumbnail ? <img src={t.thumbnail} alt="" /> : <div className="playlist-art-thumb-fallback"><Music2 size={10} /></div>}
                                                                                                </div>
                                                                                            ))}
                                                                                            {pl.tracks.length > 5 && <span className="playlist-art-more">+{pl.tracks.length - 5}</span>}
                                                                                        </div>
                                                                                    )}
                                                                                </motion.div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                )}

                                                {activeLibTab === 'downloads' && (
                                                    <motion.div key="downloads" className="lib2-content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                                                        {/* Path banner */}
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 13px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, marginBottom: 14, border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <FolderOpen size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                                            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>Vault</span>
                                                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                {settings.downloadPath || 'No path set — configure in Settings → Storage'}
                                                            </span>
                                                        </div>

                                                        {/* URL input */}
                                                        <div className="vault-input-area">
                                                            <div className="search-bar-input-wrap">
                                                                <Download size={15} className="search-icon" style={{ color: 'var(--primary)' }} />
                                                                <input className="library-quick-dl" type="text"
                                                                    placeholder="Paste YouTube or SoundCloud URL..."
                                                                    value={dlUrl}
                                                                    onChange={e => { setDlUrl(e.target.value); setDlState('idle'); setDlError(''); setScannedTrack(null) }}
                                                                    onKeyDown={e => e.key === 'Enter' && dlState === 'idle' && handleDownload()}
                                                                    disabled={dlState === 'downloading' || dlState === 'validating' || dlState === 'preview'} />
                                                                <button
                                                                    className={`quick-dl-btn ${dlState === 'done' ? 'done' : ''}`}
                                                                    onClick={handleDownload}
                                                                    disabled={!dlUrl.trim() || dlState === 'downloading' || dlState === 'validating' || dlState === 'preview'}>
                                                                    {dlState === 'validating' ? <Loader2 size={14} className="spin" /> : dlState === 'done' ? <Check size={14} /> : <Search size={14} />}
                                                                </button>
                                                            </div>
                                                            {dlState === 'error' && <div className="mini-dl-error">{dlError}</div>}
                                                        </div>

                                                        {/* Scanning loading state */}
                                                        {dlState === 'validating' && (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', marginTop: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                                                                <Loader2 size={18} className="spin" style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                                                <div>
                                                                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Scanning track…</p>
                                                                    <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Fetching title, artist & artwork</p>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {/* Preview card */}
                                                        {dlState === 'preview' && scannedTrack && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                                                                style={{ marginTop: 14, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                                                            >
                                                                {/* Artwork header */}
                                                                <div style={{ position: 'relative', height: 110, overflow: 'hidden', background: '#111' }}>
                                                                    {scannedTrack.thumbnail ? (
                                                                        <img src={scannedTrack.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(18px) brightness(0.45)', transform: 'scale(1.15)' }} />
                                                                    ) : (
                                                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--primary-glow), #1a1a2e)' }} />
                                                                    )}
                                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14 }}>
                                                                        <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                                                                            {scannedTrack.thumbnail
                                                                                ? <img src={scannedTrack.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                                : <div style={{ width: '100%', height: '100%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Music2 size={28} color="black" /></div>}
                                                                        </div>
                                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                                            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>{scannedTrack.name}</p>
                                                                            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.65)', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{scannedTrack.artist}</p>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                                                                            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: scannedTrack.source === 'soundcloud' ? 'rgba(255,85,0,0.3)' : 'rgba(255,0,0,0.3)', color: scannedTrack.source === 'soundcloud' ? '#ff8c42' : '#ff6b6b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                                                                {scannedTrack.source === 'soundcloud' ? 'SoundCloud' : 'YouTube'}
                                                                            </span>
                                                                            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{scannedTrack.size}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Confirm/Cancel actions */}
                                                                <div style={{ display: 'flex', gap: 10, padding: '14px 16px' }}>
                                                                    <button
                                                                        onClick={confirmDownload}
                                                                        style={{ flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 700, background: 'var(--primary)', color: 'black', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                                                                    >
                                                                        <Download size={15} /> Download {scannedTrack.size}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => { setDlState('idle'); setDlUrl(''); setScannedTrack(null) }}
                                                                        style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, cursor: 'pointer' }}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {/* Download progress */}
                                                        {dlState === 'downloading' && (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                                                                    <span style={{ fontWeight: 600 }}>Downloading…</span>
                                                                    <span style={{ opacity: 0.5 }}>{Math.floor(dlProgress)}%</span>
                                                                </div>
                                                                <div className="mini-progress-track"><motion.div className="mini-progress-fill" animate={{ width: `${dlProgress}%` }} /></div>
                                                            </motion.div>
                                                        )}

                                                        {offlineTracks.length === 0 ? (
                                                            <div className="lib2-empty">
                                                                <div className="lib2-empty-icon"><HardDrive size={40} strokeWidth={0.8} /></div>
                                                                <h3>Vault is empty</h3>
                                                                <p>Download tracks for offline listening using the input above.</p>
                                                            </div>
                                                        ) : (
                                                            <div className="vault-track-list">
                                                                <div className="vault-storage-bar-wrap">
                                                                    <div className="vault-storage-bar"><div className="vault-storage-fill" style={{ width: `${Math.min((offlineTracks.length * 7.8 / 500) * 100, 100)}%` }} /></div>
                                                                    <span className="vault-storage-label">{(offlineTracks.length * 7.8).toFixed(1)} MB used</span>
                                                                </div>
                                                                {offlineTracks.map(t => (
                                                                    <motion.div key={t.id} className="vault-track-row" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
                                                                        {/* Thumbnail */}
                                                                        <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.05)' }}>
                                                                            {t.thumbnail
                                                                                ? <img src={t.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' }}><Music2 size={18} style={{ opacity: 0.3 }} /></div>}
                                                                        </div>
                                                                        {/* Info */}
                                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                                                                                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.artist}</span>
                                                                                {t.source && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 20, background: t.source === 'soundcloud' ? 'rgba(255,85,0,0.2)' : 'rgba(255,0,0,0.2)', color: t.source === 'soundcloud' ? '#ff8c42' : '#ff6b6b', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>{t.source === 'soundcloud' ? 'SC' : 'YT'}</span>}
                                                                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{t.size}</span>
                                                                            </div>
                                                                        </div>
                                                                        {/* Actions */}
                                                                        <div className="vault-track-actions">
                                                                            <button className="vault-action-btn play" title="Play track" onClick={() => handleLibraryPlay(t)}><Play size={11} fill="currentColor" /></button>
                                                                            <button className="vault-action-btn delete" onClick={() => deleteOfflineTrack(t.id)}><Trash2 size={12} /></button>
                                                                        </div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}

                                                {activeLibTab === 'history' && (
                                                    <motion.div key="history" className="lib2-content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                                                        <div className="history-header-row">
                                                            <span className="history-eyebrow">HEARD IN ROOMS</span>
                                                            {roomHistory.length > 0 && <button className="history-clear-btn" onClick={() => setRoomHistory([])}>Clear all</button>}
                                                        </div>
                                                        {roomHistory.length === 0 ? (
                                                            <div className="lib2-empty">
                                                                <div className="lib2-empty-icon history-pulse"><Radio size={40} strokeWidth={0.8} /></div>
                                                                <h3>No history yet</h3>
                                                                <p>Every track that plays while you're in a room will appear here automatically.</p>
                                                                <button className="history-demo-btn" onClick={() => setRoomHistory([{ id: '1', title: 'Demo Track · lofi hip hop', roomCode: 'DESTRO-DEMO', url: '', ts: Date.now() - 1000 * 60 * 5 }, { id: '2', title: 'Midnight Drive · synthwave mix', roomCode: 'DESTRO-7X2K', url: '', ts: Date.now() - 1000 * 60 * 60 }])}>
                                                                    Preview demo history
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="history-feed">
                                                                {roomHistory.map((entry, i) => {
                                                                    const diff = Date.now() - entry.ts
                                                                    const mins = Math.floor(diff / 60000)
                                                                    const hours = Math.floor(diff / 3600000)
                                                                    const days = Math.floor(diff / 86400000)
                                                                    const ago = days > 0 ? `${days}d ago` : hours > 0 ? `${hours}h ago` : `${mins}m ago`
                                                                    return (
                                                                        <motion.div key={entry.id} className="history-entry" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                                                            <div className="history-timeline">
                                                                                <div className="history-dot" />
                                                                                {i < roomHistory.length - 1 && <div className="history-line" />}
                                                                            </div>
                                                                            <div className="history-content">
                                                                                <span className="history-track-title">{entry.title}</span>
                                                                                <div className="history-meta">
                                                                                    <span className="history-room">{entry.roomCode}</span>
                                                                                    <span className="history-dot-sep">·</span>
                                                                                    <span className="history-time">{ago}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="history-entry-actions">
                                                                                {entry.url && <button className="history-action-btn" title="Play track" onClick={() => handleLibraryPlay({ title: entry.title, url: entry.url })}><Play size={12} fill="currentColor" /></button>}
                                                                                {entry.url && <button className="history-action-btn" title="Copy URL" onClick={() => navigator.clipboard.writeText(entry.url)}><Copy size={12} /></button>}
                                                                                {playlists.length > 0 && <button className="history-action-btn green" title="Save to first playlist" onClick={() => saveHistoryToPlaylist(entry, playlists[0].id)}><Plus size={12} /></button>}
                                                                            </div>
                                                                        </motion.div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ══ SETTINGS VIEW ══ */}
                                {view === 'settings' && (
                                    <motion.div key="settings" className="view view-settings" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                                        <div className="view-header settings-header">
                                            <div className="view-header-inner settings-header-inner">
                                                <div className="view-title-block settings-title-block">
                                                    <h2 className="view-title settings-title">{t('settings')}</h2>
                                                    <p className="view-subtitle settings-subtitle">{t('settings_sub')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="settings-grid">
                                            <div className="settings-group group-span-all">
                                                <div className="settings-group-header"><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={16} /><h3 className="settings-group-label">{t('profile')}</h3></div></div>
                                                <div className="settings-card profile-hero-card">
                                                    <div className="profile-hero-left">
                                                        <div className="settings-avatar large" style={{ background: identity.color + '22', borderColor: identity.color + '44' }}>
                                                            <span style={{ color: identity.color }}>{identity.name ? identity.name[0] : '?'}</span>
                                                        </div>
                                                        <div className="profile-info-block">
                                                            <h3 className="settings-name-display">{identity.name || t('guest_name')}</h3>
                                                            <p className="settings-id-badge">{emailInput || t('guest')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="profile-hero-right">
                                                        <div className="color-grid-horizontal">
                                                            {AVATAR_COLORS.map(c => (
                                                                <button key={c} className={`color-dot-sm ${identity.color === c ? 'active' : ''}`} style={{ background: c }} onClick={() => setIdentity(prev => ({ ...prev, color: c }))} />
                                                            ))}
                                                        </div>
                                                        <p className="settings-helper-text">{t('personalize')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="settings-group">
                                                <div className="settings-group-header"><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Layout size={16} /><h3 className="settings-group-label">{t('interface')}</h3></div></div>
                                                <div className="settings-card">
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('theme')}</h4><p className="settings-row-desc">{t('theme_desc')}</p></div>
                                                        <select className="settings-select" value={settings.theme} onChange={e => setSettings(prev => ({ ...prev, theme: e.target.value }))}>
                                                            <option value="deep-space">Deep Space</option>
                                                            <option value="midnight">Midnight</option>
                                                            <option value="emerald">Emerald</option>
                                                            <option value="crimson">Crimson</option>
                                                            <option value="cyberpunk">Cyberpunk</option>
                                                            <option value="amber">Amber</option>
                                                        </select>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('glass')}</h4><p className="settings-row-desc">{t('glass_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.glassMode ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, glassMode: !prev.glassMode }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('blobs')}</h4><p className="settings-row-desc">{t('blobs_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.bgAnimations ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, bgAnimations: !prev.bgAnimations }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('compact')}</h4><p className="settings-row-desc">{t('compact_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.compactMode ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, compactMode: !prev.compactMode }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="settings-group">
                                                <div className="settings-group-header"><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bell size={16} /><h3 className="settings-group-label">{t('updates')}</h3></div></div>
                                                <div className="settings-card">
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('push')}</h4><p className="settings-row-desc">{t('push_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.desktopPush ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, desktopPush: !prev.desktopPush }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('language')}</h4><p className="settings-row-desc">{t('lang_desc')}</p></div>
                                                        <select className="settings-select" value={settings.language} onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}>
                                                            <option value="en">English (US)</option>
                                                            <option value="es">Español</option>
                                                            <option value="pt">Português</option>
                                                            <option value="jp">日本語</option>
                                                            <option value="fr">Français</option>
                                                            <option value="ar">العربية</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="settings-group">
                                                <div className="settings-group-header"><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={16} /><h3 className="settings-group-label">{t('playback')}</h3></div></div>
                                                <div className="settings-card">
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('autoNext')}</h4><p className="settings-row-desc">{t('autonext_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.autoNext ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, autoNext: !prev.autoNext }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('normalization')}</h4><p className="settings-row-desc">{t('norm_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.volumeNormalization ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, volumeNormalization: !prev.volumeNormalization }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('crossfade')}</h4><p className="settings-row-desc">{t('crossfade_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.crossfade ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, crossfade: !prev.crossfade }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    {settings.crossfade && (
                                                        <div className="settings-row" style={{ paddingTop: 4, paddingBottom: 8, gap: 12 }}>
                                                            <input
                                                                type="range" min={1} max={12} step={1}
                                                                value={settings.crossfadeSecs}
                                                                onChange={e => setSettings(prev => ({ ...prev, crossfadeSecs: Number(e.target.value) }))}
                                                                className="eq-slider-range"
                                                                style={{ flex: 1 }}
                                                            />
                                                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', minWidth: 28, textAlign: 'right' }}>{t('crossfade_secs', settings.crossfadeSecs)}</span>
                                                        </div>
                                                    )}
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('automix')}</h4><p className="settings-row-desc">{t('automix_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.automix ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, automix: !prev.automix }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('monoAudio')}</h4><p className="settings-row-desc">{t('monoAudio_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.monoAudio ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, monoAudio: !prev.monoAudio }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('dynamicLoudness')}</h4><p className="settings-row-desc">{t('dynamicLoudness_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.dynamicLoudness ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, dynamicLoudness: !prev.dynamicLoudness }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="settings-group">
                                                <div className="settings-group-header"><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AlertCircle size={16} /><h3 className="settings-group-label">{t('useful')}</h3></div></div>
                                                <div className="settings-card">
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('highQuality')}</h4><p className="settings-row-desc">{t('highQuality_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.highQuality ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, highQuality: !prev.highQuality }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('hardware')}</h4><p className="settings-row-desc">{t('hardware_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.hardwareAccel ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, hardwareAccel: !prev.hardwareAccel }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('discord')}</h4><p className="settings-row-desc">{t('discord_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.discordRPC ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, discordRPC: !prev.discordRPC }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className="settings-row">
                                                        <div className="settings-row-info"><h4 className="settings-row-title">{t('autostart')}</h4><p className="settings-row-desc">{t('autostart_desc')}</p></div>
                                                        <button className={`settings-toggle ${settings.autostart ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, autostart: !prev.autostart }))}><div className="toggle-thumb" /></button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── STORAGE SECTION ── */}
                                            <div className="settings-group">
                                                <div className="settings-group-header">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <HardDrive size={16} />
                                                        <h3 className="settings-group-label">Storage & Vault</h3>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                                                    {/* Download Path Card */}
                                                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Download Path</span>
                                                            <button
                                                                onClick={async () => {
                                                                    if (window.electronAPI && window.electronAPI.selectDirectory) {
                                                                        const dir = await window.electronAPI.selectDirectory()
                                                                        if (dir) setSettings(prev => ({ ...prev, downloadPath: dir }))
                                                                    } else {
                                                                        alert('Directory selection is only available in the Destro Desktop App.')
                                                                    }
                                                                }}
                                                                style={{ flexShrink: 0, padding: '5px 12px', fontSize: 12, fontWeight: 600, background: 'var(--primary)', color: 'black', border: 'none', borderRadius: 8, cursor: 'pointer', letterSpacing: '0.02em' }}
                                                            >
                                                                Change
                                                            </button>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <FolderOpen size={13} style={{ color: 'var(--primary)', opacity: 0.8, flexShrink: 0 }} />
                                                            <span style={{ fontSize: 12, color: settings.downloadPath ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                                                                {settings.downloadPath || 'Not configured — click Change to pick a folder'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Vault Size Card */}
                                                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                                        <div>
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Vault Size</span>
                                                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                                                                {offlineTracks.length} {offlineTracks.length === 1 ? 'track' : 'tracks'} cached &nbsp;·&nbsp; ~{(offlineTracks.length * 7.8).toFixed(1)} MB
                                                            </p>
                                                        </div>
                                                        <button
                                                            style={{ flexShrink: 0, padding: '5px 12px', fontSize: 12, fontWeight: 600, background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                                                            onClick={() => {
                                                                if (confirm('Clear all Vault metadata? This won\'t delete files from your hard drive.')) {
                                                                    setOfflineTracks([])
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 size={13} /> Clear Vault
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* ── EQUALIZER SECTION (TEMPORARILY DISABLED) ── */}
                                            <div className="settings-group eq-section" style={{ position: 'relative' }}>
                                                {/* Premium Not Available Overlay */}
                                                <div style={{
                                                    position: 'absolute', inset: 0, zIndex: 10,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: 'rgba(0,0,0,0.4)',
                                                    backdropFilter: 'blur(6px)',
                                                    WebkitBackdropFilter: 'blur(6px)',
                                                    borderRadius: 16
                                                }}>
                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', gap: 10,
                                                        padding: '12px 24px',
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        borderRadius: 30,
                                                        color: 'rgba(255,255,255,0.9)',
                                                        fontWeight: 600, fontSize: 13, letterSpacing: '0.03em',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                                                    }}>
                                                        <span>{t('eq_not_available')}</span>
                                                    </div>
                                                </div>

                                                {/* Original EQ Content (Greedy-out) */}
                                                <div style={{ opacity: 0.25, filter: 'grayscale(1) contrast(0.8)', pointerEvents: 'none' }}>
                                                    <div className="settings-group-header" style={{ justifyContent: 'space-between' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SlidersHorizontal size={16} /><h3 className="settings-group-label">{t('eq')}</h3></div>
                                                        <button className={`settings-toggle active`} style={{ transform: 'scale(0.85)' }}><div className="toggle-thumb" /></button>
                                                    </div>
                                                    <div className={`settings-card eq-card ${settings.eqEnabled ? 'eq-active' : 'eq-inactive'}`}>
                                                        {/* Preset row */}
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                                            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t('eq_preset')}</span>
                                                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                                                {['flat', 'bass', 'treble', 'vocal', 'electronic', 'acoustic'].map(p => (
                                                                    <button key={p}
                                                                        disabled={!settings.eqEnabled}
                                                                        onClick={() => setSettings(prev => ({ ...prev, eqPreset: p, eqBands: [...EQ_PRESETS[p]] }))}
                                                                        className={`eq-preset-btn ${settings.eqPreset === p && settings.eqEnabled ? 'active' : ''}`}
                                                                    >{t(`eq_${p}`)}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Visual EQ graph */}
                                                        <div className="eq-graph-wrap">
                                                            {/* dB gridlines */}
                                                            {[12, 6, 0, -6, -12].map(db => (
                                                                <div key={db} className="eq-grid-line" style={{ bottom: `${((db + 12) / 24) * 100}%` }}>
                                                                    <span className="eq-grid-label">{db > 0 ? `+${db}` : db}dB</span>
                                                                </div>
                                                            ))}
                                                            {/* Gradient fill under curve */}
                                                            <svg className="eq-curve-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                                <defs>
                                                                    <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={settings.eqEnabled ? 0.45 : 0.1} />
                                                                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                                                    </linearGradient>
                                                                </defs>
                                                                <polyline
                                                                    fill="url(#eqGrad)"
                                                                    stroke="var(--primary)"
                                                                    strokeWidth="1.5"
                                                                    strokeLinejoin="round"
                                                                    opacity={settings.eqEnabled ? 1 : 0.25}
                                                                    points={[
                                                                        `0,${50 - (settings.eqBands[0] / 24) * 100}`,
                                                                        ...settings.eqBands.map((v, i) => `${(i / (settings.eqBands.length - 1)) * 100},${50 - (v / 24) * 100}`),
                                                                        '100,50', '0,50'
                                                                    ].join(' ')}
                                                                />
                                                            </svg>
                                                            {/* Actual EQ Points as HTML so they don't stretch */}
                                                            <div className="eq-bands-row" style={{ height: '100%', pointerEvents: 'none' }}>
                                                                {settings.eqBands.map((v, i) => (
                                                                    <div
                                                                        key={`pt-${i}`}
                                                                        className="eq-graph-point"
                                                                        style={{
                                                                            left: `${(i / (settings.eqBands.length - 1)) * 100}%`,
                                                                            top: `${50 - (v / 24) * 100}%`,
                                                                            opacity: settings.eqEnabled ? 1 : 0.25
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                            {/* Draggable band sliders */}
                                                            <div className="eq-bands-row">
                                                                {['60Hz', '150Hz', '400Hz', '1KHz', '2.4KHz', '15KHz'].map((label, i) => (
                                                                    <div
                                                                        key={label}
                                                                        className="eq-band-col"
                                                                        style={{
                                                                            position: 'absolute',
                                                                            left: `${(i / 5) * 100}%`,
                                                                            transform: 'translateX(-50%)',
                                                                            top: 0,
                                                                            bottom: 0,
                                                                            width: '40px'
                                                                        }}
                                                                    >
                                                                        <span className="eq-band-val" style={{ opacity: settings.eqEnabled ? 1 : 0.35 }}>
                                                                            {settings.eqBands[i] > 0 ? `+${settings.eqBands[i]}` : settings.eqBands[i]}
                                                                        </span>
                                                                        <input
                                                                            type="range" min={-12} max={12} step={1}
                                                                            value={settings.eqBands[i]}
                                                                            disabled={!settings.eqEnabled}
                                                                            className="eq-band-slider"
                                                                            onChange={e => {
                                                                                const newBands = [...settings.eqBands]
                                                                                newBands[i] = Number(e.target.value)
                                                                                setSettings(prev => ({ ...prev, eqBands: newBands, eqPreset: 'manual' }))
                                                                            }}
                                                                        />
                                                                        <span className="eq-band-label">{label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Reset button */}
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                                                            <button
                                                                disabled={!settings.eqEnabled}
                                                                className="eq-reset-btn"
                                                                onClick={() => setSettings(prev => ({ ...prev, eqBands: [0, 0, 0, 0, 0, 0], eqPreset: 'flat' }))}
                                                            >{t('eq_reset')}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="settings-footer transition-opacity opacity-20 hover:opacity-100" style={{ marginTop: 24 }}>
                                                <div className="about-brand-card">
                                                    <div className="about-logo-row">
                                                        <div className="about-logo-icon">
                                                            <Music2 size={24} strokeWidth={2.5} />
                                                        </div>
                                                        <h2 className="about-title-logo">DESTRO</h2>
                                                    </div>

                                                    <div className="about-content">
                                                        <p className="about-tagline">{t('about_tagline')}</p>
                                                        <p className="about-desc">
                                                            {t('about_desc')}
                                                        </p>

                                                        <div className="about-credits-box">
                                                            <div className="creator-section">
                                                                <div className="creator-badge">{t('creator_badge')}</div>
                                                                <div className="creator-card-main">
                                                                    <div className="creator-avatar" style={{ background: 'var(--primary-glow)', color: 'white' }}>
                                                                        <img src="assets/aymenzito.jpg" alt="Aymenzito" className="avatar-img" onError={(e) => { e.target.style.display = 'none'; }} />
                                                                        <span className="avatar-initial">A</span>
                                                                    </div>
                                                                    <div className="creator-info">
                                                                        <h3 className="creator-name">Aymenzito</h3>
                                                                        <p className="creator-role">{t('creator_role')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="supporters-section-refined">
                                                                <div className="supporters-header-refined">
                                                                    <Heart size={14} fill="var(--primary)" color="var(--primary)" />
                                                                    <span>{t('supporters_badge')}</span>
                                                                </div>
                                                                <div className="supporters-card">
                                                                    <div className="supporters-grid">
                                                                        {[
                                                                            { name: 'organ', img: 'organ.jpg', color: '#1ed760' },
                                                                            { name: 'AkiraTJ', img: 'akiraTJ.jpg', color: '#f59e0b' },
                                                                            { name: 'Shisui', img: 'shisui.jpg', color: '#ef4444' },
                                                                            { name: 'PeRLy', img: 'perly.jpg', color: '#8b5cf6' }
                                                                        ].map(s => (
                                                                            <div key={s.name} className="supporter-item">
                                                                                <div className="supporter-avatar" style={{ background: s.color + '22', color: s.color, borderColor: s.color + '44' }}>
                                                                                    <img src={`assets/${s.img}`} alt={s.name} className="avatar-img" onError={(e) => { e.target.style.display = 'none'; }} />
                                                                                    <span className="avatar-initial">{s.name[0]}</span>
                                                                                </div>
                                                                                <span className="supporter-name">{s.name}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="about-links-official" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12 }}>
                                                            <button onClick={() => openExternalLink('https://github.com/AymennX')} className="about-social-btn github" title="View Source on GitHub">
                                                                <GithubIconOfficial size={20} />
                                                            </button>
                                                            <button onClick={() => openExternalLink('https://discord.gg/destro')} className="about-social-btn discord" title="Join Discord Community">
                                                                <DiscordIcon size={20} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="about-footer-info" style={{ marginTop: 24, opacity: 0.5, fontSize: 11 }}>
                                                        <p>{t('version')}</p>
                                                        <p>{t('about_copyright')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* JOIN MODAL */}
            <AnimatePresence>
                {showJoinModal && (
                    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowJoinModal(false)}>
                        <motion.div className="modal-box" initial={{ scale: 0.94, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.94, y: 16, opacity: 0 }} onClick={e => e.stopPropagation()}>
                            <div className="modal-icon"><Users size={22} color="var(--primary)" /></div>
                            <h2 className="modal-title">Join a Session</h2>
                            <p className="modal-sub">Enter the room code your host shared with you</p>
                            <input className="modal-input" type="text" placeholder="DESTRO-XXXX" value={joinCodeInput}
                                onChange={e => { setJoinCodeInput(e.target.value.toUpperCase()); setJoinError('') }}
                                onKeyDown={e => e.key === 'Enter' && handleJoinRoom()} autoFocus />
                            {joinError && <div className="auth-error" style={{ marginBottom: 8 }}><AlertCircle size={13} />{joinError}</div>}
                            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleJoinRoom} disabled={joinLoading}>
                                {joinLoading ? <><Loader2 size={16} className="spin" />Connecting...</> : 'Connect Instantly'}
                            </button>
                            <button className="modal-cancel" onClick={() => { setShowJoinModal(false); setJoinError(''); setJoinCodeInput('') }}>Cancel</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PERSISTENT GLOBAL MEDIA ENGINE */}
            <div className="global-player-layer">
                {appState === 'app' && (
                    <MediaPlayer
                        isHost={isHost} playbackMode={playbackMode} url={syncUrl}
                        roomPlaybackState={roomPlaybackState}
                        initialMetadata={playerState.metadata}
                        onStateChange={handlePlayerStateChange} portalTo="#player-portal-anchor" portalKey={view}
                        t={t}
                    />
                )}
            </div>

            {/* FLOATING MINI PLAYER POP-UP */}
            <AnimatePresence>
                {appState === 'app' && view !== 'room' && playerState.metadata?.title && playerState.isPlaying && (
                    <motion.div className="mini-popup"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }} whileHover={{ scale: 1.02, y: -2 }} onClick={() => setView('room')}>
                        <div className="mini-popup-content">
                            <div className="mini-popup-disc-wrap">
                                <div className="mini-popup-disc animate-spin">
                                    {playerState.metadata.artwork ? <img src={playerState.metadata.artwork} alt="Art" /> : <Music2 size={16} />}
                                </div>
                            </div>
                            <div className="mini-popup-info">
                                <p className="mini-popup-label">PLAYING</p>
                                <h4 className="mini-popup-title">{playerState.metadata.title}</h4>
                                <p className="mini-popup-artist">{playerState.metadata.artist}</p>
                            </div>
                            <div className="mini-popup-indicator">
                                <div className="playing-bars"><span /><span /><span /></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
