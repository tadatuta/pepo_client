modules.define('tweet-list', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var that = this,
                        last_time = this.params.tweet_last_time,
                        body = this.findBlockOutside('body'),
                        nothing = {
                            block: 'text',
                            mods: { nothing: true },
                            content: 'На данный момент больше ничего нет'
                        };

                    var inProgress = false;
                    this.bindToWin('scroll', function () {

                        if ($(window).scrollTop() + $(window).height() >= $(document).height() + 50 && !inProgress) {
                            inProgress = true;

                            $.ajax({
                                url: window.config.frontend_server + '/get-feed/' + last_time,
                                success: function (data) {
                                    if (!body) {
                                        BEMDOM.append(that.domElem,
                                            BEMHTML.apply(nothing));
                                    } else {
                                        BEMDOM.append(body.domElem, data);
                                    }
                                }
                            }).fail(function () {
                                BEMDOM.append(that.domElem,
                                    BEMHTML.apply(nothing));
                            });
                        }
                    });

                    this.unbindFrom('scroll');
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
