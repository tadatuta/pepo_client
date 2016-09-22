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

describe('Блок profile', function () {
    it('найти блок на страницу', function () {
        return this.browser
            .url(config.servers.frontend_server + '/profile')
            .waitForVisible('.profile');
    });

    it('найти аватар пользователя', function () {
        return this.browser
            .waitForVisible('.profile__avatar');
    });

    it('найти информацию о пользователе', function () {
        return this.browser
            .waitForVisible('.profile .about-user')
            .getText('.profile .text_username')
            .getText('.profile .text_id')
            .getText('.profile .text_about');
    });

    it('найти переключатель типа твита', function () {
        return this.browser
            .waitForVisible('.profile__radio');
    });

    it('найти обертку для твитов', function () {
        return this.browser
            .waitForExist('.tweet-list');
    });

    it('найти твит с картинкой', function () {
        return this.browser
            .click('.radio_pics')
            .waitForVisible('.profile_pics')
            .waitForVisible('.tweet .tweet__image');
    });

});
