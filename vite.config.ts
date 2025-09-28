import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// This can be used to put entire app under a speicfic path.
// E.g. for GitHub Pages hosting, without a custom domain,
// this was '/cocktail-recipes' to work under https://mindaugasw.github.io/cocktail-recipes/
// Then 'base' should also be uncommented under defineConfig() below.
//
// For hosting under a custom subdomain, this needs to be empty string ''
// ('/' is not suitable because it generates img URLs like '//images/img.png'. But could be fixed in code if needed)
const BASE_PATH = '';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: true
    },
    define: {
        __BUILD_VERSION__: Date.now().toString(),
        __BASE_PATH__: `'${BASE_PATH}'`,
    },
    // base: BASE_PATH,
})
