let replaceLast = (word, x, y) => {
    let index = word.lastIndexOf(x)
    if(index < 0) {
        return word
    }
    return word.substr(0, index) + y + word.substr(index + 1)
}

let createInflection = (word, ending, retract, replaceLetter, replaceWith) => {
    let base
    if (retract) {
        base = word.slice(0, -retract)
    } else {
        base = word
    }
    if (replaceLetter) {
        base = replaceLast(base, replaceLetter, replaceWith)
    }
    return base + ending
}

let preteritum, perfektum, presens
export default {
    'P001nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'a', 1)
        perfektum = preteritum
        return {preteritum, perfektum}
    },
    'P003nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'a', 0)
        perfektum = preteritum
        return {preteritum, perfektum}
    },
    'P010nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 't', 0)
        perfektum = preteritum
        return {preteritum, perfektum}
    },
    'P013nb': (infinitiv) => {
        preteritum = infinitiv + 'et'
        perfektum = preteritum
        return {preteritum, perfektum}
    },
    'P020nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'te', 1)
        perfektum = createInflection(infinitiv, 't', 1)
        return {preteritum, perfektum}
    },
    'P021nb': (infinitiv) => {
        preteritum = infinitiv.slice(0, -2) + 'te'
        perfektum = infinitiv.slice(0, -2) + 't'
        return {preteritum, perfektum}
    },
    'P030nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'de', 1)
        perfektum = createInflection(infinitiv, 'd', 1)
        return {preteritum, perfektum}
    },
    'P031nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'de', 2)
        perfektum = createInflection(infinitiv, 'd', 2)
        return {preteritum, perfektum}
    },
    'P040nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'dde')
        perfektum = createInflection(infinitiv, 'dd')
        return {preteritum, perfektum}
    },
    'P042nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'dte')
        perfektum = createInflection(infinitiv, 'dt')
        return {preteritum, perfektum}
    },
    'P043nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'dde', 1)
        perfektum = createInflection(infinitiv, 'dd', 1)
        return {preteritum, perfektum}
    },
    'P045nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'de')
        perfektum = createInflection(infinitiv, 'dd')
        return {preteritum, perfektum}
    },
    'P046nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'gde', 1)
        perfektum = createInflection(infinitiv, 'gd', 1)
        return {preteritum, perfektum}
    },
    'P048nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'dde')
        perfektum = createInflection(infinitiv, 'tt')
        return {preteritum, perfektum}
    },
    'P050nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, '', 1)
        perfektum = createInflection(infinitiv, 't', 1)
        return {preteritum, perfektum}
    },
    'P051nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, '', 1)
        perfektum = createInflection(infinitiv, 'et', 1)
        return {preteritum, perfektum}
    },
    'P052nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, '', 1)
        perfektum = createInflection(infinitiv, 'd', 2)
        return {preteritum, perfektum}
    },
    'P055nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 't', 2)
        perfektum = preteritum
        return {preteritum, perfektum}
    },
    'P060nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 't', 0)
        perfektum = createInflection(infinitiv, 't', 0, 'i', 'u')
        return {preteritum, perfektum}
    },
    // 'P090nb': (infinitiv) => {
    //     presens = undefined
    //     preteritum = undefined
    //     perfektum = undefined
    //     return {preteritum, perfektum}
    // },
    'P104nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'a', 4)
        perfektum = createInflection(infinitiv, 'agt', 4)
        return {preteritum, perfektum}
    },
    'P106nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'e', 1, 'e', 'a')
        perfektum = createInflection(infinitiv, '', 1, 'e', 'a')
        return {preteritum, perfektum}
    },
    'P109nb': (infinitiv) => {
        preteritum = createInflection(infinitiv, 'te', 2, 'e', 'a')
        perfektum = createInflection(infinitiv, 't', 2, 'e', 'a')
        return {preteritum, perfektum}
    },
    'P126nb': (infinitiv) => {
        presens = createInflection(infinitiv, '', 1)
        preteritum = createInflection(infinitiv, 'de', 1, 'ø', 'o')
        perfektum = createInflection(infinitiv, 't', 1, 'ø', 'o')
        return {preteritum, perfektum}
    },
}
