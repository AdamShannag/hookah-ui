<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import {SvelteFlowProvider} from "@xyflow/svelte";
    import {getFlowState} from "$lib/state/flow-state.svelte";
    import {flowToHookah} from "$lib/utils/flow-to-hookah";
    import {DnDProvider, Flow, JsonCodeView, Menu, TabView, TemplatesView} from "$components";

    const flowState = getFlowState()
    let {nodes, edges} = $derived(flowState)
    let configs = $derived(flowToHookah(nodes, edges))
</script>

<TabView>
    {#snippet firstTab()}
        <SvelteFlowProvider>
            <div style="height:100vh;">
                <DnDProvider>
                    <Menu/>
                    <Flow/>
                </DnDProvider>
            </div>
        </SvelteFlowProvider>
    {/snippet}

    {#snippet secondTab()}
        <div class="flex flex-col lg:flex-row gap-6 w-11/12 max-w-7xl mx-auto mt-20">
            <JsonCodeView title="Configuration" data={configs}/>
            <TemplatesView title="Templates" templates={flowState.getTemplates()}/>
        </div>
    {/snippet}
</TabView>