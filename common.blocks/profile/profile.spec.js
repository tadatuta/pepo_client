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
            .click('.popup_login_btn')
            .url(config.servers.frontend_server + '/profile');
    });
});

describe('Блок profile', function () {
    it('найти блок на странице', function () {
        return this.browser
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
            .getText('.profile .text_id');
    });
});

describe('Элемент profile__body', function () {
    it('должен существовать', function () {
        return this.browser
            .waitForVisible('.profile__body');
    });

    it('содержать в себе кнопки переключения', function () {
        return this.browser
            .waitForVisible('.profile__body')
            .waitForVisible('.profile__radio');
    });
});

describe('Элемент profile__optional(для вывода твитов)', function () {
    it('должен существовать', function () {
        return this.browser
            .waitForVisible('.profile__optional');
    });

    it('найти обертку для твитов', function () {
        return this.browser
            .waitForExist('.tweet-list');
    });

    it('найти вкладку с твитами, содержащими картинки', function () {
        return this.browser
            .click('.radio_pics')
            .waitForVisible('.profile_pics')
            .waitForVisible('.tweet .tweet__content .tweet__image');
    });

    it('найти вкладку с лайками пользователя', function () {
        return this.browser
            .click('.radio_likes')
            .waitForVisible('.profile_likes')
            .waitForVisible('.tweet__controls .button_type_good .icon_like');
    });

    it('найти вкладку с последними твитами', function () {
        return this.browser
            .click('.radio_last')
            .waitForVisible('.profile_last')
            .waitForVisible('.tweet .tweet__content');
    });
});

describe('Переход на страницу редактирования', function () {
    it('найти кнопку перехода к редактированию профиля', function () {
        return this.browser
            .waitForVisible('.profile__to-edit');
    });

    it('найти кнопку перехода к редактированию профиля', function () {
        return this.browser
            .waitForVisible('.profile__to-edit')
            .click('.profile__to-edit')
            .waitForExist('.page_view_profile-edit');
    });
});

describe('Переход на страницу feed:', function () {
    it('вернуться на страницу профиля', function () {
        return this.browser
            .url(config.servers.frontend_server + '/profile');
    });

    it('найти кнопку перехода на ленту', function () {
        return this.browser
            .waitForVisible('.profile__to-feed');
    });

    it('нажать на кнопку и перейти на ленту', function () {
        return this.browser
            .waitForVisible('.profile__to-feed')
            .click('.profile__to-feed')
            .waitForExist('.page_view_feed');
    });
});
