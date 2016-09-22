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
                    var that = this,
                        radio = this.findBlockInside('radio-group'),
                        optional = this.elem('optional'),
                        radios = this.findBlocksInside('radio'),
                        add_mods = ['last', 'pics', 'likes'];

                    //навешиваем моды на кнопки для тестов
                    add_mods.forEach(function (v, i) {
                        radios[i].setMod(add_mods[i]);
                    });

                    radio.bindTo('click', function () {
                        var val = add_mods[radio.getVal()];

                        that.setMod(val);
                        Tweet_list.getTweets(optional, val);
                    });
                }
            }
        },
        {}));
});
