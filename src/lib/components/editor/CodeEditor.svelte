<script lang="ts">
    import {EditorBody, FileTree} from "$components";
    import type {FileNode} from "$lib/types/file-node";
    import {getFlowState} from "$lib/state/flow-state.svelte";
    import {flowToHookah} from "$lib/utils/flow-to-hookah";
    import {File, FileJson2, Workflow} from "@lucide/svelte";

    const flowState = getFlowState()
    let {nodes, edges} = $derived(flowState)
    let configs = $derived(flowToHookah(nodes, edges))
    let current: FileNode = $state({name: "config.flow", type: "flow"})

    let fileTree = $derived.by(() => {
        const templates = flowState.getTemplates()
        const children = templates.map(tmpl => {
            return {
                name: tmpl.name,
                type: "file",
                content: tmpl.content,
                icon: File
            } as FileNode
        })
        const config: FileNode = {
            name: "config.json",
            type: "file",
            content: JSON.stringify(configs, null, 2),
            icon: FileJson2
        }

        return [
            {name: "templates", type: "folder", children},
            config,
            {name: "config.flow", type: "flow", icon: Workflow}
        ] as FileNode[]
    })


    const onclick = (node: FileNode) => {
        current = node
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

    let currentContent = $derived(findFile(fileTree, current.name)?.content || "")
</script>

<div class="flex h-screen bg-base-200">
    <FileTree {current} {fileTree} {onclick}/>
    <EditorBody {current} {currentContent}/>
</div>
