import JSZip from "jszip";
import type {FileNode} from "$lib/types/file-node";

export async function downloadZipFile(fileNodes: FileNode[], zipName = "hookah.zip") {
    const zip = new JSZip();

    function addNode(zipFolder: JSZip, node: FileNode) {
        if (node.type === "folder" && node.children) {
            const folder = zipFolder.folder(node.name);
            node.children.forEach(child => addNode(folder!, child));
        } else {
            // file or flow
            zipFolder.file(node.name, node.content || "");
        }
    }

    fileNodes.forEach(node => addNode(zip, node));

    const blob = await zip.generateAsync({type: "blob"});

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = zipName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
}