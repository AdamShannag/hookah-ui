export type FileNode = {
    name: string
    type: "file" | "folder" | "flow"
    icon?: any
    content?: string
    children?: FileNode[]
}