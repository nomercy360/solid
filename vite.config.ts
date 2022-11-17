import solid from "solid-start/vite";
import {defineConfig} from "vite";
import cloudflare from "solid-start-cloudflare-pages";

export default defineConfig({
    server: {
        https: {
            key: "./certs/localhost.key",
            cert: "./certs/localhost.crt",
        },
        port: 3001,
        host: "127.0.0.1",
    },
    plugins: [solid({adapter: cloudflare({})})]
});
