<script setup lang="ts">

</script>

<template>
    <button class="btn-nav active">
        <div class="btn-nav-map"><slot></slot><img src="/assets/icons/map-ico.svg" alt=""></div>
    </button>
</template>

<style scoped>
    .btn-nav{
        padding: 10px 20px 10px 20px;
        font-weight: 400;
        font-size: 16px;
        height: 40px;
        border-radius: var(--small-border-radius);
        color: var(--black);
    }
    .active{
        background-color: var(--white);
    }
    .btn-nav-map{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .btn-nav-map img{
        width: 18px;
        height: 18px;
        margin-left: 10px;
    }
</style>