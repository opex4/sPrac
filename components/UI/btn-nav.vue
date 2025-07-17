<script setup lang="ts">

</script>

<template>
    <button class="btn-nav" :class="{ active: $attrs.class?.includes('active') }">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn-nav {
    padding: 10px 20px 10px 20px;
    font-weight: 400;
    font-size: 16px;
    height: 40px;
    border-radius: var(--small-border-radius);
    color: var(--black);
}

.active {
    background-color: var(--white);
}
</style>