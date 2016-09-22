block('login')(
    tag()('form'),
    js()(true),
    content()(function () {
        return [
            {
                block: 'input',
                mix: { block: 'login', elem: 'input' },
                mods: { theme: 'islands', size: 'l' },
                name: 'login',
                placeholder: 'Придумай логин'
            },
            {
                block: 'button',
                mix: { block: 'login', elem: 'add' },
                mods: { theme: 'islands', size: 'l', type: 'button' },
                text: 'Вход'
            },
            {
                elem: 'error'
            }
        ];
    })
);
