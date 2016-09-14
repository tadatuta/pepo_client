modules.define('profile', ['i-bem__dom', 'BEMHTML', 'jquery', 'tweets'], function (provide, BEMDOM, BEMHTML, $, Tweets) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var radio = this.findBlockInside('radio-group'),
                        optional = this.elem('optional');

                    radio.bindTo('click', function () {
                        var val = radio.getVal();

                        switch (val) {
                            case '0':
                                Tweets.getTweets(optional, 'last');
                                break;

                            case '1' :
                                Tweets.getTweets(optional, 'pics');
                                break;

                            case '2' :
                                Tweets.getTweets(optional, 'likes');
                                break;
                        }
                    });
                }
            }
        },
        {}
    ));
});
