<script lang="ts">
    import type {Snippet} from "svelte";
    import SourceHandle from "$components/handles/SourceHandle.svelte";
    import TargetHandle from "$components/handles/TargetHandle.svelte";

    type NodeShellProps = {
        title: string
        source?: boolean
        target?: boolean
        targetIsConnectable?: boolean
        sourceIsConnectable?: boolean
        children: Snippet
    }

    let {
        title,
        source,
        target,
        children,
        targetIsConnectable = true,
        sourceIsConnectable = true
    }: NodeShellProps = $props()

</script>

<div class="card node-card min-w-72 h-full relative transition-all duration-100 ease-in-out
            border border-base-300 shadow-sm hover:shadow-md hover:border-primary
            bg-base-100">
    <div class="bg-base-200 px-4 py-3 text-center border-b border-base-300">
        <h2 class="text-base font-semibold truncate">{title}</h2>
    </div>

    <div class="card-body py-3 px-4 space-y-2">
        {@render children()}
    </div>

    {#if source}
        <div class="absolute right-0 top-1/2 transform -translate-y-1/2">
            <SourceHandle isConnectable={sourceIsConnectable}/>
        </div>
    {/if}
    {#if target}
        <div class="absolute left-0 top-1/2 transform -translate-y-1/2">
            <TargetHandle isConnectable={targetIsConnectable}/>
        </div>
    {/if}
</div>
