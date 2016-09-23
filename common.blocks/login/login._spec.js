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

describe('Блок login', function () {
    it('должен отобразиться', function () {
        return this.browser
            .waitForExist('.page_view_signup')
            .waitForVisible('.login');
    });
});

describe('В блоке должны быть', function () {
    it('поле ввода', function () {
        return this.browser
            .waitForVisible('.login__input');
    });

    it('кнопка', function () {
        return this.browser
            .waitForVisible('.login__add');
    });
});

describe('При ошибке', function () {
    it('сменить цвет рамки input при входе без введенного текста', function () {
        return this.browser
            .click('.login__add')
            .waitForVisible('.input_has-error');
    });
});

describe('Если введен логин', function () {
    it('должен переадресовать на profile-edit', function () {
        return this.browser
            .setValue('[name=\'login\']', 'johndoe')
            .click('.login__add')
            .waitForExist('.page_view_profile-edit')
            .waitForVisible('.profile-edit');
    });
});
