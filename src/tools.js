export const getRemainingItems = (itemList) => {
    const len = itemList?.length || 0
    if (len === 0) {
        return 6
    }
    return 6 - len
}

export const formatSeconds = (s) => {
    s = Math.floor(s) // Aseguramos que s sea un número entero
    let minutos = Math.floor(s / 60) // Calculamos los minutos
    let segundos = s % 60 // Calculamos los segundos

    minutos = minutos <= 9 ? `0${minutos}` : minutos
    segundos = segundos <= 9 ? `0${segundos}` : segundos

    return [minutos, segundos] // Devolvemos la lista [minutos, segundos]
}