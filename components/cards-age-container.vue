<script setup lang="ts">

    import H2kc from "~/components/UI/h2kc.vue";
    import Border from "~/components/UI/border.vue";
    import { ref, watch } from "vue";
    import BtnBorder from "~/components/UI/btn-border.vue";
    import BtnPink from "~/components/UI/btn-pink.vue";
    import IcoDescription from "~/components/UI/ico-description.vue";
    import BtnBurgundy from "~/components/UI/btn-burgundy.vue";
    import Schedule from "~/components/UI/schedule.vue";

    interface ageCards {
        title: string;
        ageMin: number;
        ageMax: number;
    }

    const ageCard = ref<ageCards[]>([
        { title: "Силовой спорт", ageMin: 10, ageMax: 18, },
        { title: "Единоборства", ageMin: 6, ageMax: 18, },
    ]);


</script>

<template>
    <h2kc>Силовой спорт</h2kc>
    <div class="mb-card">
        <border>
            <div class="card">
                <div class="card-image"><img src="../assets/icons/placeholder-ico.svg" alt="placeholder"></div>
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
                            <li><ico-description icon-name="person">10-18 лет</ico-description></li>
                            <li><ico-description icon-name="place">г. Иркутск, Юбилейный мкр., стр. 49/1</ico-description></li>
                            <li><ico-description icon-name="markerMap">ФОК “Юбилейный”</ico-description></li>
                            <li class="time">
                                <ico-description icon-name="clock">Пн, Ср, Пт</ico-description>
                                <schedule>
                                    <template #start>09:00</template>
                                    <template #end>10:30</template>
                                </schedule>
                                <schedule>
                                    <template #start>12:00</template>
                                    <template #end>13:30</template>
                                </schedule>
                                <schedule>
                                    <template #start>18:00</template>
                                    <template #end>19:30</template>
                                </schedule>
                            </li>
                        </ul>
                        <div class="buttons-bottom">
                            <btn-burgundy>Подробнее</btn-burgundy>
                        </div>
                    </div>
                </div>
            </div>
        </border>
    </div>
</template>

<style scoped>
    .mb-card{
        margin-bottom: 20px;
    }
    .card{
        margin: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    .card-image{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-image img{
        width: 200px;
        height: 200px;
    }
    .card-list{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .card-buttons-top-h3-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .h3{
        font-weight: 600;
        font-size: 16px;
        color: var(--black);
    }
    .buttons-top{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .list-buttons-bottom{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .card-ul{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .card-type{
        font-weight: 400;
        font-size: 14px;
        color: var(--pink);
    }
    .time{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 28px;
        gap: 10px;
    }
    .buttons-bottom{
        align-self: flex-end;
    }
</style>