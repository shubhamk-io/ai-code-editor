import { KeyRound, Lock, Package } from "lucide-react";
import { color } from "motion/react";

export const getFileIcon = (name="") => {
    const lower = name.toLowerCase();
    const ext = lower.name.split(".").pop()


    const knowsName = {
        "package.json":{icon:Package, color:"text-emerald-400"},
        "package-lock-json": {icon:Lock, color:"text-zinc-500"},
        ".evn": {icon:KeyRound,  color:"text-lime-400" },
    }

    

}


export  const getFolderColor = (name= "") => {
    const key = name.toLowerCase();
    
    const map = {
        src:"text-sky-400",
        public: "text-emerald-400",
        images:"text-pink-400",
        img:"text-pink-400",
        assets: "text-pink-400",
        css:"text-violet-400",
        styles: "text-violet-400",
        js:"text-yellow-400",
        components: "text-sky-400",
        script:"text-yellow-400",
        pages:"text-sky-400",
        utils: "text-amber-400",
        hooks: "text-teal-400",
        node_modules: "text-zinc-600",
        dist:"text-zinc-500",
        build: "text-zinc-500"
    };

    return map[key] || "text-sky-400"
}