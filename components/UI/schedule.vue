<script setup lang="ts">

</script>

<template>
    <span class="schedule">
        <slot name="start"></slot>
        <div class="schedule-gap"></div>-<div class="schedule-gap"></div>
        <slot name="end"></slot>
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
    .schedule-gap{
        width: 10px;
    }
</style>