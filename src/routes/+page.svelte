<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import {SvelteFlowProvider} from "@xyflow/svelte";
    import {CodeEditor, DnDProvider, Flow, Menu, TabView} from "$components";
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
        <CodeEditor/>
    {/snippet}
</TabView>