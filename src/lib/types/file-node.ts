export type FileNode = {
    name: string
    type: "file" | "folder"
    content?: string
    children?: FileNode[]
}