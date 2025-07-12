<script setup lang="ts">

import Border from "~/components/UI/border.vue";
import H2kc from "~/components/UI/h2kc.vue";
</script>

<template>
    <h2kc>Фильтры</h2kc>
    <border>
        <form class="f-cont">
            <h3 class="h3">Возраст</h3>
            <select name="dropdown"  class="combobox-age">
                <option value="option1">Вариант 1</option>
                <option value="option2">Вариант 2</option>
                <option value="option3">Вариант 3</option>
            </select>
            <h3 class="h3 h3-mb-5px">Пол</h3>
            <div class="checkboxes">
                <input type="checkbox" name="checkbox1" value="value1"> Вариант 1<br>
                <input type="checkbox" name="checkbox2" value="value2"> Вариант 2<br>
            </div>
            <h3 class="h3">Каталог</h3>
            <div class="accordion">
<!--                <div class="combobox-catalog"></div>-->

            </div>
        </form>
    </border>
</template>

<style scoped>
    .f-cont{
        margin: 0 10px 10px 10px;
        font-weight: 400;
        font-size: 14px;
    }
    .h3{
        font-weight: 600;
        font-size: 14px;
        color: var(--black);
        margin-bottom: 15px;
    }
    .h3-mb-5px{
        margin-bottom: 5px;
    }
    .accordion{

    }

</style>