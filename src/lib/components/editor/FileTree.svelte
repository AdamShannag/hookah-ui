<script lang="ts">
    import type {FileNode} from "$lib/types/file-node";
    import {TreeNode} from "$components";
    import {Download, Upload, Webhook} from "@lucide/svelte";
    import {downloadZipFile} from "$lib/utils/downlaod-zip-file";

    type FileTreeProps = {
        current: FileNode
        onclick: (node: FileNode) => void
        fileTree: FileNode[]
        uploadFlow: () => void
    }

    let {current, onclick, fileTree, uploadFlow}: FileTreeProps = $props()
</script>

<aside class="w-64 p-4 border-r border-base-300 flex flex-col h-full">
    <ul class="menu bg-base-100 rounded-box w-full overflow-y-auto flex-1 gap-1 shadow-lg">
        <li class="text-2xl font-bold mb-4 mt-2 flex gap-2 items-center justify-center">
            <div>
                <Webhook size={28}/>
                Hookah
            </div>
        </li>
        {#each fileTree as node}
            <TreeNode {node} {onclick} {current}/>
        {/each}
    </ul>

    <button class="btn btn-primary mt-4 w-full gap-2"
            onclick={() => uploadFlow()}>
        <Upload size={20}/>
        Load Flow
    </button>
    <button class="btn btn-secondary mt-4 w-full gap-2"
            onclick={() => downloadZipFile(fileTree, "hookah.zip")}>
        <Download size={20}/>
        Download ZIP
    </button>
</aside>