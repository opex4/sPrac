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
    background-color: var(--white);
    color: var(--burgundy-dark);
    padding: 5px 15px 5px 15px;
    height: 25px;
    border: 1px solid var(--pink);
    font-weight: 600;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>