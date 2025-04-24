<script module lang="ts">
    export class EventNodeState {
        event = $state('');
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps} from '@xyflow/svelte';
    import {NodeShell} from "$components";

    let {data}: NodeProps<Node<{ eventNodeState: EventNodeState }>> = $props();
</script>

<NodeShell title="Event" target={true} source={true}>
    <div class="flex flex-col gap-2">
        <input class="nodrag input" bind:value={data.eventNodeState.event}
               placeholder="merge_request"/>
    </div>
</NodeShell>
