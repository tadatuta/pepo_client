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

describe('Блок compose', function () {
    it('должен быть на странице compose', function () {
        return this.browser
            .url(config.servers.frontend_server + '/compose')
            .waitForExist('.page_view_compose')
            .waitForVisible('.compose');
    });
});

describe('У блока compose должны быть: ', function () {
    it('поле ввода текста', function () {
        return this.browser
            .waitForVisible('.compose__textarea');
    });

    it('кнопка для добавления картинки', function () {
        return this.browser
            .waitForVisible('.compose__add-image');
    });

    it('кнопка "Отправить"', function () {
        return this.browser
            .waitForVisible('.compose__save');
    });

    it('кнопка "Назад"', function () {
        return this.browser
            .waitForVisible('.button_back');
    });
});

describe('Отобразить поле добавления изображения', function () {
    it('', function () {
        return this.browser
            .click('.compose__add-image')
            .waitForVisible('.dropzone');
    });
});

describe('Действия над кнопкой "Отправить"', function () {
    it('найти неактивную кнопку отправки', function () {
        return this.browser
            .waitForVisible('.compose__save.button_disabled');
    });

    it('активировать кнопку отправки', function () {
        return this.browser
            .setValue('[name=\'content\'', 'somecontent https://vk.com')
            .waitForVisible('.compose__save.button');
    });

    it('отправить твит', function () {
        return this.browser
            .setValue('[name=\'content\'', 'somecontent https://vk.com')
            .click('.compose__save')
            .waitForExist('.page_view_feed')
            .waitForVisible('.tweet-list');
    });
});

describe('Нажать на кнопку "Назад"', function () {
    it('вернуть на feed, без отправки твита', function () {
        return this.browser
            .url(config.servers.frontend_server + '/compose')
            .click('.button_back')
            .waitForExist('.page_view_feed');
    });
});
