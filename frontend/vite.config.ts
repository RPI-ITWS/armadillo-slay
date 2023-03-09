import {defineConfig, PluginOption} from 'vite';
import react from '@vitejs/plugin-react';
import handlebars from "vite-plugin-handlebars";
import path from "path";

// patch handlebars plugin to support being loaded as a plugin in the new vite config
const hbsConfig = {
    partialDirectory: path.resolve(__dirname + "/src/index/partials"),

}
let hbsPlugin: PluginOption[]  = [handlebars(hbsConfig) as unknown as PluginOption];


export default defineConfig({
    plugins: [
        react(),
        hbsPlugin
    ],
    resolve: {
        alias: {
            "@": "/src",
            "@assets": "/assets",
        }
    },
    publicDir: 'assets',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            }
        }
    }
});