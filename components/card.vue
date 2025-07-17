<script setup lang="ts">

import IcoDescription from "~/components/UI/ico-description.vue";
import BtnPink from "~/components/UI/btn-pink.vue";
import BtnBurgundy from "~/components/UI/btn-burgundy.vue";
import Schedule from "~/components/UI/schedule.vue";
import Border from "~/components/UI/border.vue";
import BtnBorder from "~/components/UI/btn-border.vue";
</script>

<template>
    <border>
        <div class="card">
            <div class="card-image"><img src="../public/placeholder.svg" alt="placeholder"></div>
            <div class="card-list">
                <div class="card-buttons-top-h3-container">
                    <h3 class="h3">Тяжёлая атлетика<br>(в Юбилейном мкр.)</h3>
                    <div class="buttons-top">
                        <btn-border>Первое бесплатно</btn-border>
                        <btn-pink>Бесплатно</btn-pink>
                    </div>
                </div>
                <div class="list-buttons-bottom">
                    <ul class="card-ul">
                        <li class="card-type">#Тяжёлая атлетика</li>
                        <li>
                            <ico-description icon-name="person">10-18 лет</ico-description>
                        </li>
                        <li>
                            <ico-description icon-name="place">г. Иркутск, Юбилейный мкр., стр. 49/1</ico-description>
                        </li>
                        <li>
                            <ico-description icon-name="markerMap">ФОК “Юбилейный”</ico-description>
                        </li>
                        <li class="time">
                            <ico-description icon-name="clock">Пн, Ср, Пт</ico-description>
                            <schedule>09:00 - 10:30</schedule>
                            <schedule>12:00 - 13:30</schedule>
                            <schedule>18:00 - 19:30</schedule>
                        </li>
                    </ul>
                    <div class="buttons-bottom">
                        <btn-burgundy>Подробнее</btn-burgundy>
                    </div>
                </div>
            </div>
        </div>
    </border>
</template>

<style scoped>
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