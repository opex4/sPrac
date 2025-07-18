<script setup lang="ts">
defineProps<{
    timeSlot?: {
        timeSlot: string
    }
}>()
</script>

<template>
    <span class="schedule">
        <slot>{{ timeSlot }}</slot>
    </span>
</template>

<style scoped>
    .schedule{
        font-weight: 400;
        font-size: 14px;
        color: var(--black);
        background-color: var(--beige);
        border-radius: var(--small-border-radius);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px 18px 4px 18px;
    }
</style>