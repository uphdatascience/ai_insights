import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        preserveSymlinks: true,
        alias: {
            react: path.resolve(__dirname, "node_modules/react"),
            "react-dom": path.resolve(__dirname, "node_modules/react-dom")
        }
    },
    build: {
        outDir: "../backend/static",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: id => {
                    if (id.includes("@fluentui/react-icons")) {
                        return "fluentui-icons";
                    } else if (id.includes("@fluentui/react")) {
                        return "fluentui-react";
                    } else if (id.includes("node_modules")) {
                        return "vendor";
                    }
                }
            }
        },
        target: "esnext"
    },
    server: {
        proxy: {
            "/content/": "http://localhost:50505",
            "/auth_setup": "http://localhost:50505",
            "/.auth/me": "http://localhost:50505",
            "/ask": "http://localhost:50505",
            "/chat": "http://localhost:50505",
            "/speech": "http://localhost:50505",
            "/config": "http://localhost:50505",
            "/upload": "http://localhost:50505",
            "/delete_uploaded": "http://localhost:50505",
            "/list_uploaded": "http://localhost:50505",
            "/chat_history": "http://localhost:50505"
        }
    }
});
