<script setup lang="ts">
import * as art from '@/getArt'
import { Player } from '@/ddata'

defineProps<{ winner: Player | undefined, winCondition: string | undefined }>()
</script>
<template>
    <div class="absolute inset-0 z-30 flex items-center justify-center min-w-full min-h-full animate-slide backdrop-grayscale"
        v-if="winner">
        <div class="p-4 flex gap-4 flex-col bg-primary w-64 rounded-md absolute">
            <img :src="art.getLoadingImg(winner?.rawSkinName || '')">
            <h1 class="text-3xl font-semibold text-center text-white">{{ winner?.summonerName }}</h1>
            <h1 class="text-semi text-center font-semibold text-xl">{{ winCondition }}</h1>
        </div>
    </div>
</template>