block('page').mod('view', 'profile')(
    content()(function () {
        return [
            {
                block: 'header',
                content: {
                    block: 'profile'
                }
            },
            {
                block: 'body'
            },
            {
                block: 'footer',
                content: {
                    block: 'hidden-menu',
                    mods: { side: 'right' },
                    url: ['/profile-edit/'],
                    content: ['Изменить', 'Аватар', 'Имя пользователя']
                }
            }
        ];
    })
);
