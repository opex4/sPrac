<script setup lang="ts">

</script>

<template>
    <button class="btn-nav" :class="{ active: $attrs.class?.includes('active') }">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn-nav {
    font-weight: 400;
    font-size: 16px;
    height: 40px;
    border-radius: var(--small-border-radius);
    color: var(--black);
    padding: 10px 0 10px 0;
    transition-duration: 200ms;
    transition-property: padding;
}

.active {
    background-color: var(--white);
    padding: 10px 20px 10px 20px;
}
</style>