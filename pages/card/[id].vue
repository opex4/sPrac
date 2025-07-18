<script setup lang="ts">

import Navbar from "~/components/navbar.vue";
import HeaderKC from "~/components/header-kc.vue";
import MainFrame from "~/components/main-frame.vue";
import BtnNavMap from "~/components/UI/btn-nav-map.vue";
import BtnNavReturn from "~/components/UI/btn-nav-return.vue";
import Border from "~/components/UI/border.vue";
import { useRoute, useRouter } from 'vue-router';

// Маршрутизация
const route = useRoute();
const router = useRouter();
const id = computed(() => Number(route.params.id));
const goToHomePage = () => {
    router.push('/');
};

</script>

<template>
    <header-k-c></header-k-c>
    <main-frame>
        <navbar>
            <template #left>
                <btn-nav-return @click="goToHomePage">Назад</btn-nav-return>
            </template>
            <template #right>
                <btn-nav-map>На карте</btn-nav-map>
            </template>
        </navbar>
        <div class="card-container">
            <h2 class="h2">asd</h2>
            <border></border>
            <border></border>
            <border></border>
            <border></border>
        </div>
    </main-frame>
</template>

<style scoped>
    .card-container{
        max-width: 1400px;
        display: flex;
        flex-direction: column;

    }
    .h2{

    }
</style>