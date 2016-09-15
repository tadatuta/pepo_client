block('profile-edit').elem('buttons')(
    content()(function () {
        var btns = ['save', 'back'].map(function (v) {
            var text;

            (v == 'save') ? text = 'Сохранить' : text = 'Назад';

            return {
                block: 'button',
                mods: { theme: 'islands', size: 'l' },
                mix: { block: 'profile-edit', elem: v },
                text: text
            };
        });

        return btns;
    })
);
