import {languages, translations} from './store'

const translateWord = (word, srcLangId, targetLangId) => {
    let result = []
    let wordToTranslate = word

    for (let entryId in translations) {
        let entry = translations[entryId]

        if (entry[srcLangId] === wordToTranslate) {
            result.push(entry[targetLangId])
        }
    }

    return result
}

const translate = (str, srcLang, targetLang) => {
    const srcLangId = languages[srcLang]
    const targetLangId = languages[targetLang]
    let word = str
    let result = []

    while (word.length) {
        let wordLen = Math.min(3, word.length)
        let wordToTranslate = ''
        let tempTrans = []

        while (tempTrans.length === 0 && wordLen) {
            wordToTranslate = word.slice(0, wordLen)

            if (wordToTranslate[0] === wordToTranslate[1]) {
                tempTrans = translateWord(
                    wordToTranslate[0],
                    srcLangId,
                    targetLangId
                )

                if (tempTrans.length === 0) {
                    tempTrans = [
                        translations[20][targetLangId]
                    ]
                }

                wordLen = 1
            }
            else {
                tempTrans = translateWord(
                    wordToTranslate,
                    srcLangId,
                    targetLangId
                )

                if (tempTrans.length === 0) {
                    wordLen--
                }
            }
        }

        if (tempTrans.length) {
            result.push(
                tempTrans.length > 1 ?
                '(' + tempTrans.join('|') + ')' :
                tempTrans[0]
            )
        } else {
            result.push(wordToTranslate)
        }

        word = word.slice(wordLen || 1)
    }

    return result.join('')
}

export default translate
