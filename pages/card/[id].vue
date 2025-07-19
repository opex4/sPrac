<script setup lang="ts">

import Navbar from "~/components/navbar.vue";
import HeaderKC from "~/components/header-kc.vue";
import MainFrame from "~/components/main-frame.vue";
import BtnNavMap from "~/components/UI/btn-nav-map.vue";
import BtnNavReturn from "~/components/UI/btn-nav-return.vue";
import Border from "~/components/UI/border.vue";
import { useRoute, useRouter } from 'vue-router';
import BtnBorder from "~/components/UI/btn-border.vue";
import BtnPink from "~/components/UI/btn-pink.vue";
import IcoDescription from "~/components/UI/ico-description.vue";
import BtnBurgundy from "~/components/UI/btn-burgundy.vue";
import type { CardData } from "~/types/Icard";
import Placeholder from "~/public/placeholder.svg";
import Athletics from "~/public/athletics.svg";
import { ref, computed, onMounted } from 'vue';
import Schedule from "~/components/UI/schedule.vue";

// Маршрутизация
const route = useRoute();
const router = useRouter();
const id = computed(() => Number(route.params.id));
const goToHomePage = () => {
    router.push('/');
};

// Загрузка cards.json
const cards = ref<CardData[]>([]);
async function loadCards() {
    try {
        cards.value = await $fetch<CardData[]>('/cards.json');
    } catch (error) {
        console.error('Ошибка при загрузке cards.json:', error);
    }
}
onMounted(() => {
    loadCards();
});

// Информация для карточки
const card = computed(() => cards.value.find((c) => c.id === Number(id.value)));

// Картинка карточки
const images = {
    placeholder: Placeholder,
    athletics: Athletics
};
const image = computed(() => images[card.value.img as keyof typeof images] || images.placeholder);

// Интерфейс для элементов аккордеона
interface Accordion {
    isOpen: boolean;
    subIsOpen: boolean[];
}
const accordion = ref<Accordion>({ isOpen: true, subIsOpen: [true, false] })
const accordionOpen = () => {
    accordion.value.isOpen = !accordion.value.isOpen;
};
const subAccordionOpen = (index: number) => {
    accordion.value.subIsOpen[index] = !accordion.value.subIsOpen[index];
};
</script>

<template>
    <p v-if="!card">Загрузка...</p>
    <div v-else>
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
            <div class="extended-card-container">
                <h2 class="h2 mb-20px">{{ card.title }}</h2>
                <div class="mb-20px"><border>
                    <div class="m-10px">
                        <div class="recruitment-container">
                            <div class="recruitment-img"><img :src="image" alt="image"></div>
                            <div class="recruitment-info">
                                <div class="recruitment-cost">
                                    <btn-border>Набор открыт</btn-border>
                                    <div class="recruitment-cost-right">
                                        <btn-border v-if="card.isFirstFree">Первое бесплатно</btn-border>
                                        <btn-pink>{{ card.cost }}</btn-pink>
                                    </div>
                                </div>
                                <div class="recruitment-desc-info">
                                    <ico-description icon-name="person">{{ card.minAge }}-{{ card.minAge }}</ico-description>
                                    <ico-description icon-name="place">{{ card.address }}</ico-description>
                                    <ico-description icon-name="markerMap">{{ card.buildingTitle }}</ico-description>
                                </div>
                                <div class="recruitment-btn-burgundy">
                                    <btn-burgundy>Записаться</btn-burgundy>
                                </div>
                            </div>
                        </div>
                    </div>
                </border></div>
                <div class="mb-20px"><border>
                    <div class="m-10px">
                        <div class="group-schedule-container">
                            <div class="group-container">
                                <h3 class="h3">группы</h3>
                                <span class="strange-text">Этап начальной подготовки</span>
                                <ico-description icon-name="education">{{ card.teacher }}</ico-description>
                                <ico-description icon-name="group">{{ card.remainingPlaces }}</ico-description>
                                <ico-description icon-name="duration">{{ card.duration }}</ico-description>
                            </div>
                            <div class="schedule-container">
                                <h3 class="h3">расписание занятий</h3>
                                <ico-description icon-name="clock">&nbsp;&nbsp;{{ card.schedule }}</ico-description>
                                <div class="time">
                                    <ico-description icon-name="clock">{{ card.schedule }}</ico-description>
                                    <schedule
                                        v-for="timeSlot in card.timeSlots"
                                        :timeSlot="timeSlot"
                                    ></schedule>
                                </div>
                            </div>
                        </div>
                    </div>
                </border></div>
                <div class="mb-20px"><border>
                    <div class="m-10px">
                        <div class="description-container">
                            <h3 class="h3">описание</h3>
                            <div class="description-text-container">
                                <p class="description-text">{{ card.description }}</p>
                            </div>
                        </div>
                    </div>
                </border></div>
                <div class="mb-20px"><border>
                    <div class="m-10px">
                        <div class="accordion-header" :class="{ open: accordion.isOpen }" @click="accordionOpen()">
                            <h3 class="h3">содержание программы</h3>
                            <span class="arrow" :class="{ open: accordion.isOpen }">
                                <div class="sizes-ico-accordion">
                                    <img src="../../assets/icons/accordion-ico.svg" alt="ico">
                                </div>
                            </span>
                        </div>
                        <div class="accordion-content" :class="{ open: accordion.isOpen }" v-for="(component, index) in card.contents" :key="index">
                            <div class="sub-accordion-header" @click="subAccordionOpen(index)">
                                <h4 class="h4">{{ component.title }}</h4>
                                <span class="arrow" :class="{ open: accordion.subIsOpen[index] }">
                                    <div class="sizes-ico-accordion">
                                        <img src="../../assets/icons/accordion-ico.svg" alt="ico">
                                    </div>
                                </span>
                            </div>
                            <div class="sub-accordion-content" :class="{ open: accordion.subIsOpen[index] }">
                                <div class="sub-accordion-list" v-for="(paragraph, contentIndex) in component.paragraph" :key="contentIndex">
                                    <h5 class="h5">{{ paragraph.h5 }}</h5>
                                    <ul class="ul-gap">
                                        <li class="li-accordion" v-for="(li, contentIndex) in paragraph.li" :key="contentIndex">
                                            <img src="../../assets/icons/list-marker-ico.svg" alt="marker" v-if="li || li.length !== 0">
                                            <span class="li-text">{{ li }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </border></div>
                <div class="mb-20px"></div>
            </div>
        </main-frame>
    </div>
</template>

<style scoped>
    .extended-card-container{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        max-width: 1400px;
        width: 100%;
    }
    .h2{
        font-weight: 600;
        font-size: 24px;
        color: var(--burgundy-dark);
        margin-top: 20px;
    }
    .mb-20px{
        margin-bottom: 20px;
    }
    .m-10px{
        margin: 10px;
    }

    .recruitment-container{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .recruitment-img{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .recruitment-img img{
        width: 200px;
        height: 200px;
    }
    .recruitment-info{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 1140px;
    }
    .recruitment-cost{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .recruitment-cost-right{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .recruitment-desc-info{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .recruitment-btn-burgundy{
        align-self: flex-end;
        margin-top: 41px;
    }

    .group-schedule-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .group-container {
        max-width: 392px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .h3 {
        font-weight: 600;
        font-size: 18px;
        leading-trim: NONE;
        text-transform: uppercase;
        color: var(--burgundy);
    }
    .strange-text {
        font-weight: 500;
        font-size: 16px;
        color: var(--black);
    }
    .schedule-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .time {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 28px;
        gap: 10px;
    }

    .description-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .description-text-container{
        flex-grow: 1;
        max-width: 1000px;
    }
    .description-text{
        font-weight: 400;
        font-size: 14px;
        color: var(--black);
    }

    /* Стили для аккордеона */
    .accordion-header {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: margin-bottom 0.3s ease;
    }
    .accordion-header.open{
        margin-bottom: 5px;
        transition: margin-bottom 0.3s ease;
    }
    .sizes-ico-accordion img {
        width: 20px;
        height: 20px;
    }
    .accordion-content {
        display: flex;
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        transition: max-height, hidden 0.3s ease;
    }
    .accordion-content.open {
        max-height: none;
        transition: max-height, hidden 0.3s ease;
    }
    .arrow {
        transition: transform 0.3s ease;
    }
    .arrow.open {
        transform: rotate(180deg);
    }

    /* Стили для sub аккордеона*/
    .sub-accordion-header{
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 20px;
    }
    .sub-accordion-content {
        max-height: 0;
        transition: max-height 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    .sub-accordion-content.open {
        max-height: 1000px;
    }
    .h4{
        font-weight: 600;
        font-size: 16px;
        color: var(--burgundy);
    }
    .sub-accordion-list{
        margin-right: 10px;
        margin-left: 10px;
    }
    .h5{
        color: var(--black);
        font-weight: 400;
        font-size: 14px;
    }
    .li-accordion {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-left: 2px;
    }
    .li-text {
        margin-left: 12px;
        color: var(--black);
        font-weight: 400;
        font-size: 14px;
    }
    .ul-gap {
        display: flex;
        flex-direction: column;
    }
</style>