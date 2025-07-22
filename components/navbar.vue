<script setup lang="ts">

</script>

<template>
    <nav class="navbar">
        <div class="nav-buttons">
            <slot name="left"></slot>
        </div>
        <slot name="right"></slot>
    </nav>
</template>

<style scoped>
    .navbar{
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1400px;
        width: 100%;
        height: 40px;
        margin: 40px 40px 0 40px;
    }
    .nav-buttons{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
</style>