var assert = require('chai').assert,
    expect = require('chai').expect;

var compose = {
    _postTweet: function () {
    },
    _changeButtonMods: function () {
    }
};

describe('написание твита', function () {
    it('блок должен быть объявлен', function () {
        assert.isDefined(compose);
    });

    it('должен быть объектом', function () {
        expect(compose).to.be.an('object');
    });

    it('postTweet должно быть функцией', function () {
        assert.isFunction(compose._postTweet);
    });

    it('_changeButtonMods должно быть функцией', function () {
        assert.isFunction(compose._changeButtonMods);
    });
});
