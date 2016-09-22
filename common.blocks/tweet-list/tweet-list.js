/**
 * @module tweet-list
 */
modules.define('tweet-list', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    /**
     * @class tweet-list
     * @bem
     */
    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var that = this,
                        last_time = this.params.tweet_last_time,
                        body = this.findBlockOutside('body'),
                        nothing = {
                            block: 'link',
                            mods: { nothing: true },
                            url: '/compose',
                            content: 'На данный момент больше ничего нет'
                        };

                    $('.tweet').ready(function () {
                        // Get each div
                        $('.tweet__content').each(function () {
                            var str = $(this).html(),
                                regex = /(https?:\/\/([\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig;

                            var replaced_text = str.replace(regex, '<a href="$1" target="_blank">$1</a>');
                            // Echo link
                            $(this).html(replaced_text);
                        });
                    });

                    var inProgress = false;
                    this.bindToWin('scroll', function () {

                        this.unbindFrom('scroll');
                        if ($(window).scrollTop() + $(window).height() >= $(document).height() && !inProgress) {

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
                }
            }
        },
        {
            /**
             * Return array of tweets
             * @param block {Object} Block name to add tweet-list
             * @param rtn_tweets {String} Name of tweet to recieve
             * @returns 10 last tweets specified type
             */
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
