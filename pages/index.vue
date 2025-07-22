<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
import HeaderKC from "~/components/header-kc.vue";
import MainFrame from "~/components/main-frame.vue";
import SiteSearch from "~/components/site-search.vue";
import BtnNav from "~/components/UI/btn-nav.vue";
import BtnNavMap from "~/components/UI/btn-nav-map.vue";
import Filters from "~/components/filters.vue";
import CardsContainer from "~/components/cards-container.vue";
import type { ICard } from "~/types/Icard";
import { ref, computed, onMounted } from 'vue';
import type { IFilterAccordion } from "~/types/IFilterAccordion";
import type { IFilter } from "~/types/IFilter";
import type { IIncompleteCard } from "~/types/IIncompleteCard";
import type {IComboBoxAge} from "~/types/IComboBoxAge";

// Логика nav кнопок
const navButtons = ref(["Все", "Платные", "Бесплатные"])
const activeNavButton = ref('Все');
const setActiveButton = (buttonName: string) => {
    activeNavButton.value = buttonName;
};

// Данные с siteSearch
const siteSearchText = ref<string>();

// Загрузка cards.json и filter_json
const cards = ref<ICard[]>([]);
const filterAccordion = ref<IFilterAccordion[]>([]);
async function loadCards() {
    try {
        cards.value = await $fetch<ICard[]>('/cards.json');
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

// Данные для comboBoxAge
const comboBoxAge = ref<IComboBoxAge[]>([
    {age: "Любой", value: "0"},
    {age: "1 год", value: "1"},
    {age: "2 года", value: "2"},
    {age: "3 года", value: "3"},
    {age: "4 года", value: "4"},
    {age: "5 лет", value: "5"},
    {age: "6 лет", value: "6"},
    {age: "7 лет", value: "7"},
    {age: "8 лет", value: "8"},
    {age: "9 лет", value: "9"},
    {age: "10 лет", value: "10"},
    {age: "11 лет", value: "11"},
    {age: "12 лет", value: "12"},
    {age: "13 лет", value: "13"},
    {age: "14 лет", value: "14"},
    {age: "15 лет", value: "15"},
    {age: "16 лет", value: "16"},
    {age: "17 лет", value: "17"},
    {age: "18 лет", value: "18"},
]);

const selectedAge = ref<string>("0")

// Структура для filters
const filter = ref<IFilter>({ filterAccordion, comboBoxAge,  selectedAge});

// Создаем cardsContainer с группировкой по category
const categories = computed(() => [...new Set(cards.value.map(c => c.category))]);

interface ICardsContainer{
    category: string;
    incompleteCards: IIncompleteCard[];
}

const cardsContainer = computed<ICardsContainer[]>(() => {
    return categories.value.map(category => ({
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

// Фильтрация CardsContainer
const filteredCardsContainer = computed(() => {
    let result = cardsContainer.value;
    result = ageFilter(result);
    result = subCategoryFilter(result);
    result = isFreeFilter(result);
    result = siteSearchFilter(result,);
    setupCounters(result);
    return result;
});

function subCategoryFilter (cardsContainer: ICardsContainer[]){
    // Проверяем, все ли суб категории не выбраны
    const isSubCategoryAllNoSelected = filter.value.filterAccordion.every(
        accordion => accordion.subCategory.every(sub => !sub.isSelected)
    );

    // Если все ли суб категории не выбраны - возвращаем все карточки
    if (isSubCategoryAllNoSelected) {
        return cardsContainer;
    }

    // Фильтруем карточки внутри каждого контейнера
    return cardsContainer.map(container => ({
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
}

// Фильтрация по age
function ageFilter (cardsContainer: ICardsContainer[]){
    // Если выбраны все возраста
    if(filter.value.selectedAge === "0"){
        return cardsContainer;
    }
    // Если выбран конкретный возраст
    return cardsContainer.map(container => ({
        ...container, // Копируем все свойства контейнера
        incompleteCards: container.incompleteCards.filter(
            card => card.minAge <= filter.value.selectedAge && card.maxAge >= filter.value.selectedAge
        )
    }))
        // Удаляем контейнеры, в которых не осталось карточек после фильтрации
        .filter(container => container.incompleteCards.length > 0);
}
// Фильтрация по isFree
function isFreeFilter (cardsContainer: ICardsContainer[]){
    // Если фильтрация не нужна
    if(activeNavButton.value === "Все"){
        return cardsContainer;
    }

    // Если фильтрация нужна
    const isFree = activeNavButton.value === "Бесплатные";
    return cardsContainer.map(container => ({
        ...container, // Копируем все свойства контейнера
        incompleteCards: container.incompleteCards.filter(
            card => card.isFree === isFree
        )
    }))
        // Удаляем контейнеры, в которых не осталось карточек после фильтрации
        .filter(container => container.incompleteCards.length > 0);
}
// Фильтрация по siteSearch
function siteSearchFilter (cardsContainer: ICardsContainer[]){
    // Если фильтрация не нужна
    if(!siteSearchText.value){
        return cardsContainer;
    }

    // Если фильтрация нужна
    return cardsContainer.map(container => ({
        ...container, // Копируем все свойства контейнера
        incompleteCards: container.incompleteCards.filter(
            card => card.title.toLowerCase().includes(siteSearchText.value)
        )
    }))
        // Удаляем контейнеры, в которых не осталось карточек после фильтрации
        .filter(container => container.incompleteCards.length > 0);
}

// Counters для фильтра
function setupCounters(cardsContainer: ICardsContainer[]) {
    // Сначала обнуляем все счетчики
    filter.value.filterAccordion.forEach(accordion => {
        accordion.category.counter = 0;
        accordion.subCategory.forEach(sub => sub.counter = 0);
    });

    // Подсчет количества карточек по категориям и подкатегориям
    cardsContainer.forEach(container => {
        // Находим соответствующий аккордеон по категории
        const matchingAccordion = filter.value.filterAccordion.find(
            accordion => accordion.category.title === container.category
        );

        if (matchingAccordion) {
            // Увеличиваем счетчик категории
            matchingAccordion.category.counter += container.incompleteCards.length;

            // Подсчет подкатегорий
            container.incompleteCards.forEach(card => {
                const matchingSubCategory = matchingAccordion.subCategory.find(
                    sub => sub.title === card.subcategory
                );

                if (matchingSubCategory) {
                    matchingSubCategory.counter++;
                }
            });
        }
    });
}
</script>

<template>
    <header-k-c></header-k-c>
    <main-frame>
        <navbar>
            <template #left>
                <site-search v-model="siteSearchText"></site-search>
                <btn-nav v-for="name in navButtons" :class="{ active: activeNavButton === name }" @click="setActiveButton(name)">{{ name }}</btn-nav>
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