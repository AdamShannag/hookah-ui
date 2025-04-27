<script lang="ts">
    import {highlightLine} from "$lib/utils/highlight-line";

    type CodeViewProps = {
        content: string
    }

    let {content}: CodeViewProps = $props()
</script>

<div class="whitespace-pre-wrap text-sm font-mono">
    {#each content.split('\n') as line, i}
        <div class="flex gap-3 leading-relaxed text-xs">
            <span class="text-neutral-500 w-6 text-right select-none">{i + 1}</span>
            <code>{@html highlightLine(line)}</code>
        </div>
    {/each}
</div>