/**
 * @module profile
 */

modules.define('profile', ['i-bem__dom', 'BEMHTML', 'jquery', 'tweet-list'], function (provide, BEMDOM, BEMHTML, $, Tweet_list) {

    /**
     * @class profile
     * @augments Tweet_list
     * @bem
     */
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: function () {
                    var radio = this.findBlockInside('radio-group'),
                        optional = this.elem('optional');

                    radio.bindTo('click', function () {
                        var buttons = ['last', 'pics', 'likes'],
                            val = buttons[radio.getVal()];

                        Tweet_list.getTweets(optional, val);
                    });
                }
            }
        },
        {}));
});
