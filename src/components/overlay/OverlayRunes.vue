<script setup lang="ts">
import * as art from '@/getArt'
import { Runes } from '@/types/ddata'

defineProps<{
    runes: Runes | undefined, mirrored?: boolean
}>()
</script>
<template>
    <div class="absolute top-0 flex w-1/2 min-h-full" :class="{
        'right-0': !mirrored,
        'left-0': mirrored,
        'justify-end': !mirrored
    }">
        <div class="mt-24 bg-semi p-4 *:mx-auto h-fit flex flex-col gap-4 border-primary border-y-2" :class="{
        'rounded-r-xl border-r-2': mirrored,
        'rounded-l-xl border-l-2': !mirrored
    }">
            <img v-if="runes" class="w-16" :src="art.getKeystoneIcon(runes?.keystone, runes?.primaryRuneTree)" />
            <div class="flex items-center justify-center w-16 rounded-full bg-dark aspect-square" v-else>
                <h1>KR</h1>
            </div>
            <img v-if="runes" class="w-8" :src="art.getRuneTreeIcon(runes?.primaryRuneTree)" />
            <div class="flex items-center justify-center w-8 rounded-full bg-dark aspect-square" v-else>
                <h1>T1</h1>
            </div>
            <img v-if="runes" class="w-8" :src="art.getRuneTreeIcon(runes?.secondaryRuneTree)" />
            <div class="flex items-center justify-center w-8 rounded-full bg-dark aspect-square" v-else>
                <h1>T2</h1>
            </div>
        </div>
    </div>
</template>