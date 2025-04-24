<script lang="ts">
    import type {Template} from "$lib/types/hookah-config";
    import {copyToClipboard} from "$lib/utils/copy-to-clipboard";
    import {Clipboard} from '@lucide/svelte';


    type TemplateCodeViewProps = {
        title: string,
        templates: Template[]
    }

    let {title, templates}: TemplateCodeViewProps = $props()
</script>
<section class="lg:w-1/2 space-y-4 max-h-[90vh] overflow-y-auto pr-1">
    <h2 class="text-lg font-semibold text-base-content">{title}</h2>

    <div class="grid gap-4">
        {#each templates as template}
            <div class="rounded-xl overflow-hidden shadow border border-base-300">
                <div class="bg-base-300 px-4 py-2 flex justify-between items-center text-sm font-medium">
                    <span class="truncate">{template.name}</span>
                    <button class="btn btn-xs btn-ghost" onclick={() => copyToClipboard(template.content)}>
                        <Clipboard size={20}/>
                    </button>
                </div>

                <div class="bg-base-200 px-4 py-3 text-sm leading-snug font-mono whitespace-pre-wrap overflow-x-auto">
                    <code>{template.content}</code>
                </div>
            </div>
        {/each}
    </div>
</section>