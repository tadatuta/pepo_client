block('profile').elem('body')(
    content()(
        function () {
            return {
                block: 'radio-group',
                mods: { theme: 'islands', size: 'm', type: 'button' },
                mix: { block: 'profile', elem: 'radio' },
                val: 0,
                options: ['Твиты', 'Картинки', 'Лайки'].map(function (v, i) {
                    var radios = {
                        val: i,
                        text: v
                    };

                    return radios;
                })
            };
        }
    )
);
