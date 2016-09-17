block('compose').elem('footer')(
    content()(function () {
        return [
            {
                block: 'modal',
                mods: { theme: 'islands', autoclosable: true },
                content: 'Содержимое модального окна'
            },
            {
                block: 'button',
                mods: { theme: 'islands', size: 'l', type: 'link' },
                mix: { block: 'compose', elem: 'save' },
                text: 'Отправить'
            }
        ];
    })
);
