export function highlightLine(line: string) {
    return line
        .replace(/("[^"]+":)/g, '<span class="text-blue-400">$1</span>') // keys
        .replace(/: ("[^"]*")/g, ': <span class="text-green-400">$1</span>') // strings
        .replace(/: (\d+)/g, ': <span class="text-yellow-300">$1</span>') // numbers
        .replace(/: (true|false|null)/g, ': <span class="text-purple-300">$1</span>'); // booleans/null
}