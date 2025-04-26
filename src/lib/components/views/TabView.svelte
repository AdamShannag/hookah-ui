<script lang="ts">
    import type {Snippet} from "svelte";

    type TabViewProps = {
        firstTab: Snippet,
        secondTab: Snippet
    }

    let activeTab = $state(0)

    let {firstTab, secondTab}: TabViewProps = $props()
</script>


<div role="tablist" class="tabs tabs-box fixed z-50 top-5 left-1/2 transform -translate-x-1/2 bg-base-300">
    <button role="tab" class="tab" onclick={()=> activeTab= 0}
            class:tab-active={activeTab===0}>Flow
    </button>
    <button role="tab" class="tab" onclick={()=> activeTab= 1}
            class:tab-active={activeTab===1}>Data
    </button>
</div>

<div class:hidden={activeTab===1}>
    {@render firstTab()}
</div>

<div class:hidden={activeTab===0}>
    {@render secondTab()}
</div>