import {type Edge, type Node} from "@xyflow/svelte";

export async function loadFlowFile(): Promise<{ nodes: Node[]; edges: Edge[] } | null> {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".flow";
        input.style.display = "none";

        input.addEventListener("change", (event) => {
            const file = (event.target as HTMLInputElement)?.files?.[0];
            if (!file) {
                resolve(null);
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const base64Text = reader.result as string;
                    const cleanedBase64 = base64Text.split(',')[1] || base64Text;
                    const jsonString = atob(cleanedBase64);
                    const data: { nodes: Node[]; edges: Edge[] } = JSON.parse(jsonString);
                    resolve(data);
                } catch (err) {
                    console.error("Failed to decode or parse the .flow file:", err);
                    reject(err);
                }
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsText(file);
        });

        document.body.appendChild(input);
        input.click();
        input.remove();
    });
}