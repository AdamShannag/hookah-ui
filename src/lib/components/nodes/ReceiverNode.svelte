<script module lang="ts">
    export class ReceiverNodeState {
        name = $state('');
        event_type_in: string = $state('body');
        event_type_key: string = $state('event_type');
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps} from '@xyflow/svelte';
    import {NodeShell} from "$lib/components";

    let {data}: NodeProps<Node<{ receiverNodeState: ReceiverNodeState }>> = $props();
</script>

<NodeShell title="Receiver" source={true}>
    <div class="flex flex-col gap-2">
        <input class="nodrag input" bind:value={data.receiverNodeState.name}
               placeholder="Name"/>
        <select class="nodrag select" bind:value={data.receiverNodeState.event_type_in}>
            <option value="body">Body</option>
            <option value="Header">Header</option>
        </select>
        <input class="nodrag input" bind:value={data.receiverNodeState.event_type_key} placeholder="Event Key"/>
    </div>
</NodeShell>


