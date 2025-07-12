<script setup lang="ts">

</script>

<template>
    <div class="border">
        <slot></slot>
    </div>
</template>

<style scoped>
    .border{
        border-radius: var(--small-border-radius) var(--small-border-radius) 0 0;
        background-color: var(--white);
        border-top: 2px solid var(--burgundy);
        padding: 10px;
    }
</style>