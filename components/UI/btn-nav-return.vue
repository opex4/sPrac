<script setup lang="ts">
const emit = defineEmits(['click']);
</script>

<template>
    <button @click="emit('click')" class="btn-nav active">
        <div class="btn-nav-map"><img src="/assets/icons/return-ico.svg" alt=""><slot></slot></div>
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
    margin-right: 10px;
}
</style>