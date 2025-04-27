<script lang="ts">
    import {TreeNode} from "$components"
    import {Folder} from '@lucide/svelte';
    import type {FileNode} from "$lib/types/file-node";

    type TreeNodeProps = {
        node: FileNode
        current: FileNode
        onclick: (node: FileNode) => void
    }

    let {node, onclick, current}: TreeNodeProps = $props();
</script>

{#if node.type === "folder" && node.children}
    {#if node.children.length > 0}
        <li>
            <details open>
                <summary>
                    <Folder size={18}/>
                    {node.name}</summary>
                <ul>
                    {#each node.children as child}
                        <TreeNode node={child} {onclick} {current}/>
                    {/each}
                </ul>
            </details>
        </li>
    {/if}
{:else}
    <li>
        <button onclick={()=>onclick(node)} class:bg-base-200={node.name===current.name}>
            <node.icon size={18}/>
            {#if !node.name}
                unnamed.tmpl
            {/if}
            {node.name}
        </button>
    </li>
{/if}