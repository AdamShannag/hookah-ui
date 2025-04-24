export function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content).then(() => {
        alert("Copied to clipboard!");
    }, () => {
        alert("Failed to copy.");
    });
}
