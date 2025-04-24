<script lang="ts">
    import {Clipboard} from '@lucide/svelte';
    import {copyToClipboard} from "$lib/utils/copy-to-clipboard";
    import {highlightLine} from "$lib/utils/highlight-line";

    type JsonCodeView = {
        title: string
        data: any
    }

    let {title, data}: JsonCodeView = $props()
</script>

<section class="lg:w-1/2 space-y-4">
    <h2 class="text-lg font-semibold text-base-content">{title}</h2>
    <div class="rounded-xl overflow-hidden shadow border border-base-300">
        <div class="bg-base-300 px-4 py-2 flex justify-between items-center text-sm font-medium">
            <span class="truncate">config.json</span>
            <button class="btn btn-xs btn-ghost"
                    onclick={() => copyToClipboard(JSON.stringify(data, null, 2))}>
                <Clipboard size={20}/>
            </button>
        </div>

        <div class="bg-base-200 px-4 py-2 text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-[80vh] overflow-y-auto rounded-b-xl">
            {#each JSON.stringify(data, null, 2).split('\n') as line, i}
                <div class="flex gap-3 leading-snug text-xs">
                    <span class="text-neutral-500 w-6 text-right select-none">{i + 1}</span>
                    <code>{@html highlightLine(line)}</code>
                </div>
            {/each}
        </div>
    </div>
</section>