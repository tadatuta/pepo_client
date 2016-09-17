modules.define('profile', ['i-bem__dom', 'BEMHTML', 'jquery', 'tweets'], function (provide, BEMDOM, BEMHTML, $, Tweets) {

    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: function () {
                    var radio = this.findBlockInside('radio-group'),
                        optional = this.elem('optional');

                    radio.bindTo('click', function () {
                        var buttons = ['last', 'pics', 'likes'],
                            val = buttons[radio.getVal()];

                        Tweets.getTweets(optional, val);
                    });
                }
            }
        },
        {}));
});
