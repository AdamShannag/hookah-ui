<script lang="ts">
    import type {FileNode} from "$lib/types/file-node";
    import {TreeNode} from "$components";
    import {Webhook} from "@lucide/svelte";

    type FileTreeProps = {
        current: FileNode
        onclick: (node: FileNode) => void
        fileTree: FileNode[]
    }

    let {current, onclick, fileTree}: FileTreeProps = $props()
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
</aside>