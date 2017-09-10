import React, { Component } from 'react'
import logo from './assets/icon.png'
import './App.css'

import {languages, translations} from './store'
import Form from './components/form'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "en": "",
            "hiragana": "",
            "katakana": ""
        }

        this.handleENChange = this.handleENChange.bind(this)
        this.handleHiraganaChange = this.handleHiraganaChange.bind(this)
        this.handleKatakanaChange = this.handleKatakanaChange.bind(this)
    }

    translateWord(word, srcLang, targetLang) {
        let result = []
        let wordToTranslate = word

        for (let entryId in translations) {
            let entry = translations[entryId]

            if (entry[srcLang] === wordToTranslate) {
                result.push(entry[targetLang])
            }
        }

        return result
    }

    translate(str, srcLangId, targetLandId) {
        let word = str
        let result = []

        while (word.length) {
            let wordLen = Math.min(3, word.length)
            let wordToTranslate = ''
            let tempTrans = []

            while (tempTrans.length === 0 && wordLen) {
                wordToTranslate = word.slice(0, wordLen)

                if (wordToTranslate[0] === wordToTranslate[1]) {
                    tempTrans = this.translateWord(
                        wordToTranslate[0],
                        srcLangId,
                        targetLandId
                    )

                    if (tempTrans.length === 0) {
                        tempTrans = [
                            translations[20][targetLandId]
                        ]
                    }

                    wordLen = 1
                }
                else {
                    tempTrans = this.translateWord(
                        wordToTranslate,
                        srcLangId,
                        targetLandId
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

    handleENChange(event) {
        event.preventDefault()

        const srcLangId = languages['en']
        const en = event.target.value
        const hiragana = this.translate(en, srcLangId, languages['hiragana'])
        const katakana = this.translate(en, srcLangId, languages['katakana'])

        console.log('EN change:', en, hiragana)
        this.setState({
            en,
            hiragana,
            katakana
        })
    }

    handleHiraganaChange(event) {
        event.preventDefault()

        const srcLangId = languages['hiragana']
        const hiragana = event.target.value
        const en = this.translate(hiragana, srcLangId, languages['en'])
        const katakana = this.translate(hiragana, srcLangId, languages['katakana'])

        console.log('Hiragana change:', hiragana, en)
        this.setState({
            en,
            hiragana,
            katakana
        })
    }

    handleKatakanaChange(event) {
        event.preventDefault()

        const srcLangId = languages['katakana']
        const katakana = event.target.value
        const en = this.translate(katakana, srcLangId, languages['en'])
        const hiragana = this.translate(katakana, srcLangId, languages['hiragana'])

        console.log('Katakana change:', katakana, en)
        this.setState({
            en,
            hiragana,
            katakana
        })
    }

    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Converter</h2>
        </div>
        <div className="App-content">
            <Form label="Romaji"
                value={this.state.en}
                handleChange={this.handleENChange} />
            <Form label="Hiragana"
                value={this.state.hiragana}
                handleChange={this.handleHiraganaChange} />
            <Form label="Katakana"
                value={this.state.katakana}
                handleChange={this.handleKatakanaChange} />
        </div>
      </div>
    );
  }
}

export default App
