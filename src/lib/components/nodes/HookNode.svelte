<script module lang="ts">
    export class HookNodeState {
        name = $state('');
        endpoint_key: string = $state('');
        body: string = $state('');
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps} from '@xyflow/svelte';
    import {NodeShell} from "$components";

    let {data}: NodeProps<Node<{ hookNodeState: HookNodeState }>> = $props();
</script>

<NodeShell title="Hook" source={true} target={true}>
    <div class="flex flex-col gap-2">
        <input class="nodrag input" bind:value={data.hookNodeState.name}
               placeholder="Name"/>
        <input class="nodrag input" bind:value={data.hookNodeState.endpoint_key} placeholder="Endpoint Key"/>
    </div>
</NodeShell>

