block('profile').elem('body')(
    content()(
        function () {
            return {
                block: 'radio-group',
                mods: { theme: 'islands', size: 'm', type: 'button' },
                mix: { block: 'profile', elem: 'radio' },
                val: 0,
                options: ['pep', 'picture', 'like'].map(function (v, i) {
                    var radios = {
                        val: i,
                        icon: {
                            block: 'icon',
                            mods: {}
                        }
                    };

                    radios.icon.mods[v] = true;

                    return radios;
                })
            };
        }
    )
);
