<script setup lang="ts">
import * as art from '@/getArt'
import { Player } from '@/types/ddata'

defineProps<{ winner: Player | undefined, winCondition: string | undefined }>()
</script>
<template>
    <div class="absolute inset-0 z-50 flex items-center justify-center min-w-full min-h-full animate-slide backdrop-grayscale backdrop-brightness-50"
        v-if="winner">
        <div class="absolute flex flex-col w-64 gap-4 p-4 rounded-md bg-semi">
            <img class="border-2 border-primary" :src="art.getLoadingImg(winner?.rawSkinName || '')">
            <h1 class="text-3xl font-semibold text-center text-primary">{{ winner?.summonerName }}</h1>
            <h1 class="text-xl font-semibold text-center text-amber-400">{{ winCondition }}</h1>
        </div>
    </div>
</template>