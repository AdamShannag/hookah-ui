import {ReceiverNodeState} from "$components/nodes/ReceiverNode.svelte";
import {AuthNodeState} from "$components/nodes/AuthNode.svelte";
import {ConditionsNodeState} from "$components/nodes/ConditionsNode.svelte";
import {EventNodeState} from "$components/nodes/EventNode.svelte";
import {HookNodeState} from "$components/nodes/HookNode.svelte";
import {TemplateNodeState} from "$components/nodes/TemplateNode.svelte";


export const validConnections: Record<string, string> = {
    receiverBlock: "authBlock",
    authBlock: "conditionsBlock",
    conditionsBlock: "eventBlock",
    eventBlock: "hookBlock",
    hookBlock: "templateBlock",
};

export const nodeStateFactory: Record<string, () => any> = {
    receiverBlock: () => ({receiverNodeState: new ReceiverNodeState()}),
    authBlock: () => ({authNodeState: new AuthNodeState()}),
    conditionsBlock: () => ({conditionsNodeState: new ConditionsNodeState()}),
    eventBlock: () => ({eventNodeState: new EventNodeState()}),
    hookBlock: () => ({hookNodeState: new HookNodeState()}),
    templateBlock: () => ({templateNodeState: new TemplateNodeState()}),
};

export function createFilledNodeState(type: string, data: any): any {
    switch (type) {
        case "receiverBlock": {
            const state = new ReceiverNodeState();
            const d = data.receiverNodeState || {};
            state.name = d.name ?? '';
            state.event_type_in = d.event_type_in ?? 'body';
            state.event_type_key = d.event_type_key ?? 'event_type';
            return { receiverNodeState: state };
        }
        case "authBlock": {
            const state = new AuthNodeState();
            const d = data.authNodeState || {};
            state.flow = d.flow ?? 'none';
            state.header_secret_key = d.header_secret_key;
            state.secret = d.secret;
            return { authNodeState: state };
        }
        case "conditionsBlock": {
            const state = new ConditionsNodeState();
            const d = data.conditionsNodeState || {};
            state.conditions = Array.isArray(d.conditions)
                ? d.conditions.map((item: any) => ({
                    id: item.id ?? crypto.randomUUID(),
                    operator: item.operator ?? 'eq',
                    left: item.left ?? '',
                    right: item.right ?? '',
                }))
                : [];
            return { conditionsNodeState: state };
        }
        case "eventBlock": {
            const state = new EventNodeState();
            const d = data.eventNodeState || {};
            state.event = d.event ?? '';
            return { eventNodeState: state };
        }
        case "hookBlock": {
            const state = new HookNodeState();
            const d = data.hookNodeState || {};
            state.name = d.name ?? '';
            state.endpoint_key = d.endpoint_key ?? '';
            state.body = d.body ?? '';
            return { hookNodeState: state };
        }
        case "templateBlock": {
            const state = new TemplateNodeState();
            const d = data.templateNodeState || {};
            state.name = d.name ?? '';
            state.content = d.content ?? '';
            return { templateNodeState: state };
        }
        default:
            throw new Error(`Unknown block type: ${type}`);
    }
}