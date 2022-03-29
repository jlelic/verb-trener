const getInvImportance = (uid) => {
    if (uid < 20) {
        return 3
    }
    if (uid < 100) {
        return 3 + uid / 100
    }
    if (uid < 1000) {
        return 4 + 2 * uid / 1000
    }
    if (uid < 3000) {
        return 10 + 8 * uid / 3000
    }
    return 20
}

export const getNextTime = (wordUid, consecutive) => {
    const timeNow = new Date() / 1000
    const invImportance = getInvImportance(wordUid)
    if (!consecutive) {
        return ~~(timeNow + 2 * 60 * invImportance)
    }
    return ~~(timeNow + 60 * 60 * Math.pow(invImportance, 1 + consecutive / 2))
}
