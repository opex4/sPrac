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
    background-color: var(--pink);
    color: var(--white);
    padding: 5px 15px 5px 15px;
    height: 25px;
    font-weight: 500;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>