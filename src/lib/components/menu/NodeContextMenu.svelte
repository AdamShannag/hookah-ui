<script lang="ts">
    import {useNodes, useSvelteFlow} from '@xyflow/svelte';
    import {getBlockTitle} from "$lib/utils/get-block-title";
    import {Copy, Trash} from '@lucide/svelte';
    import {createFilledNodeState} from "$components/flow/flow";

    let {
        id,
        type,
        top,
        left,
        right,
        bottom,
        onclick,
    }: {
        id: string;
        type: string;
        top: number | undefined;
        left: number | undefined;
        right: number | undefined;
        bottom: number | undefined;
        onclick: () => void;
    } = $props();

    const {deleteElements} = useSvelteFlow();
    const nodes = useNodes();

    function duplicateNode() {
        const node = nodes.current.find((node) => node.id === id);
        if (node) {
            nodes.current = [
                ...nodes.current,
                {
                    ...node,
                    data: createFilledNodeState(node.type || "unknown", node.data),
                    id: `${crypto.randomUUID()}`,
                    position: {
                        x: node.position.x - 50,
                        y: node.position.y + 150,
                    },
                },
            ];
        }
    }

    function deleteNode() {
        deleteElements({nodes: [{id}]});
    }

</script>

<a href={null}
   style="top: {top}px; left: {left}px; right: {right}px; bottom: {bottom}px;"
   class="absolute z-50 bg-base-200 shadow-lg rounded-md border border-base-300 w-44"
   {onclick}
   role="menu"
   tabindex="0">
    <div class="px-4 py-2 border-b border-base-300">
        <p class="text-xs text-neutral-content truncate">{getBlockTitle(type)}</p>
    </div>

    <ul class="menu p-2 space-y-1 w-full">
        <li>
            <button class="btn btn-sm btn-ghost justify-start w-full" onclick={duplicateNode}>
                <Copy size={20}/>
                Duplicate
            </button>
        </li>
        <li>
            <button class="btn btn-sm btn-ghost justify-start w-full text-error" onclick={deleteNode}>
                <Trash size={20}/>
                Delete
            </button>
        </li>
    </ul>
</a>
