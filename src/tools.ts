import { Champion, ChampionResponse, Item } from "./types/ddata"

import axios from "axios"

export const getCleanRawChampName = (rawChampName: string | undefined): string | undefined => {
    const trash = "game_character_displayname_"
    rawChampName = rawChampName?.replace(trash, '')
    return rawChampName || "Teemo"
}

export const getRemainingItems = (itemList: Item[] | undefined) => {
    const len = itemList?.length || 0
    if (len === 0) {
        return 6
    }
    return 6 - len
}

export const formatSeconds = (s: number) => {
    s = Math.floor(s)
    let minutos: number | string = Math.floor(s / 60)
    let segundos: number | string = s % 60

    minutos = minutos <= 9 ? `0${minutos}` : minutos
    segundos = segundos <= 9 ? `0${segundos}` : segundos

    return [minutos, segundos]
}

export const getChampData = async (rawChampName: string | undefined): Promise<Champion | undefined> => {
    rawChampName = getCleanRawChampName(rawChampName)
    const resData: ChampionResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.5.1/data/es_AR/champion/${rawChampName}.json`)
        .then((res) => res.data)
    if (rawChampName) {
        return resData.data[rawChampName]
    }
}

export const isEven = (n: number): boolean => n % 2 === 0

export const joinOrFirst = (range: number[]): string | number => {
    const first = range[0]
    if (range.every((r: number) => r === first)) {
        return first
    }
    return range.join('/')
}