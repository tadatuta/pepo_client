block('hidden-menu')(
    js()(true),
    content()(
        function () {
            var menu_items = this.ctx.content,
                url = this.ctx.url;

            return [
                {
                    block: 'checkbox',
                    mods: { theme: 'simple', size: 'm', type: 'button' },
                    text: '',
                    icon: {
                        block: 'icon',
                        mods: { edit: true }
                    }
                },
                {
                    block: 'menu',
                    mods: { theme: 'islands', size: 'm' },
                    content: menu_items.map(function (v, i) {
                        menu_items = {
                            block: 'menu-item',
                            val: i,
                            mods: { },
                            content: {
                                block: 'link',
                                mods: { theme: 'islands' },
                                url: '',
                                content: v
                            }
                        };

                        if (i == 0) {
                            menu_items.mods = { disabled: true };
                        } else {
                            menu_items.content.url = url;
                        }

                        return menu_items;
                    })
                }
            ];
        }
    )
);
