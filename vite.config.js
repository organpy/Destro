import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
    plugins: [
        react(),
        electron([
            {
                entry: 'main.js',
            },
            {
                entry: 'preload.js',
                onstart(options) {
                    options.reload()
                },
            },
        ]),
        renderer(),
    ],
})
