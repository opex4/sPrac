<script setup lang="ts">
import { defineProps, computed } from 'vue';

// Импорт всех иконок
import personIco from '~/assets/icons/person-ico.svg';
import clockIco from '~/assets/icons/clock-ico.svg';
import markerMapIco from '~/assets/icons/marker-map-ico.svg';
import placeIco from '~/assets/icons/place-ico.svg';

// Определяем пропсы с типизацией
const props = defineProps<{
    iconName: string; // Пропс для названия иконки
}>();

// Объект с маппингом имён иконок
const icons = {
    person: personIco,
    clock: clockIco,
    markerMap: markerMapIco,
    place: placeIco,
};

// Вычисляемое свойство для выбора иконки
const imageSrc = computed(() => {
    return icons[props.iconName] || personIco; // Дефолтная иконка, если имя не найдено
});
</script>

<template>
    <div class="ico-description">
        <img :src="imageSrc" alt="ico">
        <span><slot></slot></span>
    </div>
</template>

<style scoped>
.ico-description {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    font-size: 16px;
    color: var(--black);
}

.ico-description img {
    width: 18px;
    height: 18px;
}
</style>