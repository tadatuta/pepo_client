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
                id: 'description',
                placeholder: 'Расскажите о себе'
            }
        ];
    })
);
