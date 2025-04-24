<script lang="ts">
    import {useSvelteFlow} from '@xyflow/svelte';
    import {Trash} from '@lucide/svelte';

    let {
        id,
        top,
        left,
        right,
        bottom,
        onclick,
    }: {
        id: string;
        top: number | undefined;
        left: number | undefined;
        right: number | undefined;
        bottom: number | undefined;
        onclick: () => void;
    } = $props();

    const {deleteElements} = useSvelteFlow();

    function deleteEdge() {
        deleteElements({edges: [{id}]});
    }
</script>

<a href={null}
   style="top: {top}px; left: {left}px; right: {right}px; bottom: {bottom}px;"
   class="absolute z-50 bg-base-200 shadow-lg rounded-md border border-base-300 w-44"
   {onclick}
   role="menu"
   tabindex="0">
    <div class="px-4 py-2 border-b border-base-300">
        <p class="text-xs text-neutral-content truncate">Edge</p>
    </div>

    <ul class="menu p-2 space-y-1 w-full">
        <li>
            <button class="btn btn-sm btn-ghost justify-start w-full text-error" onclick={deleteEdge}>
                <Trash size={20}/>
                Delete
            </button>
        </li>
    </ul>
</a>
