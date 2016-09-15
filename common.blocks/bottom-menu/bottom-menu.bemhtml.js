block('bottom-menu')(
    js()(true),
    content()({
        block: 'control-group',
        content: ['Написать', 'Лента', 'Поиск', 'Профиль'].map(function (v, i) {
            var mods = ['tweet', 'home', 'search', 'account'],
                rtn_btns = {
                    block: 'button',
                    mods: { theme: 'islands', size: 'm' },
                    mix: { block: 'bottom-menu', elem: 'button' },
                    text: v,
                    icon: {
                        block: 'icon',
                        mods: { }
                    }
                };

            rtn_btns.icon.mods[mods[i]] = true;

            return rtn_btns;
        })
    })
);
