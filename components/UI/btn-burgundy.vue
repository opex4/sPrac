<script setup lang="ts">
</script>

<template>
    <button class="btn-burgundy">
        <slot></slot>
    </button>
</template>

<style scoped>
    .btn-burgundy{
        border-radius: var(--small-border-radius);
        background-color: var(--burgundy);
        color: var(--white);
        padding: 10px 20px 10px 20px;
        height: 37px;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>