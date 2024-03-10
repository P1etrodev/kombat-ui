<template>
    <div class="flex flex-col w-full gap-4">
        <div class="w-full py-2 overflow-y-auto pe-2">
            <h1 v-if="fullLore">{{ champData?.lore }}</h1>
            <h1 v-else>{{ champData?.blurb }}</h1>
            <button @click="fullLore = !fullLore" class="text-primary hover:underline">Ver {{ !fullLore ? 'más' :
                'menos' }}</button>
        </div>
        <div class="flex flex-col gap-4">
            <div class="rounded-md collapse bg-dark">
                <input type="checkbox" name="my-accordion-3" />
                <div
                    class="flex flex-row items-center gap-4 text-lg font-medium text-white bg-dark collapse-title flex-nowrap">
                    <img class="h-12 border-2 border-primary" :src="getPassiveIcon(champData?.passive?.image.full)">
                    <h1> {{ champData?.passive?.name }}</h1>
                </div>
                <div class="flex flex-row gap-2 collapse-content flex-nowrap">
                    <div class="w-fit *:text-right">
                        <h1 class="text-primary">Descripción:</h1>
                    </div>
                    <div class="w-full">
                        <p>{{ champData?.passive?.description }}</p>
                    </div>
                </div>
            </div>
            <div class="rounded-md collapse bg-dark" v-for="spell in champData?.spells">
                <input type="checkbox" name="my-accordion-3" />
                <div
                    class="flex flex-row items-center gap-4 text-lg font-medium text-white bg-dark collapse-title flex-nowrap">
                    <img class="h-12 border-2 border-primary" :src="getSpellIcon(spell.image.full)">
                    <h1> {{ spell.name }}</h1>
                </div>
                <div class="flex flex-row gap-2 collapse-content flex-nowrap">
                    <div class="w-fit *:text-right">
                        <h1 v-show="joinOrFirst(spell.range)" class="text-primary">Rango:</h1>
                        <h1 v-show="joinOrFirst(spell.cooldown)" class="text-primary">Cooldown:</h1>
                        <h1 v-show="joinOrFirst(spell.cost)" class="text-primary">Costo:</h1>
                        <h1 class="text-primary">Descripción:</h1>
                    </div>
                    <div class="w-full">
                        <p v-show="joinOrFirst(spell.range)"> {{ joinOrFirst(spell.range) }}</p>
                        <p v-show="joinOrFirst(spell.cooldown)">{{ joinOrFirst(spell.cooldown) }}</p>
                        <p v-show="joinOrFirst(spell.cost)">{{ joinOrFirst(spell.cost) }}</p>
                        <p>{{ spell.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2"
            v-show="champData?.allytips.length && champData.allytips[0] !== champData.lore">
            <h1 class="text-xl text-green-500">Con él:</h1>
            <ul class="flex flex-col gap-2">
                <li class="px-4 py-2 rounded-md bg-dark" v-for="tip in champData?.allytips">{{ tip }}</li>
            </ul>
        </div>
        <div class="flex flex-col gap-2" v-show="champData?.enemytips.length">
            <h1 class="text-xl text-red-500">Contra él:</h1>
            <ul class="flex flex-col gap-2">
                <li class="px-4 py-2 rounded-md bg-dark" v-for="tip in champData?.enemytips">{{ tip }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getPassiveIcon, getSpellIcon } from '@/getArt'
import { getChampData, joinOrFirst } from '@/tools'
import { Champion } from '@/types/ddata'
import { Ref, ref } from 'vue'
import { Player } from '@/types/ddata'
import { ModelRef } from 'vue'

const player: ModelRef<Player | undefined> = defineModel()
const fullLore: Ref<boolean> = ref(false)

const champData: Ref<Champion | undefined> = ref()

getChampData(player.value?.rawChampionName).then((champ) => champData.value = champ)
</script>