modules.define('tweets', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var that = this,
                        last_time = this.params.tweet_last_time,
                        body = this.findBlockOutside('body');

                    $(function () {
                        var inProgress = false;

                        $(window).scroll(function () {

                            if ($(window).scrollTop() + $(window).height() >= $(document).height() && !inProgress) {
                                inProgress = true;

                                $.ajax({
                                    url: window.config.frontend_server + '/get-feed/' + last_time,
                                    success: function (data) {
                                        BEMDOM.append(body.domElem,
                                            BEMHTML.apply(data));
                                    }
                                }).fail(function () {
                                    BEMDOM.append(that.domElem,
                                        BEMHTML.apply({
                                            block: 'text',
                                            mods: { nothing: true },
                                            content: 'На данный момент больше ничего нет'
                                        }));
                                });
                            }
                        });
                    });
                }
            }
        },
        {
            getTweets: function (block, rtn_tweets) {
                $.ajax({
                    url: window.config.frontend_server + '/get-' + rtn_tweets,
                    success: function (data) {
                        BEMDOM.update(block,
                            BEMHTML.apply(data));
                    }
                });
            }
        }
    ));
});
