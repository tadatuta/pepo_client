var config = require('../../server/config.js');

describe('Войти', function () {
    it('', function () {
        return this.browser
            .url(config.servers.frontend_server)
            .waitForVisible('.social-buttons__fb')
            .waitForVisible('.social-buttons__vk')
            .click('.social-buttons__vk')
            .waitForVisible('[name=\'email\']')
            .waitForVisible('[name=\'pass\']')
            .waitForVisible('.popup_login_btn')
            .setValue('[name=\'email\']', '+79788401345')
            .setValue('[name=\'pass\']', 'Counter1')
            .click('.popup_login_btn');
    });
});

describe('Блок bottom-menu', function () {
    it('должен быть на странице feed', function () {
        return this.browser
            .waitForVisible('.bottom-menu');
    });

    it('должен быть с тремя кнопками', function () {
        return this.browser
            .waitForVisible('.bottom-menu .button_tweet')
            .waitForVisible('.bottom-menu .button_home')
            .waitForVisible('.bottom-menu .button_account');
    });

    it('кнопка "Написать" должна вести на страницу написания твита', function () {
        return this.browser
            .url(config.servers.frontend_server + '/feed')
            .click('.bottom-menu .button_tweet')
            .waitForExist('.page_view_compose');
    });

    it('кнопка "Лента" должна обновить страницу feed', function () {
        return this.browser
            .url(config.servers.frontend_server + '/feed')
            .click('.bottom-menu .button_home')
            .waitForExist('.page_view_feed');
    });

    it('кнопка "Аккаунт" должна перевести пользователя на страницу profile', function () {
        return this.browser
            .url(config.servers.frontend_server + '/feed')
            .click('.bottom-menu .button_account')
            .waitForExist('.page_view_profile');
    });
});
