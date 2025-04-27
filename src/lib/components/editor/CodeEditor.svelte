<script lang="ts">
    import {EditorBody, FileTree} from "$components";
    import type {FileNode} from "$lib/types/file-node";
    import {getFlowState} from "$lib/state/flow-state.svelte";
    import {flowToHookah} from "$lib/utils/flow-to-hookah";
    import {File, FileJson2, Workflow} from "@lucide/svelte";
    import {loadFlowFile} from "$lib/utils/load-flow-file";
    import {toFilledNodeData} from "$components/flow/flow";


    const flowState = getFlowState()
    let {nodes, edges} = $derived(flowState)
    let configs = $derived(flowToHookah(nodes, edges))
    let current: FileNode = $state({name: "config.flow", type: "flow"})

    let fileTree = $derived.by(() => {
        const templates = flowState.getTemplates().map(tmpl => ({
            name: tmpl.name,
            type: "file",
            content: tmpl.content,
            icon: File
        } as FileNode));

        const fileNodes: FileNode[] = [
            {name: "templates", type: "folder", children: templates},
            {
                name: "config.flow",
                type: "flow",
                icon: Workflow,
                content: btoa(JSON.stringify({
                    nodes: nodes.map(n => ({
                        ...n,
                        data: toFilledNodeData(n.type || "", n.data),
                    })), edges
                }))
            }
        ];

        if (configs.length > 0) {
            fileNodes.splice(1, 0, {
                name: "config.json",
                type: "file",
                content: JSON.stringify(configs, null, 2),
                icon: FileJson2
            });
        }

        return fileNodes;
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

    let editorBody: EditorBody
    const uploadFlow = async () => {
        const data = await loadFlowFile()
        if (data) {
            editorBody.updateFlow(data.nodes, data.edges)
        }
    }
</script>

<div class="flex h-screen bg-base-200">
    <FileTree {current} {fileTree} {onclick} {uploadFlow}/>
    <EditorBody {current} {currentContent} bind:this={editorBody}/>
</div>
