<script lang="ts">
    import {TreeNode} from "$components";
    import type {FileNode} from "$lib/types/file-node";
    import {getFlowState} from "$lib/state/flow-state.svelte";
    import {flowToHookah} from "$lib/utils/flow-to-hookah";
    import {highlightLine} from "$lib/utils/highlight-line";
    import {Clipboard, Download, Webhook} from "@lucide/svelte"
    import {copyToClipboard} from "$lib/utils/copy-to-clipboard";
    import {downloadAsFile} from "$lib/utils/download-as-file.js";

    const flowState = getFlowState()
    let {nodes, edges} = $derived(flowState)
    let configs = $derived(flowToHookah(nodes, edges))
    let current = $state("config.json")

    let fileTree = $derived.by(() => {
        const templates = flowState.getTemplates()
        const children = templates.map(tmpl => {
            return {
                name: tmpl.name,
                type: "file",
                content: tmpl.content,
            } as FileNode
        })
        const config: FileNode = {
            name: "config.json",
            type: "file",
            content: JSON.stringify(configs, null, 2)
        }

        return [
            {name: "templates", type: "folder", children},
            config
        ] as FileNode[]
    })


    const onclick = (name: string) => {
        current = name
    }

    const findFile = (tree: FileNode[], filename: string): FileNode | null => {
        for (const node of tree) {
            if (node.type === "file" && node.name === filename) {
                return node;
            }
            if (node.type === "folder" && node.children) {
                const found = findFile(node.children, filename);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    let currentContent = $derived(findFile(fileTree, current)?.content || "")
</script>

<div class="flex h-screen bg-base-200">
    <aside class="w-64 p-4 border-r border-base-300 overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4 flex gap-2 items-center">
            <Webhook size={28}/>
            Hookah
        </h2>
        <ul class="menu bg-base-100 rounded-box w-full">
            {#each fileTree as node}
                <TreeNode {node} {onclick} {current}/>
            {/each}
        </ul>
    </aside>

    <main class="flex-1 p-6 overflow-y-auto">
        <div class="bg-base-100 rounded-lg p-4 shadow-lg h-full">
            <div class="flex absolute right-10">
                <button class="btn btn-sm btn-ghost"
                        onclick={() => downloadAsFile(currentContent,current)}>
                    <Download size={20}/>
                </button>
                <button class="btn btn-sm btn-ghost"
                        onclick={() => copyToClipboard(currentContent)}>
                    <Clipboard size={20}/>
                </button>
            </div>

            <div class="whitespace-pre-wrap text-sm font-mono">
                {#each currentContent.split('\n') as line, i}
                    <div class="flex gap-3 leading-relaxed text-xs">
                        <span class="text-neutral-500 w-6 text-right select-none">{i + 1}</span>
                        <code>{@html highlightLine(line)}</code>
                    </div>
                {/each}
            </div>
        </div>
    </main>
</div>
