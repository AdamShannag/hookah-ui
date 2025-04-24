import {getContext, setContext} from "svelte";
import {type Edge, type Node} from '@xyflow/svelte';
import type {Template} from "$lib/types/hookah-config";
import {getNodesByType} from "$lib/utils/flow-to-hookah";

export class FlowStateSvelte {
    nodes = $state.raw<Node[]>([])
    edges = $state.raw<Edge[]>([])

    updateState(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes;
        this.edges = edges;
    }

    getTemplates = (): Template[] => {
        return getNodesByType(this.nodes, "templateBlock")
            .map(node => {
                let data = node.data.templateNodeState as any
                return {name: data.name, content: data.content}
            })
    }

}


const FLOW_STATE_KEY = Symbol("FLOW_STATE");

export function setFlowState() {
    return setContext(FLOW_STATE_KEY, new FlowStateSvelte());
}

export function getFlowState() {
    return getContext<ReturnType<typeof setFlowState>>(FLOW_STATE_KEY);
}
