<script setup lang="ts">
import * as art from '@/getArt'
import { getRemainingItems } from '@/tools'
import { Item, Player } from '@/ddata'
import PlayerRunes from './PlayerRunes.vue'

defineProps<{
    player: Player | undefined, mirrored?: boolean
}>()
</script>
<template>
    <PlayerRunes :runes="player?.runes" :mirrored="mirrored"></PlayerRunes>
    <div class="flex items-center justify-center gap-2 h-28 flex-nowrap" :class="{
        'flex-row-reverse': mirrored
    }">
        <div class="border-2 aspect-square avatar border-primary h-full relative">
            <div>
                <div v-if="player?.isDead"
                    class="absolute inset-0 z-20 flex items-center justify-center aspect-square h-full text-[#ff0000]">
                    <h1 class="text-3xl font-bold">{{ Math.ceil(player.respawnTimer || 0) }}</h1>
                </div>
                <img v-if="player?.championName" class="avatar" :class="{
        'grayscale brightness-50': player?.isDead
    }" :src="art.getChampIcon(player?.championName)">
                <img v-else src="/BigFist.png" class="grayscale">
                <div
                    class="absolute bottom-0 w-7 left-[50%] z-10 translate-x-[-50%] translate-y-[50%] bg-semi border-2 border-primary rounded-full aspect-square flex justify-center items-center">
                    <h1 class="text-sm font-medium text-center text-white">{{ player?.level || 0 }}</h1>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 p-1 bg-dark rounded-sm" :class="{
        'ml-1': !mirrored,
        'mr-1': mirrored
    }">
            <div class="w-12 overflow-hidden rounded-sm avatar aspect-square">
                <img v-if="player" :src="art.getSummIcon(player?.summonerSpells?.summonerSpellOne)" class="avatar">
                <h1 v-else class="avatar bg-dark w-full h-full flex justify-center items-center font-bold text-white">
                    S1 </h1>
            </div>
            <div class="w-12 overflow-hidden rounded-sm avatar aspect-square">
                <img v-if="player" :src="art.getSummIcon(player?.summonerSpells?.summonerSpellTwo)" class="avatar">
                <h1 v-else class="avatar bg-dark w-full h-full flex justify-center items-center font-bold text-white">
                    S2 </h1>
            </div>
        </div>
        <div class="flex flex-col" :class="{ 'items-end': mirrored }">
            <div class="grid grid-cols-3 w-full gap-1 p-1 rounded-md bg-dark flex-nowrap">
                <div class="avatar" v-for="item in player?.items?.filter((e: Item) => e.slot !== 6)">
                    <div class="h-12 rounded-md aspect-square">
                        <img :src="art.getItemIcon(item.itemID)">
                    </div>
                </div>
                <div class="avatar" v-for="_ in getRemainingItems(player?.items?.filter((e: Item) => e.slot !== 6))">
                    <div class="h-12 bg-semi rounded-md aspect-square">
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-1 flex-nowrap" :class="{
        'flex-row-reverse': mirrored
    }">
                <img class="w-8 aspect-square" src="/minion.png">
                <h1 class="my-auto text-xl font-normal text-yellow-200 h-fit w-fit">{{ player?.scores?.creepScore || 0
                    }} </h1>
            </div>
        </div>
    </div>
</template>