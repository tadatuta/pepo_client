block('profile-edit').elem('description')(
    content()(function () {
        return [
            {
                block: 'text',
                content: 'О себе'
            },
            {
                block: 'textarea',
                mods: { theme: 'islands', size: 'm', width: 'available' },
                placeholder: 'Расскажите о себе'
            },
            {
                block: 'button',
                mods: { theme: 'islands', size: 'l' },
                mix: { block: 'profile-edit', elem: 'save' },
                text: 'Сохранить'
            }
        ];
    })
);
