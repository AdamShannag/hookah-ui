<script lang="ts">
    import {Handle, Position} from '@xyflow/svelte';

    type TargetHandleProps = {
        isConnectable?: boolean
    }

    let {isConnectable}: TargetHandleProps = $props()
</script>
<Handle type="target" position={Position.Left} class="!h-5 !border-gray-500 !w-5" {isConnectable}/>