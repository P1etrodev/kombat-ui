<template>
    <div class="flex flex-col gap-4 rounded-md flex-nowrap">
        <div class="flex flex-col gap-2 px-4 py-2 rounded-md bg-dark">
            <h1 class="italic font-semibold text-amber-400">{{ champData?.title }}</h1>
            <h1 class="text-primary">Ataque</h1>
            <div class="rating rating-md rating-half">
                <input type="radio" class="w-4 bg-green-500 pointer-events-none mask mask-star-2" v-for="n in 10"
                    :checked="n == champData?.info.attack"
                    :class="{ 'mask-half-1': !isEven(n), 'mask-half-2': isEven(n) }" />
            </div>
            <h1 class="text-primary">Defensa</h1>
            <div class="rating rating-md rating-half">
                <input type="radio" class="w-4 bg-blue-500 pointer-events-none mask mask-star-2" v-for="n in 10"
                    :checked="n == champData?.info.defense"
                    :class="{ 'mask-half-1': !isEven(n), 'mask-half-2': isEven(n) }" />
            </div>
            <h1 class="text-primary">Dificultad</h1>
            <div class="rating rating-md rating-half">
                <input type="radio" class="w-4 bg-yellow-500 pointer-events-none mask mask-star-2" v-for="n in 10"
                    :checked="n == champData?.info.difficulty"
                    :class="{ 'mask-half-1': !isEven(n), 'mask-half-2': isEven(n) }" />
            </div>
            <h1 class="text-primary">Magia</h1>
            <div class="rating rating-md rating-half">
                <input type="radio" class="w-4 bg-purple-500 pointer-events-none mask mask-star-2" v-for="n in 10"
                    :checked="n == champData?.info.magic"
                    :class="{ 'mask-half-1': !isEven(n), 'mask-half-2': isEven(n) }" />
            </div>
            <div class="flex flex-col">
                <h1 class="text-primary">Recurso</h1>
                <h1 class="text-white">{{ champData?.partype || 'Ninguno' }}</h1>
            </div>
        </div>
        <table class="table px-4 py-2 rounded-md bg-dark">
            <thead>
                <th></th>
                <th>Valor</th>
                <th>Por nivel</th>
            </thead>
            <tbody>
                <tr>
                    <th class="text-green-500">HP</th>
                    <td>{{ champData?.stats.hp }}</td>
                    <td>+{{ champData?.stats.hpperlevel }}</td>
                </tr>
                <tr>
                    <th class="text-orange-500">ARM</th>
                    <td>{{ champData?.stats.armor }}</td>
                    <td>+{{ champData?.stats.armorperlevel }}</td>
                </tr>
                <tr>
                    <th class="text-blue-500">MR</th>
                    <td>{{ champData?.stats.spellblock }}</td>
                    <td>+{{ champData?.stats.spellblockperlevel }}</td>
                </tr>
                <tr>
                    <th class="text-teal-500">VEL</th>
                    <td>{{ champData?.stats.movespeed }}</td>
                    <td>+0</td>
                </tr>
                <tr>
                    <th class="text-fuchsia-500">RAN</th>
                    <td>{{ champData?.stats.attackrange }}</td>
                    <td>+0</td>
                </tr>
                <tr>
                    <th class="text-sky-500">AS</th>
                    <td>{{ champData?.stats.attackspeed }}</td>
                    <td>+{{ champData?.stats.attackspeedperlevel }}</td>
                </tr>
                <tr>
                    <th class="text-red-500">AD</th>
                    <td>{{ champData?.stats.attackdamage }}</td>
                    <td>+{{ champData?.stats.attackdamageperlevel }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { getChampData, isEven } from '@/tools'
import { Champion, Player } from '@/types/ddata'
import { ModelRef, Ref, ref } from 'vue'

const player: ModelRef<Player | undefined> = defineModel()

const champData: Ref<Champion | undefined> = ref()

getChampData(player.value?.rawChampionName).then((champ) => champData.value = champ)
</script>