<script lang="ts">
    import {useDnD} from '$components/flow/DnDProvider.svelte';
    import type {Snippet} from "svelte";

    type MenuItemProps = {
        nodeType: "receiverBlock" | "authBlock" | "conditionsBlock" | "eventBlock" | "hookBlock" | "templateBlock"
        children: Snippet
    }

    const type = useDnD();
    let {nodeType, children}: MenuItemProps = $props()


    const onDragStart = (event: DragEvent, nodeType: string) => {
        if (!event.dataTransfer) {
            return null;
        }

        type.current = nodeType;
        event.dataTransfer.effectAllowed = 'move';
    };
</script>
<li>
    <button
            ondragstart={(event) => onDragStart(event, nodeType)}
            draggable={true}>
        {@render children()}
    </button>
</li>