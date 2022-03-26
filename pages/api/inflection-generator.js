const replaceLast = (word, x, y) => {
    y = y || ''
    let index = word.lastIndexOf(x)
    if (index < 0) {
        return word
    }
    return word.substr(0, index) + y + word.substr(index + 1)
}

const createInflection = (word, ending, retract, replaceLetter, replaceWith) => {
    let base
    if (retract) {
        base = word.slice(0, -retract)
    } else {
        base = word
    }
    if (replaceLetter) {
        base = replaceLast(base, replaceLetter, replaceWith)
    }
    ending = ending || ''
    return base + ending
}

const generatorIdRemap = {
    P002nb: 'P001nb',
    P012nb: 'P010nb',
    P022nb: 'P021nb',
    P033nb: 'P031nb',
    P125nb: 'P122nb',
    P207nb: 'P203nb',
    P211nb: 'P209nb',
    P212nb: 'P210nb',
    P259nb: 'P257nb',
    P240nb: 'P238nb',
    P283nb: 'P281nb',
    P365nb: 'P362nb',
    P380nb: 'P372nb',
    P385nb: 'P383nb',
    P406nb: 'P404nb',
    P407nb: 'P404nb',
    P432nb: 'P404nb',
}

const inflectionGenerators = {
    P001nb: [['a', 1]],
    P003nb: [['a']],
    P010nb: [['t']],
    P013nb: [['et']],
    P020nb: [['te', 1], ['t', 1]],
    P021nb: [['te', 2], ['t', 2]],
    P027nb: [['t', 2, 'i', 'je'], ['t', 1]],
    P030nb: [['de', 1], ['d', 1]],
    P031nb: [['de', 2], ['d', 2]],
    P040nb: [['dde'], ['dd']],
    P042nb: [['dte'], ['dt']],
    P043nb: [['dde', 1], ['dd', 1]],
    P045nb: [['de'], ['dd']],
    P046nb: [['gde', 1], ['gd', 1]],
    P048nb: [['dde'], ['tt']],
    P050nb: [[, 1], ['t', 1]],
    P051nb: [[, 1], ['et', 1]],
    P052nb: [[, 1], ['d', 2]],
    P055nb: [['t', 2]],
    P060nb: [['t', 0], ['t', 0, 'i', 'u']],
    P101nb: [['kte', 3, 'i', 'a'], ['kt', 3, 'i', 'a']],
    P103nb: [['te', 1, 'e', 'a'], ['t', 1, 'e', 'a']],
    P104nb: [['a', 4], ['agt', 4]],
    P106nb: [['e', 1, 'e', 'a'], ['', 1, 'e', 'a']],
    P109nb: [['te', 2, 'e', 'a'], ['t', 2, 'e', 'a']],
    P112nb: [['te', 1, 'e', 'a'], ['t', 1, 'e', 'a']],
    P120nb: [[, 1, 'e', 'a'], ['t', 1]],
    P121nb: [['te', 1, 'e', 'o'], ['t', 1, 'e', 'o']],
    P122nb: [['te', 1, 'ø', 'u'], ['t', 1, 'ø', 'u']],
    P123nb: [['te', 2, 'ø', 'u'], ['t', 2, 'ø', 'u']],
    P126nb: [['de', 1, 'ø', 'o'], ['t', 1, 'ø', 'o']],
    P151nb: [['sste', 2], ['sst', 2]],
    P153nb: [['tte', 2, 'e', 'å'], ['tt', 2, 'e', 'å']],
    P158nb: [['ad', 1], ['dt']],
    P159nb: [[, 1, 'e', 'a'], ['t', 1]],
    P160nb: [['a', 1], ['dt']],
    P162nb: [[, 0, 'i', 't'], ['tt', 3]],
    P166nb: [[, 1, 'i', 'e'], ['t', 1]],
    P167nb: [['i', 2, 'i', 'e'], ['t', 1]],
    P171nb: [['e', 1], ['tt']],
    P172nb: [['ei', 1], ['tt']],
    P173nb: [[, 2, 'i', 'ei'], ['dd', 2]],
    P174nb: [[, 0, 'i', 'ei'], ['dd']],
    P175nb: [['ev', 1], ['tt']],
    P176nb: [['eiv', 1], ['tt']],
    P177nb: [[, 1, 'i', 'e'], ['tt', 2]],
    P178nb: [[, 1, 'i', 'ei'], ['tt', 2]],
    P179nb: [['d', 0, 'i', 'e'], ['dd']],
    P180nb: [['i', 0, 'i', 'e'], ['dt']],
    P181nb: [[, 1, 'i', 'e'], ['d', 1]],
    P182nb: [['i', 2, 'i', 'e'], ['t', 1]],
    P186nb: [[, 1, 'i', 'e'], ['det', '2', 'i', 'e']],
    P187nb: [['i', 2, 'i', 'e'], ['det', 2, 'i', 'e']],
    P188nb: [['d', 0, 'i', 'e'], ['det', 0, 'i', 'e']],
    P189nb: [['i', 0, 'i', 'e'], ['det', 0, 'i', 'e']],
    P190nb: [['d', 0, 'i', 'e'], ['det', 0, 'i', 'e']],
    P191nb: [[, 0, 'i', 'ei'], ['det', 0, 'i', 'e']],
    P192nb: [[, 1, 'i', 'e'], ['t', 0, 'i', 'e']],
    P193nb: [['i', 2, 'i', 'e'], ['t', 0, 'i', 'e']],
    P198nb: [[, 1, 'i', 'e'], ['t', 0, 'i', 'e']],
    P199nb: [[, 1, 'i', 'ei'], ['t', 0, 'i', 'e']],
    P200nb: [[, 1, 'i', 'e'], ['t', 0, 'i', 'e']],
    P201nb: [[, 1, 'i', 'ei'], ['t', 0, 'i', 'e']],
    P202nb: [[, 1, 'i', 'e'], ['t', 1]],
    P203nb: [[, 1, 'i', 'ei'], ['t', 1]],
    P204nb: [[, 2, 'i', 'ei'], ['t', 2]],
    P205nb: [[, 1, 'i', 'ei'], ['d', 1]],
    P206nb: [[, 1, 'i', 'e'], ['d', 1]],
    P208nb: [[, 1, 'i', 'e'], ['t', 1]],
    P209nb: [[, 1, 'i', 'e'], ['t']],
    P210nb: [[, 1, 'i', 'ei'], ['t']],
    P214nb: [['ød', 1], ['', 0, 'y', 'udt']],
    P215nb: [['', 1, 'y', 'øy'], ['t', 1]],
    P216nb: [['', 1, 'y', 'øy'], ['t', 0, 'y', 'ø']],
    P21Anb: [['øy', 1], ['', 0, 'y', 'udt']],
    P21Bnb: [['øy', 1], ['dd']],
    P218nb: [['', 1, 'y', 'ø'], ['t', 0, 'y', 'ø']],
    P223nb: [['d', 2, 'y', 'ø'], ['t', 1, 'y', 'u']],
    P224nb: [['y', 2, 'y', 'ø'], ['t', 1, 'y', 'u']],
    P225nb: [['y', 2, 'y', 'ø'], ['d', 1]],
    P226nb: [['', 1, 'y', 'ø'], ['set', 1, 'y', 'o']],
    P22Anb: [['s', 2, 'y', 'øy'], ['et', 1, 'y', 'os']],
    P22Cnb: [[, 1], ['t', 1]],
    P231nb: [[, 1, 'y', 'ø'], ['t', 1]],
    P233nb: [[, 1, 'y', 'jø'], ['t', 1, 'y', 'u']],
    P23Anb: [[, 1, 'y', 'øy'], ['t', 1, 'y', 'u']],
    P23Bnb: [[, 1, 'y', 'øy'], ['d', 1]],
    P234nb: [[, 1, 'y', 'ø'], ['t', 1, 'y', 'u']],
    P235nb: [[, 1, 'u', 'au'], ['d', 1]],
    P237nb: [[, 1, 'y', 'ø'], ['t', 1]],
    P238nb: [[, 1, 'y', 'jø'], ['t', 0, 'y', 'jø']],
    P24Anb: [[, 1, 'y', 'øy'], ['et', 1, 'y', 'jø']],
    P242nb: [[, 0, 'y', 'øy'], ['et', 0, 'y', 'øy']],
    P245nb: [[, 2, 'y', 'øy'], ['et', 2, 'y', 'øy']],
    P248nb: [[, 1, 'y', 'jø'], ['t', 1]],
    P251nb: [[, 3, 'j', 'øy'], ['et', 3, 'j', 'øy']],
    P255nb: [[, 1, 'y', 'jø'], ['d', 1]],
    P255Anb: [[, 1, 'y', 'jø'], ['t', 1]],
    P257nb: [[, 1, 'i', 'a'], ['t', 0, 'i', 'u']],
    P25Anb: [['ød', 1], ['dd']],
    P261nb: [['t', 2, 'i', 'a'], ['t', 0, 'i', 'u']],
    P263nb: [['t', 2, 'e', 'a'], ['t', 2]],
    P264nb: [['t', 1, 'i', 'a'], ['t', 0, 'i', 'u']],
    P266nb: [[, 1, 'e', 'a'], ['t', 2]],
    P26Cnb: [[, 2, 'e', 'a'], ['t']],
    P267nb: [['t', 1, 'e', 'a'], ['t', 1]],
    P269nb: [['alv', 5], ['t']],
    P271nb: [[, 1, 'i', 'a'], ['t']],
    P273nb: [[, 1, 'i', 'a'], ['t', 1]],
    P274nb: [[, 1, 'i', 'a'], ['d', 2]],
    P275nb: [[, 1, 'ø', 'o'], ['t']],
    P277nb: [[, 1, 'ø', 'o'], ['t', 2]],
    P278nb: [['t', 1], ['t', 1]],
    P279nb: [['kk', 0, 'å', 'i'], ['tt']],
    P27Anb: [[, 1], ['et', 1]],
    P27Cnb: [[, 1], ['t', 2]],
    P281nb: [[, 1, 'e', 'a'], ['et', 1, 'e', 'u']],
    P285nb: [[, 1, 'y', 'a'], ['t', 0, 'y', 'u']],
    P289nb: [[, 0, 'å', 'o'], ['tt']],
    P291nb: [[, 1, 'ø', 'a'], ['t']],
    P293nb: [[, 1, 'e', 'a'], ['t']],
    P295nb: [[, 1, 'u', 'au'], ['t', 1]],
    P29Anb: [[, 1, 'æ', 'a'], ['t', 0, 'æ', 'å']],
    P301nb: [['ar', 4], ['året', 4]],
    P303nb: [['t', 0, 'a', 'o'], ['tt']],
    P304nb: [['', 1, 'a', 'o'], ['t', 1]],
    P305nb: [['', 1], ['t', 1]],
    P307nb: [['', 1, 'e', 'o'], ['d', 1]],
    P308nb: [['', 1], ['t']],
    P310nb: [['', 2], ['t']],
    P312nb: [['', 1, 'e', 'a'], ['et', 1, 'e', 'å']],
    P315nb: [['', 0, 'i', 'a'], ['gt', 0, 'i', 'a']],
    P316nb: [['', 1, 'a', 'o'], ['t', 1]],
    P324nb: [['', 1, 'i', 'a'], ['t']],
    P326nb: [['v', 0, 'i', 'a'], ['tt']],
    P328nb: [['å', 4], ['t']],
    P330nb: [['', 1, 'e', 'a'], ['t']],
    P332nb: [['å', 1], ['tt']],
    P335nb: [[, 1, 'æ', 'a'], ['t', 1]],
    P336nb: [['t', 2, 'e', 'å'], ['t', 1]],
    P337nb: [[, 1, 'e', 'a'], ['t']],
    P339nb: [[, 1, 'æ', 'a'], ['t', 1]],
    P340nb: [[, , 'i', 'a'], ['tt']],
    P346nb: [[]],
    P348nb: [['ok', 1], ['tt']],
    P352nb: [['d', , 'å', 'o'], ['tt']],
    P354nb: [['og', 1], ['dd']],
    P355nb: [['og', 1], ['tt']],
    P356nb: [['o', 1], ['dd']],
    P357nb: [['o', 1], ['tt']],
    P358nb: [[, 2, 'e', 'o'], ['et', 2, 'e', 'o']],
    P362nb: [['o', 1], ['dd']],
    P363nb: [['ådte', 1], ['ådt', 1]],
    P366nb: [[, 1, 'a', 'o'], ['d', 1]],
    P367nb: [['o', 1], ['dd']],
    P368nb: [['o', 1], ['tt']],
    P372nb: [[], ['t']],
    P376nb: [['', 1, 'y', 'au'], ['t', 1]],
    P378nb: [['te', 1, 'y', ''], ['t', 1, 'y', '']],
    P381nb: [['de', 1], ['t', 1]],
    P383nb: [[], ['t']],
    P384nb: [[], ['t']],
    P387nb: [[, , 'i', 'e'], ['tt']],
    P388nb: [[, , 'i', 'ei'], ['tt']],
    P389nb: [['dde'], ['tt']],
    P38Anb: [['de', 2, 'ø', 'o'], ['t', 2, 'ø', 'o']],
    P38Bnb: [['te', 1, 'o', 'u'], ['t', 1, 'o', 'u']],
    P38Cnb: [['te', 2, 'ø', 'u'], ['t', 2, 'ø', 'u']],
    P38Dnb: [[]],
    P391nb: [['de', 1], ['t', 1]],
    P392nb: [['te', 1], ['t', 1]],
    P404nb: [[]],
    P400nb: [[, , 'i', 'u'], []],
    P401Bnb: [[, , 'i', 'u'], []],
    P405nb: [[, , 'g', 'gt'], []],
    P409nb: [['es', 2, 'k', 't'], []],
    P415nb: [[, , 'g', 'd'], []],
    P420nb: [[, , 'e', 'de'], []],
    P428nb: [[, , 'a', 'ake'], []],
    P429nb: [[, , 'e', 'te'], []],
    P440nb: [[, , 'd', 'dd'], []],
    P090nb: [[]],
}

const supportedInflectionIds = Object.keys(inflectionGenerators)

const notVowel = '[^aeiouyåøæô]'
const impossiblePatterns = [
    new RegExp('^' + notVowel + '+$'),
    /^[^aeiouyåøæôs]{3,}e$/,
    /(.)\1\1/,
    /(.)\1(.)\2/,
    /((.)\2)\1/,
    /^.te$/,
    /^.de$/,
    /eed$/,
    /[^vjl]eet$/,
    new RegExp('bl' + notVowel),
    /.{3,}ea$/,
    /g(g|d)d/,
    /fd/,
    /kg(d|t)/,
]

export const generateInflections = (infinitiv, form) => {
    const index = form === 'preteritum' ? 0 : 1
    const inflections = new Set()
    const firstLetterRegex = new RegExp(infinitiv[0], 'g')
    supportedInflectionIds.forEach(inflId => {
        let generators = inflectionGenerators[inflId] || inflectionGenerators[generatorIdRemap[inflId]]
        if (!generators) {
            console.error(`Cannot find generator for ${form} of ${infinitiv}`)
        }

        const generator = generators[index] || generators[0]
        const [ending = '', retract = 0, toReplace = '', replaceWith = ''] = generator

        if(toReplace === infinitiv[0] && infinitiv.match(firstLetterRegex).length === 1) {
            return
        }

        if (retract >= infinitiv.length) {
            return
        }
        if (infinitiv.length - retract === 1 && ending.length === 0) {
            return
        }

        const inflection = createInflection(infinitiv, ...generator)

        for (let pattern of impossiblePatterns) {
            if (inflection.match(pattern)) {
                console.log(inflection, 'impossible for', pattern)
                return
            }
        }
        console.log(inflection)
        inflections.add(inflection)
    })
    return inflections
}


