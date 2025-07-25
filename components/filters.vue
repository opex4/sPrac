<script setup lang="ts">
import Border from "~/components/UI/border.vue";
import H2kc from "~/components/UI/h2kc.vue";
import type { IFilter } from "~/types/IFilter";

// Синхронизация с v-model
const props = defineProps<{
    modelValue: IFilter;
}>();

// Событие для v-model в родительском компоненте
const emit = defineEmits(['update:modelValue']);

const toggleItem = (index: number) => {
    const updatedValue = {...props.modelValue};
    updatedValue.filterAccordion[index].isOpen = !updatedValue.filterAccordion[index].isOpen;
    emit('update:modelValue', updatedValue);
};

const changeSelect = (index: number) => {
    const updatedValue = {...props.modelValue};
    updatedValue.filterAccordion[index].category.isSelected = !updatedValue.filterAccordion[index].category.isSelected;
    updatedValue.filterAccordion[index].subCategory.forEach(subCategory =>
        subCategory.isSelected = updatedValue.filterAccordion[index].category.isSelected
    )
    emit('update:modelValue', updatedValue);
};

const changeSubSelect = (indexCat: number, indexSubCat: number) => {
    const updatedValue = {...props.modelValue};
    updatedValue.filterAccordion[indexCat].subCategory[indexSubCat].isSelected = !updatedValue.filterAccordion[indexCat].subCategory[indexSubCat].isSelected;
    if(updatedValue.filterAccordion[indexCat].subCategory.some(subCategory => subCategory.isSelected)){
        updatedValue.filterAccordion[indexCat].category.isSelected = true;
    }
    if(updatedValue.filterAccordion[indexCat].subCategory.every(subCategory => !subCategory.isSelected)){
        updatedValue.filterAccordion[indexCat].category.isSelected = false;
    }
    emit('update:modelValue', updatedValue);
};

const handleChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    const updatedValue = {...props.modelValue};
    updatedValue.selectedAge = value;
    emit('update:modelValue', updatedValue);
};
</script>

<template>
    <h2kc>Фильтры</h2kc>
    <border>
        <form class="f-cont">
            <h3 class="h3">Возраст</h3>
            <div class="border-down">
                <select v-model="modelValue.selectedAge" name="dropdown" class="combobox-age" @change="handleChange">
                    <option v-for="option in modelValue.comboBoxAge" :key="option.value" :value="option.value">
                        {{ option.age }}
                    </option>
                </select>
            </div>
            <h3 class="h3 h3-mb-5px">Пол</h3>
            <div class="checkboxes">
                <label class="checkbox-text-container">
                    <input type="checkbox" name="checkboxM" value="male" checked>
                    <div class="checkbox"></div>
                    <span>Мужской</span>
                </label>
                <label class="checkbox-text-container">
                    <input type="checkbox" name="checkboxF" value="female" checked>
                    <div class="checkbox"></div>
                    <span>Женский</span>
                </label>
            </div>
            <h3 class="h3 h3-mb-0">Каталог</h3>
            <div v-for="(item, index) in modelValue.filterAccordion" :key="index">
                <div class="accordion-header">
                    <div class="accordion-header-left">
                        <span class="category-title c-p" @click="changeSelect(index)" :class="{ selected: item.category.isSelected }">{{ item.category.title }}</span>
                        <span class="counter" v-if="item.category.counter || item.category.counter !== 0">{{ item.category.counter }}</span>
                    </div>
                    <span class="arrow" :class="{ open: item.isOpen }" @click="toggleItem(index)">
                        <div class="sizes-ico-accordion c-p">
                          <img src="../assets/icons/accordion-ico.svg" alt="ico">
                        </div>
                    </span>
                </div>
                <div class="accordion-content" :class="{ open: item.isOpen }">
                    <ul class="ul-gap">
                        <li class="li-accordion" v-for="(subCategory, ind) in item.subCategory" :key="ind">
                            <div v-if="subCategory.title || subCategory.title !== ''">
                                <img src="../assets/icons/list-marker-ico.svg" alt="marker">
                                <span class="li-text c-p" @click="changeSubSelect(index, ind)" :class="{ selected: subCategory.isSelected }">{{ subCategory.title }}</span>
                                <span class="counter" v-if="subCategory.counter || subCategory.counter !== 0">{{ subCategory.counter }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </border>
</template>

<style scoped>
.f-cont {
    margin: 0 10px 10px 10px;
    font-weight: 400;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    color: var(--black);
}

.h3 {
    font-weight: 600;
    font-size: 14px;
    color: var(--black);
    margin-bottom: 15px;
}

.h3-mb-5px {
    margin-bottom: 5px;
}

.h3-mb-0 {
    margin-bottom: 0;
}

.border-down {
    border-radius: 0 0 var(--small-border-radius) var(--small-border-radius);
    border-bottom: 1px solid var(--burgundy);
    height: 27px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* Для позиционирования стрелки */
}

.border-down::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-80%); /* Наиболее подходящее значение для центрирования картинки по вертикали */
    pointer-events: none; /* Чтобы клик проходил через стрелку */
    width: 15px;
    height: 15px;
    background-image: url('../assets/icons/combobox-age-ico.svg');
    background-size: contain; /* Масштабирование изображения */
    background-repeat: no-repeat;
}

.combobox-age {
    width: 270px;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 14px;
    color: var(--black);
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
}

.combobox-age option:checked {
    background-color: var(--grey-dark);
}

/* Стили для чекбокса */
.checkboxes {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 17px;
    margin-bottom: 15px;
    gap: 20px;
}

.checkbox-text-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

.checkbox-text-container input[type="checkbox"] {
    display: none; /* Скрываем нативный чекбокс */
}

.checkbox {
    width: 12px;
    height: 12px;
    border: 2px solid var(--burgundy); /* Рамка */
    border-radius: 4px; /* Скругление углов */
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox-text-container input[type="checkbox"]:checked + .checkbox {
    background-color: var(--burgundy); /* Цвет фона при выборе */
    border: none;
    width: 16px;
    height: 16px;
}

/* Галочка */
.checkbox-text-container input[type="checkbox"]:checked + .checkbox::after {
    content: '';
    background-image: url('../assets/icons/checkbox-ico.svg');
    background-size: contain; /* Масштабирование изображения */
    background-repeat: no-repeat; /* Убираем повторение */
    width: 16px;
    height: 16px;
    line-height: 15px; /* Выравнивание по высоте чекбокса */
    text-align: center;
}

/* Стили для аккордеона */
.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 15px;
}

.accordion-header-left{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.category-title:hover {
    color: var(--pink);
}

.category-title.selected{
    color: var(--burgundy);
}

.counter{
    font-weight: 400;
    font-size: 14px;
    color: var(--burgundy);
    margin-left: 10px;
}

.sizes-ico-accordion img {
    width: 15px;
    height: 15px;
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease-out;
}

.accordion-content.open {
    max-height: 300px; /* Увеличено для списков */
    margin-top: 15px;
}

.c-p{
    cursor: pointer;
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
}

.li-text:hover {
    color: var(--pink);
}

.li-text.selected{
    color: var(--burgundy);
}

.ul-gap {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.arrow {
    transition: transform 0.3s ease;
}

.arrow.open {
    transform: rotate(180deg);
}
</style>