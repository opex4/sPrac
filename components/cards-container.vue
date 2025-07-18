<script setup lang="ts">

import H2kc from "~/components/UI/h2kc.vue";
import Card from "~/components/card.vue";

defineProps<{
    category?: string
    cards?: [{
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
    }]
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