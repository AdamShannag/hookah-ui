<script lang="ts">
    import {
        Background,
        BackgroundVariant,
        type ColorMode,
        Controls,
        type Edge,
        type IsValidConnection,
        MiniMap,
        type Node,
        type NodeEventWithPointer,
        SvelteFlow,
        useSvelteFlow
    } from '@xyflow/svelte';

    import '@xyflow/svelte/dist/style.css';

    import {useDnD} from '$components/flow/DnDProvider.svelte';
    import {getFlowState} from "$lib/state/flow-state.svelte.js";
    import {nodeStateFactory, validConnections} from "$lib/components/flow/flow";

    import {
        AuthNode,
        ConditionsNode,
        EdgeContextMenu,
        EventNode,
        HookNode,
        Menu,
        NodeContextMenu,
        ReceiverNode,
        TemplateNode
    } from "$components";

    const type = useDnD();
    const {screenToFlowPosition} = $derived(useSvelteFlow());
    const flowState = getFlowState()
    const snapGrid: [number, number] = [25, 25];

    let colorMode: ColorMode = $state('dark');
    let nodes = $state.raw<Node[]>([]);
    let edges = $state.raw<Edge[]>([]);

    const nodeTypes = {
        authBlock: AuthNode,
        receiverBlock: ReceiverNode,
        eventBlock: EventNode,
        conditionsBlock: ConditionsNode,
        hookBlock: HookNode,
        templateBlock: TemplateNode,
    };

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    };

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        const blockType = type.current;
        if (!blockType || !(blockType in nodeStateFactory)) return;

        const position = screenToFlowPosition({x: event.clientX, y: event.clientY});

        nodes = [
            ...nodes,
            {
                id: `${crypto.randomUUID()}`,
                type: blockType,
                data: nodeStateFactory[blockType](),
                position,
                origin: [0.5, 0.0],
            }
        ];
    };

    const isValidConnection: IsValidConnection = ({source, target}) => {
        const sourceNode = nodes.find(n => n.id === source);
        const targetNode = nodes.find(n => n.id === target);

        if (!sourceNode || !targetNode) return false;

        const isBasicValid = validConnections[sourceNode.type || ""] === targetNode.type;

        // Additional rule: Only one templateBlock per hookBlock
        if (sourceNode.type === "hookBlock" && targetNode.type === "templateBlock") {
            const existingTemplateConnections = edges.filter(edge =>
                edge.source === source &&
                nodes.find(n => n.id === edge.target)?.type === "templateBlock"
            );

            return isBasicValid && existingTemplateConnections.length === 0;
        }

        return isBasicValid;
    };

    $effect(() => {
        flowState.updateState(nodes, edges)
    })


    let menu: {
        id: string;
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
        type: string;
    } | null = $state(null);

    let edgeMenu: {
        id: string;
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    } | null = $state(null);

    let clientWidth: number = $state(0);
    let clientHeight: number = $state(0);


    const handleContextMenu: NodeEventWithPointer<MouseEvent> = ({event, node}) => {
        event.preventDefault();
        edgeMenu = null

        menu = {
            id: node.id,
            type: node.type || "Unknown Node",
            top: event.clientY < clientHeight - 200 ? event.clientY : undefined,
            left: event.clientX < clientWidth - 200 ? event.clientX : undefined,
            right:
                event.clientX >= clientWidth - 200
                    ? clientWidth - event.clientX
                    : undefined,
            bottom:
                event.clientY >= clientHeight - 200
                    ? clientHeight - event.clientY
                    : undefined,
        };
    };

    const handleEdgeContextMenu = ({edge, event}: { edge: Edge, event: MouseEvent }) => {
        event.preventDefault();
        menu = null

        edgeMenu = {
            id: edge.id,
            top: event.clientY < clientHeight - 200 ? event.clientY : undefined,
            left: event.clientX < clientWidth - 200 ? event.clientX : undefined,
            right:
                event.clientX >= clientWidth - 200
                    ? clientWidth - event.clientX
                    : undefined,
            bottom:
                event.clientY >= clientHeight - 200
                    ? clientHeight - event.clientY
                    : undefined,
        };
    };

    function handlePaneClick() {
        menu = null;
        edgeMenu = null;
    }
</script>

<div style="height:100vh;" bind:clientWidth bind:clientHeight>
    <Menu/>
    <SvelteFlow bind:nodes
                bind:edges
                {nodeTypes}
                fitView
                {colorMode}
                {snapGrid}
                ondragover={onDragOver}
                ondrop={onDrop}
                {isValidConnection}
                onnodecontextmenu={handleContextMenu}
                onedgecontextmenu={handleEdgeContextMenu}
                onpaneclick={handlePaneClick}
                onnodedragstart={()=>handlePaneClick()}
                attributionPosition="top-right">
        <Controls/>
        <Background variant={BackgroundVariant.Dots}/>
        <MiniMap/>
        {#if menu}
            <NodeContextMenu
                    onclick={handlePaneClick}
                    id={menu.id}
                    type={menu.type}
                    top={menu.top}
                    left={menu.left}
                    right={menu.right}
                    bottom={menu.bottom}
            />
        {/if}
        {#if edgeMenu}
            <EdgeContextMenu
                    onclick={handlePaneClick}
                    id={edgeMenu.id}
                    top={edgeMenu.top}
                    left={edgeMenu.left}
                    right={edgeMenu.right}
                    bottom={edgeMenu.bottom}
            />
        {/if}
    </SvelteFlow>
</div>