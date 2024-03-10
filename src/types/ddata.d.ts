export interface FullData {
    activePlayer: ActivePlayer
    allPlayers: Player[]
    events: Events
    gameData: GameData
}

interface ActivePlayer {
    abilities: Skills
    championStats: ChampionStats
    currentGold: number
    fullRunes: Runes
    level: number
    summonerName: string
    teamRelativeColors: boolean
}

interface Skills {
    E: Ability
    Passive: Ability
    Q: Ability
    R: Ability
    W: Ability
}

interface Ability {
    abilityLevel?: number
    displayName: string
    id?: string
    rawDescription: string
    rawDisplayName: string
}

interface ChampionStats {
    abilityHaste: number
    abilityPower: number
    armor: number
    armorPenetrationFlat: number
    armorPenetrationPercent: number
    attackDamage: number
    attackRange: number
    attackSpeed: number
    bonusArmorPenetrationPercent: number
    bonusMagicPenetrationPercent: number
    critChance: number
    critDamage: number
    currentHealth: number
    healShieldPower: number
    healthRegenRate: number
    lifeSteal: number
    magicLethality: number
    magicPenetrationFlat: number
    magicPenetrationPercent: number
    magicResist: number
    maxHealth: number
    moveSpeed: number
    omnivamp: number
    physicalLethality: number
    physicalVamp: number
    resourceMax: number
    resourceRegenRate: number
    resourceType: string
    resourceValue: number
    spellVamp: number
    tenacity: number
}

interface Runes {
    generalRunes: Keystone[]
    keystone: Keystone
    primaryRuneTree: Keystone
    secondaryRuneTree: Keystone
    statRunes: StatRune[]
}

interface Keystone {
    displayName: string
    id: number
    rawDescription: string
    rawDisplayName: string
}

interface StatRune {
    id: number
    rawDescription: string
}

export interface Player {
    championName?: string
    isBot?: boolean
    isDead?: boolean
    items?: Item[]
    level?: number
    position?: string
    rawChampionName?: string
    rawSkinName?: string
    respawnTimer?: number
    runes?: Runes
    scores?: Scores
    skinID?: number
    skinName?: string
    summonerName?: string
    summonerSpells?: SummonerSpells
    team?: string
}

interface Item {
    canUse: boolean
    consumable: boolean
    count: number
    displayName: string
    itemID: number
    price: number
    rawDescription: string
    rawDisplayName: string
    slot: number
}

interface Runes {
    keystone: Keystone
    primaryRuneTree: Keystone
    secondaryRuneTree: Keystone
}

interface Scores {
    assists: number
    creepScore: number
    deaths: number
    kills: number
    wardScore: number
}

interface SummonerSpells {
    summonerSpellOne: Ability
    summonerSpellTwo: Ability
}

interface Events {
    Events: Event[]
}

export interface Event {
    Assisters?: any[]
    EventID: number
    EventName: string
    EventTime: number
    KillerName?: string
    VictimName?: string
}

export interface GameData {
    gameMode?: string
    gameTime?: number
    mapName?: string
    mapNumber?: number
    mapTerrain?: string
}

export interface ChampionResponse {
    data: any
    format: string
    type: string
    version: string
}

export interface Champion {
    allytips: string[]
    blurb: string
    enemytips: string[]
    id: string
    image: Image
    info: Info
    key: string
    lore: string
    name: string
    partype: string
    passive: Passive
    recommended: any[]
    skins: Skin[]
    spells: Spell[]
    stats: { [key: string]: number }
    tags: string[]
    title: string
}

export interface Image {
    full: string
    group: string
    h: number
    sprite: string
    w: number
    x: number
    y: number
}

export interface Info {
    attack: number
    defense: number
    difficulty: number
    magic: number
}

export interface Passive {
    description: string
    image: Image
    name: string
}

export interface Skin {
    chromas: boolean
    id: string
    name: string
    num: number
}

export interface Spell {
    cooldown: number[]
    cooldownBurn: string
    cost: number[]
    costBurn: string
    costType: string
    datavalues: Datavalues
    description: string
    effect: Array<number[] | null>
    effectBurn: Array<null | string>
    id: string
    image: Image
    leveltip: Leveltip
    maxammo: string
    maxrank: number
    name: string
    range: number[]
    rangeBurn: string
    resource: string
    tooltip: string
    vars: any[]
}

export interface Datavalues {
}

export interface Leveltip {
    effect: string[]
    label: string[]
}
