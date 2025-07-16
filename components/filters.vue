<script setup lang="ts">
import Border from "~/components/UI/border.vue";
import H2kc from "~/components/UI/h2kc.vue";
import { ref, watch } from "vue";

// Интерфейс для элементов Combobox
interface comboBoxAge {
    age: string;
    value: number;
}

// Данные для комбобокса
const comboBoxAges = ref<comboBoxAge[]>([
    { age: "Любой", value: 0 },
    { age: "1 год", value: 1 },
    { age: "2 года", value: 2 },
    { age: "3 года", value: 3 },
    { age: "4 года", value: 4 },
    { age: "5 лет", value: 5 },
    { age: "6 лет", value: 6 },
    { age: "7 лет", value: 7 },
    { age: "8 лет", value: 8 },
    { age: "9 лет", value: 9 },
    { age: "10 лет", value: 10 },
    { age: "11 лет", value: 11 },
    { age: "12 лет", value: 12 },
    { age: "13 лет", value: 13 },
    { age: "14 лет", value: 14 },
    { age: "15 лет", value: 15 },
    { age: "16 лет", value: 16 },
    { age: "17 лет", value: 17 },
    { age: "18 лет", value: 18 }
]);

// Реактивная переменная для выбранного значения
const selectedOption = ref<string>('0'); // Значение по умолчанию (value: 0)

// Эмит события для v-model в родительском компоненте
const emit = defineEmits(['update:modelValue']);

// Синхронизация с v-model
const props = defineProps<{
    modelValue?: string; // Сделали опциональным, чтобы избежать undefined
}>();

watch(() => props.modelValue, (newValue) => {
    if (newValue !== undefined) {
        selectedOption.value = newValue;
    }
});

watch(selectedOption, (newValue) => {
    emit('update:modelValue', newValue);
});

// Интерфейс для элементов аккордеона
interface AccordionItem {
    title: string;
    content: string[];
    isOpen: boolean;
}

// Данные аккордеона
const accordionItems = ref<AccordionItem[]>([
    {
        title: "Силовой спорт",
        content: ["Тяжелая атлетика", "Пауэрлифтинг"],
        isOpen: true,
    },
    {
        title: "Единоборства",
        content: ["Вольная борьба", "Дзюдо"],
        isOpen: true,
    },
    { title: "ДПИ и ремесла", content: [], isOpen: false, },
    { title: "Техническое конструирование", content: [], isOpen: false, },
    { title: "Словесность", content: [], isOpen: false, },
    { title: "Иностранные языки", content: [], isOpen: false, },
    { title: "Развитие интеллекта", content: [], isOpen: false, },
    { title: "Информационные технологии", content: [], isOpen: false, },
    { title: "История и Традиции", content: [], isOpen: false, },
    { title: "Педагогика", content: [], isOpen: false, },
    { title: "Музыка и звук", content: [], isOpen: false, },
    { title: "Пение", content: [], isOpen: false, },
    { title: "Хореография(танцы)", content: [], isOpen: false, },
    { title: "Зрелищные искусства", content: [], isOpen: false, },
    { title: "Познавательные развлечения", content: [], isOpen: false, },
    { title: "Туризм", content: [], isOpen: false, },
    { title: "Естественные науки", content: [], isOpen: false, },
    { title: "Люди и животные", content: [], isOpen: false, },
    { title: "Эстетические виды спорта", content: [], isOpen: false, },
    { title: "Технические виды спорта", content: [], isOpen: false, },
    { title: "Командно-игровой спорт", content: [], isOpen: false, },
    { title: "Индивидуально игровой спорт", content: [], isOpen: false, },
    { title: "Водные виды спорта", content: [], isOpen: false, },
    { title: "Лёгкая атлетика и гимнастика", content: [], isOpen: false, },
    { title: "Физкультура", content: [], isOpen: false, },
]);

// Метод для переключения состояния аккордеона
const toggleItem = (index: number) => {
    accordionItems.value[index].isOpen = !accordionItems.value[index].isOpen;
};
</script>

<template>
    <h2kc>Фильтры</h2kc>
    <border>
        <form class="f-cont">
            <h3 class="h3">Возраст</h3>
            <div class="border-down">
                <select v-model="selectedOption" name="dropdown" class="combobox-age">
                    <option v-for="option in comboBoxAges" :key="option.value" :value="option.value.toString()">
                        {{ option.age }}
                    </option>
                </select>
            </div>
            <h3 class="h3 h3-mb-5px">Пол</h3>
            <div class="checkboxes">
                <label><input type="checkbox" name="checkboxM" value="male"> Мужской</label>
                <label><input type="checkbox" name="checkboxF" value="female"> Женский</label>
            </div>
            <h3 class="h3 h3-mb-0">Каталог</h3>
            <div v-for="(item, index) in accordionItems" :key="index">
                <div class="accordion-header" @click="toggleItem(index)">
                    <span>{{ item.title }}</span>
                    <span class="arrow" :class="{ open: item.isOpen }">
            <div class="sizes-ico-accordion">
              <img src="../assets/icons/accordion-ico.svg" alt="">
            </div>
          </span>
                </div>
                <div class="accordion-content" :class="{ open: item.isOpen }">
                    <ul class="ul-gap">
                        <li class="li-accordion" v-for="(content, contentIndex) in item.content" :key="contentIndex">
                            <img src="../assets/icons/list-marker-ico.svg" alt="marker">
                            <span class="ml-12px">{{ content }}</span>
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
    border: none;
    outline: none;
    appearance: none;
}
.checkboxes {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    gap: 20px;
}

/* Стили для аккордеона */
.accordion-header {
    min-width: 290px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 15px;
}
.accordion-header:hover {
    background-color: #e0e0e0;
}
.sizes-ico-accordion img {
    width: 15px;
    height: 15px;
}
.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out, padding 0.3s ease-out;
}
.accordion-content.open {
    max-height: 300px; /* Увеличено для списков */
    margin-top: 15px;
}
.li-accordion {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 2px;
}
.ml-12px {
    margin-left: 12px;
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