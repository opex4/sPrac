<script setup lang="ts">

import H2kc from "~/components/UI/h2kc.vue";
import Card from "~/components/card.vue";
import type {IIncompleteCard} from "~/types/IIncompleteCard";

defineProps<{
    category?: string;
    cards?: IIncompleteCard[];
}>()
</script>

<template>
    <h2kc>{{ category }}</h2kc>
    <div>
        <card
            v-for="(card) in cards"
            :card="card"
        ></card>
    </div>
</template>

<style scoped>

</style>