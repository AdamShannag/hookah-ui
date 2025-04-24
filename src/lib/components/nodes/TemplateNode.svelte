<script module lang="ts">
    export class TemplateNodeState {
        name = $state('')
        content = $state('');
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps, NodeResizer} from '@xyflow/svelte';
    import {NodeShell} from "$components";

    let {data, selected}: NodeProps<Node<{ templateNodeState: TemplateNodeState }>> = $props();
</script>

<NodeResizer minWidth={290} minHeight={210} isVisible={selected}/>

<NodeShell title="Template" target={true}>
    <input class="nodrag input w-full" bind:value={data.templateNodeState.name}
           placeholder="template.tmpl"/>
    <textarea class="textarea nodrag w-full h-full" placeholder="request body"
              bind:value={data.templateNodeState.content}></textarea>
</NodeShell>