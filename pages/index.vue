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
import type {IIncompleteCard} from "~/types/IIncompleteCard";

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

// Выбранный возраст
const selectedAge = ref<number>(0);
// Структура для filters
const filter = ref<IFilter>({ filterAccordion, selectedAge });

// Создаем cardsContainer с группировкой по category
const categories = computed(() => [...new Set(cards.value.map(c => c.category))]);

// Фильтрация по категориям
const filteredCategories = computed(() => {
    const categoriesValue = categories.value;
    const filterValue = filter.value;
    const hasAnySelectedCategory = filterValue.filterAccordion.some(
        accordion => accordion.category.isSelected
    );

    // Если ни одна категория не выбрана, возвращаем все категории
    if (!hasAnySelectedCategory) {
        return categoriesValue;
    }
    return categoriesValue.filter(category =>
        filterValue.filterAccordion.some(accordion =>
            (accordion.category.isSelected && accordion.category.title === category) ||
            (accordion.subCategory.some(subCategory => subCategory.isSelected))
        )
    );
});

interface ICardsContainer{
    category: string;
    incompleteCards: IIncompleteCard[];
}

const cardsContainer = computed<ICardsContainer[]>(() => {
    return filteredCategories.value.map(category => ({
        category: category,
        incompleteCards: cards.value.filter(card => card.category === category).map(card => ({
            id: card.id,
            title: card.title,
            category: card.category,
            subcategory: card.subcategory,
            isFree: card.isFree,
            cost: card.cost,
            isFirstFree: card.isFirstFree,
            minAge: card.minAge,
            maxAge: card.maxAge,
            address: card.address,
            buildingTitle: card.buildingTitle,
            schedule: card.schedule,
            timeSlots: card.timeSlots
        }))
    }));
});

// Фильтрация по суб категориям
const filteredCardsContainer = computed(() => {
    // Проверяем, все ли суб категории не выбраны
    const isSubCategoryAllNoSelected = filter.value.filterAccordion.every(
        accordion => accordion.subCategory.every(sub => sub.isSelected === false)
    );

    // Если все ли суб категории не выбраны - возвращаем все карточки
    if (isSubCategoryAllNoSelected) {
        return cardsContainer.value;
    }

    // Фильтруем карточки внутри каждого контейнера
    return cardsContainer.value.map(container => ({
        ...container, // Копируем все свойства контейнера
        incompleteCards: container.incompleteCards.filter(card =>
            // Оставляем только карточки с выбранными подкатегориями
            filter.value.filterAccordion.some(accordion =>
                accordion.subCategory.some(sub => sub.isSelected && sub.title === card.subcategory)
            )
        )
    }))
    // Удаляем контейнеры, в которых не осталось карточек после фильтрации
    .filter(container => container.incompleteCards.length > 0);
});

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
                        v-for="cardsContainer in filteredCardsContainer"
                        :category="cardsContainer.category"
                        :cards="cardsContainer.incompleteCards"
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