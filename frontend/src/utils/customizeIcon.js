import {
    File,
    FileCode,
    FileJson,
    FileText,
    Image,
    KeyRound,
    Lock,
    Package,
    Palette,
    Code2,
    Settings,
    GitBranch,
} from "lucide-react";

export const getFileIcon = (name = "") => {
    const lower = name.toLowerCase();
    const ext = lower.includes(".") ? lower.split(".").pop() : "";

    // 1. Specific full filenames
    const knownNames = {
        "package.json": { icon: Package, color: "text-emerald-400" },
        "package-lock.json": { icon: Lock, color: "text-zinc-500" },
        ".env": { icon: KeyRound, color: "text-amber-400" },
        ".env.local": { icon: KeyRound, color: "text-amber-400" },
        ".gitignore": { icon: GitBranch, color: "text-orange-400" },
        "dockerfile": { icon: Settings, color: "text-cyan-400" },
        "readme.md": { icon: FileText, color: "text-sky-400" },
    };

    if (knownNames[lower]) {
        return knownNames[lower];
    }

    // 2. By file extension
    const extensionMap = {
        // JavaScript / TypeScript / React
        js: { icon: FileCode, color: "text-yellow-400" },
        jsx: { icon: Code2, color: "text-cyan-400" },
        ts: { icon: FileCode, color: "text-blue-400" },
        tsx: { icon: Code2, color: "text-blue-400" },
        mjs: { icon: FileCode, color: "text-yellow-400" },

        // Web Markup & Styles
        html: { icon: FileCode, color: "text-orange-500" },
        htm: { icon: FileCode, color: "text-orange-500" },
        css: { icon: Palette, color: "text-sky-400" },
        scss: { icon: Palette, color: "text-pink-400" },
        sass: { icon: Palette, color: "text-pink-400" },
        less: { icon: Palette, color: "text-indigo-400" },

        // Data & Config
        json: { icon: FileJson, color: "text-amber-300" },
        xml: { icon: FileCode, color: "text-emerald-400" },
        yaml: { icon: FileText, color: "text-rose-400" },
        yml: { icon: FileText, color: "text-rose-400" },
        toml: { icon: Settings, color: "text-slate-400" },

        // Documents & Markdown
        md: { icon: FileText, color: "text-sky-300" },
        txt: { icon: FileText, color: "text-zinc-400" },
        pdf: { icon: FileText, color: "text-red-400" },

        // Images / Media
        png: { icon: Image, color: "text-purple-400" },
        jpg: { icon: Image, color: "text-purple-400" },
        jpeg: { icon: Image, color: "text-purple-400" },
        svg: { icon: Image, color: "text-amber-400" },
        ico: { icon: Image, color: "text-yellow-300" },
        gif: { icon: Image, color: "text-pink-400" },
        webp: { icon: Image, color: "text-purple-300" },
    };

    return extensionMap[ext] || { icon: File, color: "text-zinc-400" };
};

export const getFolderColor = (name = "") => {
    const key = name.toLowerCase();

    const map = {
        src: "#38bdf8",         // sky-400
        public: "#34d399",      // emerald-400
        images: "#f472b6",      // pink-400
        img: "#f472b6",         // pink-400
        assets: "#f472b6",      // pink-400
        css: "#a78bfa",         // violet-400
        styles: "#a78bfa",      // violet-400
        js: "#facc15",          // yellow-400
        components: "#38bdf8",  // sky-400
        script: "#facc15",      // yellow-400
        pages: "#38bdf8",       // sky-400
        utils: "#fbbf24",       // amber-400
        hooks: "#2dd4bf",       // teal-400
        node_modules: "#71717a",// zinc-500
        dist: "#71717a",        // zinc-500
        build: "#71717a",       // zinc-500
    };

    return map[key] || "#fbbf24";
};
