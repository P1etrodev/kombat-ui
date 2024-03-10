import { Ability, Keystone } from "@/types/ddata"

import { getCleanRawChampName } from "./tools"

export const getChampIcon = (rawChampName: string | undefined) => {
    rawChampName = getCleanRawChampName(rawChampName)
    return `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${rawChampName}.png`
}

export const getLoadingImg = (rawSkinName: string) => {
    const trash = "game_character_skin_displayname_"
    rawSkinName = rawSkinName.replace(trash, '')
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${rawSkinName}.jpg`
}

export const getItemIcon = (itemId: number) => {
    return `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/${itemId}.png`
}

export const getSummIcon = (summoner: Ability | undefined) => {
    let summId = summoner?.displayName
    const filters = {
        Ghost: "Haste",
        Ignite: "Dot",
        Cleanse: "Boost",
        Clarity: "Mana",
        "To the King!": "PoroRecall",
        "Poro Toss": "PoroThrow",
        "Mark": "Snowball",
        "Placeholder": "_UltBookPlaceholder",
        "Placeholder and Attack-Smite": "_UltBookSmitePlaceholder",
        Flee: "CherryHold",
        "Unleashed Teleport": "Teleport",
        Hexflash: "Flash",
    }
    if (summId?.includes('Smite')) summId = 'Smite'
    for (const [key, value] of Object.entries(filters)) {
        summId = summId?.replace(key, value) || summId
    }
    return `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/spell/Summoner${summId}.png`
}

export const getKeystoneIcon = (keystone: Keystone | undefined, primaryRuneTree: Keystone | undefined): string => {
    let splitterDisplay = keystone?.displayName.split(' ')
    let keystoneDisplay = ''
    splitterDisplay?.map(word => {
        keystoneDisplay += word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    const primaryDisplay = primaryRuneTree?.displayName.replace(' ', '') || ''
    return `/runes/${primaryDisplay}/${keystoneDisplay}/${keystoneDisplay}.png`
}

export const getRuneTreeIcon = (runeTree: Keystone | undefined): string => {
    const primaryDisplay = runeTree?.displayName.replace(' ', '')
    return `/runes/${primaryDisplay}.png`
}

export const getSpellIcon = (spellImg: string | undefined): string => {
    return `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/spell/${spellImg}`
}

export const getPassiveIcon = (passiveImgUrl: string | undefined): string => {
    return `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/passive/${passiveImgUrl}`
}