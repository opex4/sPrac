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
                <h2 class="h2 mb-20px">{{ card.title}}</h2>
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
                                    <ico-description icon-name="person">{{ card.minAge}}-{{ card.minAge}}</ico-description>
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
                        <div class="content-container">
                            <h3 class="h3">Содержание программы</h3>
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

    .content-container{
        display: flex;
        flex-direction: column;
    }
</style>