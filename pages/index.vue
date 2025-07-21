<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
import HeaderKC from "~/components/header-kc.vue";
import MainFrame from "~/components/main-frame.vue";
import SiteSearch from "~/components/site-search.vue";
import BtnNav from "~/components/UI/btn-nav.vue";
import BtnNavMap from "~/components/UI/btn-nav-map.vue";
import Filters from "~/components/filters.vue";
import CardsContainer from "~/components/cards-container.vue";
import type { CardData } from "~/types/Icard";
import { ref, computed, onMounted } from 'vue';
import type { IFilterAccordion } from "~/types/IFilterAccordion";
import type { IFilter } from "~/types/IFilter";

// Логика nav кнопок
const activeNavButton = ref('Все');
const setActiveButton = (buttonName: string) => {
    activeNavButton.value = buttonName;
};

// Данные с siteSearch
const siteSearchText = ref<string>("");

// Загрузка cards.json и filter_json
const cards = ref<CardData[]>([]);
const filterAccordion = ref<IFilterAccordion[]>([]);
async function loadCards() {
    try {
        cards.value = await $fetch<CardData[]>('/cards.json');
    } catch (error) {
        console.error('Ошибка при загрузке cards.json:', error);
    }
}
async function loadFilterAccordion(){
    try {
        filterAccordion.value = await $fetch<IFilterAccordion[]>('/filter_accordion.json');
    } catch (error) {
        console.error('Ошибка при загрузке filter_accordion.json:', error);
    }
}
onMounted(() => {
    loadCards();
    loadFilterAccordion();
});

// Создаем cardsContainer с группировкой по category
const categories = computed(() => [...new Set(cards.value.map(c => c.category))]);
const cardsContainer = computed(() => {
    return categories.value.map(category => [
        category,
        cards.value.filter(card => card.category === category).map(card => ({
            id: card.id,
            title: card.title,
            category: card.category,
            subcategory: card.subcategory,
            cost: card.cost,
            isFirstFree: card.isFirstFree,
            minAge: card.minAge,
            maxAge: card.maxAge,
            address: card.address,
            buildingTitle: card.buildingTitle,
            schedule: card.schedule,
            timeSlots: card.timeSlots
        }))
    ]);
});

// Выбранный возраст
const selectedAge = ref<number>(0);
// Данные фильтра
const filter = ref<IFilter>({ filterAccordion, selectedAge });

// Фильтры

</script>

<template>
    <header-k-c></header-k-c>
    <main-frame>
        <navbar>
            <template #left>
                <site-search v-model="siteSearchText"></site-search>
                <btn-nav :class="{ active: activeNavButton === 'Все' }" @click="setActiveButton('Все')">Все</btn-nav>
                <btn-nav :class="{ active: activeNavButton === 'Платные' }" @click="setActiveButton('Платные')">Платные</btn-nav>
                <btn-nav :class="{ active: activeNavButton === 'Бесплатные' }" @click="setActiveButton('Бесплатные')">Бесплатные</btn-nav>
            </template>
            <template #right>
                <btn-nav-map>На карте</btn-nav-map>
            </template>
        </navbar>
        <div class="cards-container-filters-container">
            <div class="cards-container">
                <div class="cards-container">
                    <cards-container
                        v-for="[category, cards] in cardsContainer"
                        :category="category"
                        :cards="cards"
                    ></cards-container>
                </div>
            </div>
            <div class="filters-container">
                <filters
                    v-model="filter"
                ></filters>
            </div>
        </div>
    </main-frame>
</template>

<style scoped>
.cards-container-filters-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1400px;
    width: 100%;
    margin: 20px 40px 20px 40px;
    gap: 40px;
}

.cards-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.cards-container {
    display: flex;
    flex-direction: column;
}

.filters-container {
    flex-grow: 1;
    max-width: 330px;
}
</style>