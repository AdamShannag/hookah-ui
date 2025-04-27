<script lang="ts">
    import type {FileNode} from "$lib/types/file-node";
    import {downloadAsFile} from "$lib/utils/download-as-file";
    import {copyToClipboard} from "$lib/utils/copy-to-clipboard";
    import {Clipboard, Download} from "@lucide/svelte";
    import {CodeView, DnDProvider, Flow} from "$components";
    import {type Edge, type Node, SvelteFlowProvider} from "@xyflow/svelte";

    type EditorBodyProps = {
        current: FileNode
        currentContent: string
    }

    let {current, currentContent}: EditorBodyProps = $props()
    let flow: Flow

    export function updateFlow(nodes: Node[], edges: Edge[]) {
        flow.updateFLow(nodes, edges)
    }
</script>

<main class="flex-1 p-6" class:hidden={current.type === "flow"}>
    <div class="bg-base-100 rounded-lg p-4 shadow-lg h-full overflow-auto">
        <div class="flex absolute right-10">
            <button class="btn btn-sm btn-ghost"
                    onclick={() => downloadAsFile(currentContent,current.name)}>
                <Download size={20}/>
            </button>
            <button class="btn btn-sm btn-ghost"
                    onclick={() => copyToClipboard(currentContent)}>
                <Clipboard size={20}/>
            </button>
        </div>
        <CodeView content={currentContent}/>
    </div>
</main>

<main class:hidden={current.type !== "flow"} class="flex-1 p-6">
    <div class="rounded-lg shadow-lg h-full">
        <SvelteFlowProvider>
            <DnDProvider>
                <Flow bind:this={flow}/>
            </DnDProvider>
        </SvelteFlowProvider>
    </div>
</main>