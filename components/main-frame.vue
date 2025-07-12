<script setup lang="ts">

</script>

<template>
    <main class="main-container"><slot></slot></main>
</template>

<style scoped>
    .main-container{
        margin: 30px auto 0;
        background-color: #EFEFEF;
        border-radius: var(--big-border-radius);
        max-width: 1480px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>