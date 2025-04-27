import {type Icon} from "@lucide/svelte"

export type FileNode = {
    name: string
    type: "file" | "folder" | "flow"
    icon?: typeof Icon
    content?: string
    children?: FileNode[]
}