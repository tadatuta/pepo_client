block('compose').elem('controls')(
    content()(function () {
        return {
            block: 'control-group',
            content: ['Ссылка', 'Изображение', 'Карта'].map(function (v, i) {
                return {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm' },
                    text: v,
                    val: i
                };
            })
        };
    })
);
