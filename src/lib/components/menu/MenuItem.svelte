<script lang="ts">
    import {useDnD} from '$components/flow/DnDProvider.svelte';
    import type {Snippet} from "svelte";
    import {useNodes, useSvelteFlow} from "@xyflow/svelte";
    import {nodeStateFactory} from "$components/flow/flow";

    type MenuItemProps = {
        nodeType: "receiverBlock" | "authBlock" | "conditionsBlock" | "eventBlock" | "hookBlock" | "templateBlock"
        children: Snippet
    }

    const type = useDnD();
    let {nodeType, children}: MenuItemProps = $props()
    let {update} = useNodes()
    let {screenToFlowPosition} = $derived(useSvelteFlow())


    const onDragStart = (event: DragEvent, nodeType: string) => {
        if (!event.dataTransfer) {
            return null;
        }

        type.current = nodeType;
        event.dataTransfer.effectAllowed = 'move';
    };

    const onClick = () => {
        update(nodes => {
            const position = screenToFlowPosition({x: window.innerWidth / 1.8, y: window.innerHeight / 2.5});

            return [
                ...nodes,
                {
                    id: `${crypto.randomUUID()}`,
                    type: nodeType,
                    data: nodeStateFactory[nodeType](),
                    position,
                    origin: [0.5, 0.0],
                }
            ];
        })
    }
</script>
<li>
    <button
            ondragstart={(event) => onDragStart(event, nodeType)}
            draggable={true}
            onclick={onClick}>
        {@render children()}
    </button>
</li>