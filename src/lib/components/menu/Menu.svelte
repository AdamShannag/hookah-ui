<script lang="ts">
    import {Cuboid, FileText, Lock, PencilRuler, Ticket, Webhook} from '@lucide/svelte';
    import {MenuItem} from "$components";
</script>

<ul class="menu bg-base-200 lg:menu-horizontal rounded-box fixed z-50 top-10 left-1/2 transform -translate-x-1/2 gap-4">
    <MenuItem nodeType="receiverBlock">
        <Cuboid/>
        Receiver
    </MenuItem>

    <MenuItem nodeType="authBlock">
        <Lock/>
        Auth
    </MenuItem>

    <MenuItem nodeType="conditionsBlock">
        <PencilRuler/>
        Conditions
    </MenuItem>

    <MenuItem nodeType="eventBlock">
        <Ticket/>
        Event
    </MenuItem>

    <MenuItem nodeType="hookBlock">
        <Webhook/>
        Hook
    </MenuItem>

    <MenuItem nodeType="templateBlock">
        <FileText/>
        Template
    </MenuItem>
</ul>