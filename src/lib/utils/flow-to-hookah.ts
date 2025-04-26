import {type Edge, type Node} from '@xyflow/svelte';
import {type Config, type Event, type Hook} from "$lib/types/hookah-config";

export const flowToHookah = (nodes: Node[], edges: Edge[]) => {
    let config: Config[] = []
    const receiverNodes = getNodesByType(nodes, 'receiverBlock');

    receiverNodes.forEach((node) => {
        const connectedNodes = getConnectedNodesById(nodes, edges, node.id);
        config.push(buildConfigWithGraph(connectedNodes, edges))
    });

    return config;
};


export const getNodesByType = (nodes: Node[], type: string): Node[] =>
    nodes.filter(node => node.type === type);

const getConnectedNodesById = (nodes: Node[], edges: Edge[], startId: string): Node[] => {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    if (!nodeMap.has(startId)) return [];

    const adjacency = buildAdjacencyMap(edges);
    const visited = new Set<string>();
    const queue = [startId];
    visited.add(startId);

    while (queue.length > 0) {
        const current = queue.shift()!;
        for (const neighbor of adjacency.get(current) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return [...visited].map(id => nodeMap.get(id)!);
};

const buildAdjacencyMap = (edges: Edge[]): Map<string, Set<string>> => {
    const adjacency = new Map<string, Set<string>>();
    for (const edge of edges) {
        if (!adjacency.has(edge.source)) adjacency.set(edge.source, new Set());
        if (!adjacency.has(edge.target)) adjacency.set(edge.target, new Set());
        adjacency.get(edge.source)!.add(edge.target);
        adjacency.get(edge.target)!.add(edge.source);
    }
    return adjacency;
};

const buildConfigWithGraph = (nodes: Node[], edges: Edge[]): Config => {
    const config: Config = {
        receiver: '',
        auth: {flow: 'none'},
        event_type_in: '',
        event_type_key: '',
        events: [],
    };

    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const adjacency = buildAdjacencyMap(edges);

    for (const node of nodes) {
        const s = node.data as any;
        switch (node.type) {
            case 'receiverBlock':
                config.receiver = s.receiverNodeState.name;
                config.event_type_in = s.receiverNodeState.event_type_in;
                config.event_type_key = s.receiverNodeState.event_type_key;
                break;
            case 'authBlock':
                config.auth = {
                    flow: s.authNodeState.flow,
                    header_secret_key: s.authNodeState.header_secret_key,
                    secret: s.authNodeState.secret,
                };
                break;
        }
    }

    const eventNodes = getNodesByType(nodes, 'eventBlock');
    for (const eventNode of eventNodes) {
        const event = buildEvent(eventNode, nodeMap, adjacency);
        config.events.push(event);
    }

    return config;
};

const buildEvent = (eventNode: Node, nodeMap: Map<string, Node>, adjacency: Map<string, Set<string>>): Event => {
    const state = eventNode.data as any;
    const event: Event = {
        event: state.eventNodeState.event,
        conditions: [],
        hooks: [],
    };

    const connectedIds = adjacency.get(eventNode.id) || new Set();
    for (const neighborId of connectedIds) {
        const neighborNode = nodeMap.get(neighborId);
        if (!neighborNode) continue;

        const s = neighborNode.data as any;

        if (neighborNode.type === 'conditionsBlock') {
            const conditions = s.conditionsNodeState.conditions
                .map((c: any) => `{${c.left}} {${c.operator}} {${c.right}}`);
            event.conditions.push(...conditions);
        }

        if (neighborNode.type === 'hookBlock') {
            const hook = buildHook(neighborNode, nodeMap, adjacency);
            event.hooks.push(hook);
        }
    }

    return event;
};

const buildHook = (hookNode: Node, nodeMap: Map<string, Node>, adjacency: Map<string, Set<string>>): Hook => {
    const s = hookNode.data as any;
    let body = s.hookNodeState.body;

    const hookConnectedIds = adjacency.get(hookNode.id) || new Set();
    for (const hookNeighborId of hookConnectedIds) {
        const hookNeighbor = nodeMap.get(hookNeighborId) as any;
        if (hookNeighbor?.type === 'templateBlock') {
            body = hookNeighbor.data.templateNodeState.name;
            break;
        }
    }

    return {
        name: s.hookNodeState.name,
        endpoint_key: s.hookNodeState.endpoint_key,
        body,
    };
};
