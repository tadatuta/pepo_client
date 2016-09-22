var config = require('../../server/config.js');

describe('Логин', function () {
    it('кнопки авторизации должны быть на странице', function () {
        return this.browser
            .url(config.servers.frontend_server)
            .waitForVisible('.social-buttons__fb')
            .waitForVisible('.social-buttons__vk');
    });

    it('перейти на форму авторизации', function () {
        return this.browser
            .click('.social-buttons__vk')
            .waitForVisible('[name=\'email\']')
            .waitForVisible('[name=\'pass\']')
            .waitForVisible('.popup_login_btn');
    });

    it('заполнить поля для входа', function () {
        return this.browser
            .setValue('[name=\'email\']', '+79788401345')
            .setValue('[name=\'pass\']', 'Countersteam1')
            .click('.popup_login_btn');
    });
});

describe('Блок tweet-list', function () {
    it('найти внутри блок твита', function () {
        return this.browser
            .waitForVisible('.tweet-list .tweet');
    });

    it('найти внутри ссылку с сообщением', function () {
        return this.browser
            .scroll('.page', 0, 1000)
            .waitForVisible('.tweet-list .link_nothing')
            .getText('.tweet-list .link_nothing');
    });
});