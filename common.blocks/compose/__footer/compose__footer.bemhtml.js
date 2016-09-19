block('compose').elem('footer')(
    content()(function () {
        return [
            {
                block: 'button',
                mods: { theme: 'islands', size: 'l', type: 'link' },
                mix: { block: 'compose', elem: 'save' },
                text: 'Отправить'
            },
            {
                block: 'button',
                mods: { theme: 'islands', size: 'l', type: 'link', back: true },
                url: '/feed',
                text: 'Назад'
            }
        ];
    })
);
