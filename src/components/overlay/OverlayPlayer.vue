<script setup lang="ts">
import * as art from '@/getArt'
import { getRemainingItems } from '@/tools'
import { Player } from '@/types/ddata'
import PlayerRunes from './OverlayRunes.vue'
import { ModelRef } from 'vue'

const player: ModelRef<Player | undefined> = defineModel()

defineProps<{
    mirrored?: boolean
}>()
</script>
<template>
    <PlayerRunes :runes="player?.runes" :mirrored="mirrored"></PlayerRunes>
    <div class="flex items-center justify-center gap-2 h-28 flex-nowrap" :class="{
        'flex-row-reverse': mirrored
    }">
        <div class="relative h-full border-2 aspect-square avatar border-primary">
            <div>
                <div v-if="player?.isDead"
                    class="absolute inset-0 z-20 flex items-center justify-center aspect-square h-full text-[#ff0000]">
                    <h1 class="text-3xl font-bold">{{ Math.ceil(player.respawnTimer || 0) }}</h1>
                </div>
                <img v-if="player" class="avatar" :class="{
        'grayscale brightness-50': player?.isDead
    }" :src="art.getChampIcon(player?.championName)">
                <img class="avatar grayscale" v-else src="/BigFist.png">
                <div
                    class="absolute bottom-0 w-7 left-[50%] z-10 translate-x-[-50%] translate-y-[50%] bg-semi border-2 border-primary rounded-full aspect-square flex justify-center items-center">
                    <h1 class="text-sm font-medium text-center text-white">{{ player?.level || 0 }}</h1>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 p-1 rounded-sm bg-dark" :class="{
        'ml-1': !mirrored,
        'mr-1': mirrored
    }">
            <div class="w-12 overflow-hidden rounded-sm avatar aspect-square">
                <img v-if="player" :src="art.getSummIcon(player?.summonerSpells?.summonerSpellOne)" class="avatar">
                <h1 v-else class="flex items-center justify-center w-full h-full font-bold text-white avatar bg-dark">
                    S1 </h1>
            </div>
            <div class="w-12 overflow-hidden rounded-sm avatar aspect-square">
                <img v-if="player" :src="art.getSummIcon(player?.summonerSpells?.summonerSpellTwo)" class="avatar">
                <h1 v-else class="flex items-center justify-center w-full h-full font-bold text-white avatar bg-dark">
                    S2 </h1>
            </div>
        </div>
        <div class="flex flex-col" :class="{ 'items-end': mirrored }">
            <div class="grid w-full grid-cols-3 gap-1 p-1 rounded-md bg-dark flex-nowrap">
                <div class="avatar" v-for="item in player?.items">
                    <div class="h-12 rounded-md aspect-square">
                        <img :src="art.getItemIcon(item.itemID)">
                    </div>
                </div>
                <div class="avatar" v-for="_ in getRemainingItems(player?.items)">
                    <div class="h-12 rounded-md bg-semi aspect-square">
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center w-20 gap-1 flex-nowrap" :class="{
        'flex-row-reverse': mirrored
    }">
            <img class="w-12 aspect-square" src="/minion.png">
            <h1 class="my-auto text-2xl font-normal text-yellow-200 h-fit w-fit">{{ player?.scores?.creepScore || 0 }}
            </h1>
        </div>
    </div>
</template>