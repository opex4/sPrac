<script setup lang="ts">

import Navbar from "~/components/navbar.vue";
import HeaderKC from "~/components/header-kc.vue";
import MainFrame from "~/components/main-frame.vue";
import SiteSearch from "~/components/site-search.vue";
import BtnNav from "~/components/UI/btn-nav.vue";
import BtnNavMap from "~/components/UI/btn-nav-map.vue";
import Border from "~/components/UI/border.vue";

// Реактивное состояние для активной кнопки
import { ref } from 'vue';
import Filters from "~/components/filters.vue";
import H2kc from "~/components/UI/h2kc.vue";
import CardsAgeContainer from "~/components/cards-age-container.vue";
const activeButton = ref('Все'); // По умолчанию активна кнопка "Все"

const setActiveButton = (buttonName) => {
    activeButton.value = buttonName; // Устанавливаем активную кнопку
};
</script>

<template>
    <header-k-c></header-k-c>
    <main-frame>
        <navbar>
            <template #left>
                <site-search></site-search>
                <btn-nav :class="{ active: activeButton === 'Все' }" @click="setActiveButton('Все')">Все</btn-nav>
                <btn-nav :class="{ active: activeButton === 'Платные' }" @click="setActiveButton('Платные')">Платные</btn-nav>
                <btn-nav :class="{ active: activeButton === 'Бесплатные' }" @click="setActiveButton('Бесплатные')">Бесплатные</btn-nav>
            </template>
            <template #right>
                <btn-nav-map>На карте</btn-nav-map>
            </template>
        </navbar>
        <div class="cards-container-filters-container">
            <div class="cards-container">
                <div class="cards-age-container">
                    <cards-age-container></cards-age-container>
                </div>
            </div>
            <div class="filters-container">
                <filters></filters>
            </div>
        </div>
    </main-frame>
</template>

<style scoped>
    .cards-container-filters-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 1400px;
        width: 100%;
        margin: 20px 40px 40px 40px;
        gap: 40px;
    }
    .cards-container{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .cards-age-container{
        display: flex;
        flex-direction: column;
    }
    .filters-container{
        flex-grow: 1;
        max-width: 330px;
    }
</style>