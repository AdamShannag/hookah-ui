<script module lang="ts">
    export class ConditionsNodeState {
        conditions: { id: string, right: String, left: string, operator: string }[] = $state([
            {
                id: crypto.randomUUID(),
                operator: "eq",
                left: "",
                right: ""
            }
        ]);
    }
</script>

<script lang="ts">
    import {type Node, type NodeProps} from '@xyflow/svelte';
    import SourceHandle from "$components/handles/SourceHandle.svelte";
    import TargetHandle from "$components/handles/TargetHandle.svelte";

    let {data}: NodeProps<Node<{ conditionsNodeState: ConditionsNodeState }>> = $props();

    const addCondition = () => {
        data.conditionsNodeState.conditions.push({
            id: crypto.randomUUID(),
            operator: "eq",
            left: "",
            right: ""
        })
    }

    const deleteCondition = (id: string) => {
        data.conditionsNodeState.conditions = data.conditionsNodeState.conditions.filter((condition) => condition.id !== id)
    }
</script>

<div class="card node-card w-[40rem] relative transition-all duration-100 ease-in-out
            border border-base-300 shadow-sm hover:shadow-md hover:border-primary cursor-pointer
            bg-base-100">

    <div class="bg-base-200 px-4 py-3 flex items-center justify-between border-b border-base-300">
        <h2 class="text-base font-semibold">Conditions</h2>
        <button class="btn btn-sm btn-primary" onclick={addCondition}>+</button>
    </div>

    <div class="card-body pt-4 pb-6 px-6 space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 hover:scrollbar-thumb-base-400">
        {#each data.conditionsNodeState.conditions as item}
            <div class="flex gap-2 items-center">
                <input
                        class="nodrag input input-bordered w-full"
                        bind:value={item.left}
                        placeholder="Header.x-username"
                />
                <select class="nodrag select select-bordered" bind:value={item.operator}>
                    <option value="eq">Equals</option>
                    <option value="nq">Not Equals</option>
                    <option value="in">In</option>
                    <option value="notIn">Not In</option>
                    <option value="contains">Contains</option>
                    <option value="startsWith">Starts With</option>
                    <option value="endsWith">Ends With</option>
                </select>
                <input
                        class="nodrag input input-bordered w-full"
                        bind:value={item.right}
                        placeholder="Body.username"
                />
                <button class="btn btn-sm btn-error" onclick={() => deleteCondition(item.id)}>✕</button>
            </div>
        {/each}
    </div>

    <div class="absolute right-0 top-1/2 transform -translate-y-1/2">
        <SourceHandle/>
    </div>
    <div class="absolute left-0 top-1/2 transform -translate-y-1/2">
        <TargetHandle/>
    </div>
</div>

