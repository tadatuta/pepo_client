block('compose').elem('controls')(
    content()(function () {
        return {
            block: 'button',
            mods: { theme: 'islands', size: 'm' },
            mix: { block: 'compose', elem: 'add-image' },
            text: 'Добавить картинку'
        };
    })
);
