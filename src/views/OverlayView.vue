<script async setup lang="ts">
import { Ref, reactive, ref } from 'vue'
import type { Event, GameData, Player } from '@/ddata'
import { formatSeconds } from '@/tools';
import PlayerViz from '#/overlay/PlayerViz.vue';
import Winner from '#/overlay/Winner.vue';
import axios from "axios"
import { Timer } from '@/custom'

const indexes = {
    blueIndex: 0,
    redIndex: 1,
    blueTeamIndex: 0,
    redTeamIndex: 5
}

const gamePlayersCount: Ref<number> = ref(0)

let bluePlayer: Player | undefined
let redPlayer: Player | undefined
const winner: Ref<Player | undefined> = ref()
const winCondition: Ref<string | undefined> = ref('100 minions')
const timer: Timer = reactive({
    minutes: '00',
    seconds: '00'
})

axios.get('/api/playerlist')
    .then(res => {
        const playerList: Player[] = res.data
        const blueIndex = playerList.length <= 2 ? indexes.blueIndex : indexes.blueTeamIndex
        const redIndex = playerList.length <= 2 ? indexes.redIndex : indexes.redTeamIndex
        bluePlayer = reactive(playerList[blueIndex])
        redPlayer = reactive(playerList[redIndex])
    })
    .catch(err => {
        console.info(err)
    })

setInterval(() => {
    axios.get('/api/gamestats')
        .then(res => {
            const data: GameData = res.data
            const splittedTime = formatSeconds(data.gameTime || 0)
            timer.minutes = splittedTime[0]
            timer.seconds = splittedTime[1]
        })
        .catch(err => {
            console.info(err)
        })
    axios.get('/api/eventdata')
        .then(res => {
            let data: Event[] = res.data.Events
            data = data.sort((a: Event, b: Event) => a.EventID < b.EventID ? -1 : 1)
            if (!winner.value && gamePlayersCount.value === 2) {
                const firstKill = data.find((e: Event) => {
                    return (
                        e.KillerName == bluePlayer?.summonerName || e.KillerName == redPlayer?.summonerName
                    ) && (
                            e.EventName === 'ChampionKill' && (
                                [bluePlayer?.summonerName, redPlayer?.summonerName].includes(e.KillerName)
                            )
                        )
                })
                const firstTower = data.find((e: Event) => {
                    return (
                        e.KillerName == bluePlayer?.summonerName || e.KillerName == redPlayer?.summonerName
                    ) && (
                            e.EventName === 'TurretKilled' && (
                                [bluePlayer?.summonerName, redPlayer?.summonerName].includes(e.KillerName)
                            )
                        )
                })
                if (firstKill) {
                    winCondition.value = 'Primera sangre'
                    winner.value = firstKill?.KillerName === bluePlayer?.summonerName ? bluePlayer : redPlayer
                } else if (firstTower) {
                    winCondition.value = 'Primera torre'
                    winner.value = firstTower?.KillerName === bluePlayer?.summonerName ? bluePlayer : redPlayer
                } else {
                    if ((bluePlayer?.scores?.creepScore || 0) >= 100) {
                        winCondition.value = '100 minions'
                        winner.value = bluePlayer
                    } else if ((redPlayer?.scores?.creepScore || 0) >= 100) {
                        winCondition.value = '100 minions'
                        winner.value = redPlayer
                    }
                }
            }
        })
        .catch(err => {
            console.info(err)
        })
}, 100)

setInterval(() => {
    axios.get('/api/playerlist')
        .then(res => {
            const playerList: Player[] = res.data
            gamePlayersCount.value = playerList.length
            const blueIndex = playerList.length <= 2 ? indexes.blueIndex : indexes.blueTeamIndex
            const bluePlayerTemporal = playerList[blueIndex]
            if (bluePlayer) {
                if (bluePlayerTemporal.championName !== bluePlayer.championName) {
                    bluePlayer.championName = bluePlayerTemporal.championName
                }
                bluePlayer.isDead = bluePlayerTemporal.isDead
                bluePlayer.level = bluePlayerTemporal.level
                bluePlayer.items = bluePlayerTemporal.items
                bluePlayer.respawnTimer = bluePlayerTemporal.respawnTimer
                bluePlayer.scores = bluePlayerTemporal.scores
            } else {
                bluePlayer = reactive(bluePlayerTemporal)
            }
            const redIndex = playerList.length <= 2 ? indexes.redIndex : indexes.redTeamIndex
            const redPlayerTemporal = playerList[redIndex]
            if (redPlayer) {
                if (redPlayerTemporal.championName !== redPlayer.championName) {
                    redPlayer.championName = redPlayerTemporal.championName
                }
                redPlayer.isDead = redPlayerTemporal.isDead
                redPlayer.level = redPlayerTemporal.level
                redPlayer.items = redPlayerTemporal.items
                redPlayer.respawnTimer = redPlayerTemporal.respawnTimer
                if (redPlayer.scores) {
                    redPlayer.scores.creepScore = redPlayerTemporal.scores?.creepScore || 0
                }
            } else {
                redPlayer = reactive(redPlayerTemporal)
            }
        })
        .catch(_ => {
            bluePlayer = undefined
            redPlayer = undefined
            timer.minutes = '00'
            timer.seconds = '00'
            if (winner.value) {
                winner.value = undefined
            }
        })
}, 1000)

</script>
<template>
    <Winner :winner="winner" :win-condition="winCondition"></Winner>
    <div class="flex justify-center">
        <div class="flex flex-row items-center gap-2 p-4 bg-semi flex-nowrap rounded-b-xl w-fit">
            <PlayerViz :player="bluePlayer" :mirrored="true"></PlayerViz>
            <h1 class="flex flex-row mx-2 text-3xl *:text-primary *:bg-dark *:p-1 *:rounded-lg gap-1">
                <h1>{{ timer.minutes }}</h1>
                <h1>{{ timer.seconds }}</h1>
            </h1>
            <PlayerViz :player="redPlayer"></PlayerViz>
        </div>
    </div>
</template>
