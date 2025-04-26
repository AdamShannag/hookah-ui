export function downloadAsFile(content: string, filename = "file.txt") {
    const isJson = filename.trim().toLowerCase().endsWith(".json");
    const mimeType = isJson ? "application/json" : "text/plain;charset=utf-8";

    const blob = new Blob([content], {type: mimeType});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}