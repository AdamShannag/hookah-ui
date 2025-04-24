<script lang="ts">
    import {Handle, Position} from '@xyflow/svelte';

    type SourceHandleProps = {
        isConnectable?: boolean
    }

    let {isConnectable}: SourceHandleProps = $props()
</script>
<Handle type="source" position={Position.Right} class="!h-5 !border-gray-500 !w-5" {isConnectable}/>
