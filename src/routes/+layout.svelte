<script lang="ts">
    import '../app.css';
    import '@xyflow/svelte/dist/style.css';
    import {setFlowState} from "$lib/state/flow-state.svelte";

    setFlowState()
    let {children} = $props();
</script>

{@render children()}
