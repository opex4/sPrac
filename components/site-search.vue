<script setup lang="ts">
    const props = defineProps<{
        modelValue: string;
    }>();
    const emit = defineEmits(['update:modelValue']);
    const handleInput = (event: Event) => {
        emit('update:modelValue', (event.target as HTMLInputElement).value);
    };
</script>

<template>
    <div class="site-search">
        <div class="search-ico"><img src="../assets/icons/search-ico.svg" alt=""></div>
        <input class="input-search" placeholder="Поиск" @input="handleInput" :value="modelValue">
    </div>
</template>

<style scoped>
.site-search{
    background-color: var(--white);
    border: none;
    border-radius: var(--small-border-radius);
    height: 40px;
    width: 241px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-right: 11px;
    margin-right: 20px;
}
.search-ico{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 18px;
    margin-right: 11px;
}
.search-ico img{
    width: 18px;
    height: 18px;
}
.input-search{
    border: none;
    padding: 0;
    margin: 0;
}
input::placeholder {
    color: var(--pink);
    font-weight: 400;
    opacity: 1;
    font-size: 14px;
    leading-trim: NONE;
    line-height: 100%;
}
</style>