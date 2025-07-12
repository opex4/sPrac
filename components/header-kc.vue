<script setup lang="ts">

</script>

<template>
    <header class="header">
        <div class="header-container">
            <div class="header-logo"><img src="../assets/icons/header-ico.svg" alt=""></div>
            <h1 class="header-h1">KidsConnect</h1>
        </div>
    </header>
</template>

<style scoped>
    .header{
        background-color: var(--burgundy);
        border-radius: var(--big-border-radius);
        max-width: 1480px;
        height: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        margin: 20px auto 0;
    }
    .header-container{
        min-width: 301px;
        height: 76px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
    }
    .header-logo img{
        width: 76px;
        height: 76px;
    }
    .header-h1{
        color: var(--white);
        font-weight: 600;
        font-size: 32px;
    }
</style>