<script setup lang="ts">

import IcoDescription from "~/components/UI/ico-description.vue";
import BtnPink from "~/components/UI/btn-pink.vue";
import BtnBurgundy from "~/components/UI/btn-burgundy.vue";
import Schedule from "~/components/UI/schedule.vue";
import Border from "~/components/UI/border.vue";
import BtnBorder from "~/components/UI/btn-border.vue";
import { useRouter } from 'vue-router';

const props = defineProps<{
    card?: {
        id: number;
        title: string;
        category: string;
        subcategory: string;
        cost: string;
        isFirstFree: boolean;
        minAge: number;
        maxAge: number;
        address: string;
        buildingTitle: string;
        schedule: string;
        timeSlots: string[];
    }
}>()

// Переход на страницу card
const router = useRouter();
const toCard = () => {
    router.push(`/card/${props.card.id}`);
};
</script>

<template>
    <div class="mb-card">
        <border>
            <div class="card">
                <div class="card-image"><img src="../public/placeholder.svg" alt="placeholder"></div>
                <div class="card-list">
                    <div class="card-buttons-top-h3-container">
                        <h3 class="h3">{{ card.title }}</h3>
                        <div class="buttons-top">
                            <btn-border v-if="card.isFirstFree">Первое бесплатно</btn-border>
                            <btn-pink>{{ card.cost }}</btn-pink>
                        </div>
                    </div>
                    <div class="list-buttons-bottom">
                        <ul class="card-ul">
                            <li class="card-type">#{{ card.subcategory }}</li>
                            <li>
                                <ico-description icon-name="person">{{ card.minAge }}-{{ card.maxAge }} лет</ico-description>
                            </li>
                            <li>
                                <ico-description icon-name="place">{{ card.address }}</ico-description>
                            </li>
                            <li>
                                <ico-description icon-name="markerMap">{{ card.buildingTitle }}</ico-description>
                            </li>
                            <li class="time">
                                <ico-description icon-name="clock">{{ card.schedule }}</ico-description>
                                <schedule
                                    v-for="timeSlot in card.timeSlots"
                                    :timeSlot="timeSlot"
                                ></schedule>
                            </li>
                        </ul>
                        <div class="buttons-bottom">
                            <btn-burgundy @click="toCard">Подробнее</btn-burgundy>
                        </div>
                    </div>
                </div>
            </div>
        </border>
    </div>
</template>

<style scoped>
.mb-card {
    margin-bottom: 20px;
}
.card {
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.card-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-image img {
    width: 200px;
    height: 200px;
}

.card-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.card-buttons-top-h3-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}

.h3 {
    font-weight: 600;
    font-size: 16px;
    color: var(--black);
    white-space: pre-wrap;
}

.buttons-top {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.list-buttons-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.card-ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card-type {
    font-weight: 400;
    font-size: 14px;
    color: var(--pink);
}

.time {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 28px;
    gap: 10px;
}

.buttons-bottom {
    align-self: flex-end;
}
</style>