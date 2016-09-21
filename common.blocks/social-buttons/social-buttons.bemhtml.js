block('social-buttons')(
    js()(true),
    content()(function () {
        var btns = ['vk', 'fb'].map(function (v, i) {
            var links = ['/auth/vk', '/auth/fb'];

            btns = {
                block: 'button',
                mix: { block: 'social-buttons', elem: v },
                mods: { theme: 'islands', size: 'm', type: 'link' },
                url: links[i],
                icon: {
                    block: 'icon',
                    mods: {}
                }
            };

            btns.icon.mods[v] = true;
            return btns;
        });

        return btns;
    })
);
