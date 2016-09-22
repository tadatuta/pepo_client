var assert = require('chai').assert;

describe('yandex', function () {
    it('should find itself', function () {
        return this.browser
            .url('https://yandex.com')
            .setValue('.search2__input input', 'yandex')
            .click('.search2__button button')
            .getText('.z-entity-card__title')
            .then(function (title) {
                assert.equal(title, 'Yandex');
            });
    });
});
