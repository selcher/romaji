import React, { Component } from 'react'
import logo from './assets/icon.png'
import './App.css'

import translate from './modules/translate'
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

    handleENChange(event) {
        event.preventDefault()

        const srcLang = 'en'
        const en = event.target.value
        const hiragana = translate(en, srcLang, 'hiragana')
        const katakana = translate(en, srcLang, 'katakana')

        this.setState({
            en,
            hiragana,
            katakana
        })
    }

    handleHiraganaChange(event) {
        event.preventDefault()

        const srcLang = 'hiragana'
        const hiragana = event.target.value
        const en = translate(hiragana, srcLang, 'en')
        const katakana = translate(hiragana, srcLang, 'katakana')

        this.setState({
            en,
            hiragana,
            katakana
        })
    }

    handleKatakanaChange(event) {
        event.preventDefault()

        const srcLang = 'katakana'
        const katakana = event.target.value
        const en = translate(katakana, srcLang, 'en')
        const hiragana = translate(katakana, srcLang, 'hiragana')

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
    )
  }
}

export default App
