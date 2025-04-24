<script module lang="ts">
    export class AuthNodeState {
        flow = $state('none');
        header_secret_key: string | undefined = $state(undefined);
        secret: string | undefined = $state(undefined);
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps} from '@xyflow/svelte';
    import NodeShell from "$components/nodes/NodeShell.svelte";

    let {data}: NodeProps<Node<{ authNodeState: AuthNodeState }>> = $props();
</script>

<NodeShell title="Auth" target={true} source={true}>
    <div class="flex flex-col gap-2">
        <select class="nodrag select" bind:value={data.authNodeState.flow}>
            <option value="none">None</option>
            <option value="plain secret">Plain Secret</option>
            <option value="basic auth">Basic Auth</option>
            <option value="gitlab">Gitlab</option>
            <option value="Github">Github</option>
        </select>
        {#if data.authNodeState.flow !== 'none' }
            <input class="nodrag input" bind:value={data.authNodeState.header_secret_key}
                   placeholder="Header Secret Key"/>
            <input class="nodrag input" bind:value={data.authNodeState.secret} placeholder="Secret"/>
        {/if}
    </div>
</NodeShell>
