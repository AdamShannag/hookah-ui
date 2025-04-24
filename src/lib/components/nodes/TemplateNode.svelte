<script module lang="ts">
    export class TemplateNodeState {
        name = $state('')
        content = $state('');
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps} from '@xyflow/svelte';
    import {NodeShell} from "$components";

    let {data}: NodeProps<Node<{ templateNodeState: TemplateNodeState }>> = $props();
</script>


<NodeShell title="Template" target={true}>
    <input class="nodrag input" bind:value={data.templateNodeState.name}
           placeholder="template.tmpl"/>
    <textarea class="textarea nodrag" placeholder="request body"
              bind:value={data.templateNodeState.content}></textarea>
</NodeShell>