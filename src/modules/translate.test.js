import translate from './translate'

it('translates romaji to hiragana', () => {
    expect(
        translate('konnichiha', 'en', 'hiragana')
    ).toEqual(
        'こんにちは'
    );
});

it('translates romaji to katakana', () => {
    expect(
        translate('konnichiha', 'en', 'katakana')
    ).toEqual(
        'コンニチハ'
    );
});
