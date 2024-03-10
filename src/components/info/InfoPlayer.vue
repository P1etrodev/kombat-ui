<script setup lang="ts">
import * as art from '@/getArt'
import InfoChampionInfo from './InfoChampionInfo.vue'
import { Player } from '@/types/ddata'
import { ModelRef } from 'vue'
import { getRemainingItems } from '@/tools'
import InfoChampionData from './InfoChampionData.vue'
const player: ModelRef<Player | undefined> = defineModel()
const defaultChampionName = "Teemo"
</script>
<template>
    <div class="flex flex-col w-full p-4 mb-4 rounded-md bg-semi">
        <div class="grid grid-cols-5 gap-4">
            <div class="flex flex-col w-full col-span-2 gap-6">
                <div class="flex flex-row gap-2 flex-nowrap">
                    <div class="relative h-20 border-2 aspect-square avatar border-primary">
                        <div>
                            <div v-show="player?.isDead"
                                class="absolute inset-0 z-20 flex items-center justify-center aspect-square h-full text-[#ff0000]">
                                <h1 class="text-3xl font-bold">{{ Math.ceil(player?.respawnTimer || 0) }}</h1>
                            </div>
                            <img class="avatar" :class="{
                                'grayscale brightness-50': player?.isDead
                            }" :src="art.getChampIcon(player?.rawChampionName)">
                            <div
                                class="absolute bottom-0 w-7 left-[50%] z-10 translate-x-[-50%] translate-y-[50%] bg-semi border-2 border-primary rounded-full aspect-square flex justify-center items-center">
                                <h1 class="text-sm font-medium text-center text-white">{{ player?.level || 0 }}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <h1 class="text-xl font-semibold text-primary">{{ player?.summonerName || 'Jugador' }}</h1>
                        <h1 class="text-white">{{ player?.championName || defaultChampionName }} </h1>
                        <h1 v-if="player?.skinName">{{ player?.skinName }} </h1>
                    </div>
                </div>
                <InfoChampionInfo v-if="player" v-model="player"></InfoChampionInfo>
                <InfoChampionInfo v-else></InfoChampionInfo>
            </div>
            <div class="flex flex-col w-full max-h-full col-span-3 overflow-y-auto">
                <div class="flex flex-row gap-2 2xl:flex-col flex-nowrap">
                    <div
                        class="grid flex-row grid-cols-3 gap-1 p-1 rounded-md 2xl:flex me-auto flex-nowrap w-fit h-fit bg-dark">
                        <div class="avatar" v-for="item in player?.items">
                            <div class="h-16 rounded-md aspect-square">
                                <img :src="art.getItemIcon(item.itemID)">
                            </div>
                        </div>
                        <div class="avatar" v-for="_ in getRemainingItems(player?.items) ">
                            <div class="h-16 rounded-md bg-semi aspect-square">
                            </div>
                        </div>
                    </div>
                </div>
                <InfoChampionData v-if="player" v-model="player">
                </InfoChampionData>
                <InfoChampionData v-else></InfoChampionData>
            </div>
        </div>
    </div>
</template>