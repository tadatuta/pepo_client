modules.define('profile', ['i-bem__dom', 'BEMHTML'], function (provide, BEMDOM, BEMHTML) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var radio = this.findBlockInside('radio-group'),
                        optional = this.elem('optional');

                    if (radio) {
                        BEMDOM.update(optional,
                            BEMHTML.apply({
                                block: 'tweets'
                            }));
                    }

                    radio.bindTo('click', function () {
                        var val = radio.getVal();

                        switch (val) {
                            case '0':
                                BEMDOM.update(optional,
                                BEMHTML.apply({
                                    block: 'tweets'
                                }));
                                break;

                            case '1' :
                                BEMDOM.update(optional,
                                BEMHTML.apply({
                                    block: 'tweets',
                                    mods: { display: 'picture' }
                                }));
                                break;

                            case '2' :
                                BEMDOM.update(optional,
                                BEMHTML.apply({
                                    block: 'tweets',
                                    mods: { display: 'like' }
                                }));
                                break;
                        }
                    });
                }
            }
        },
        {}
    ));
})
;
