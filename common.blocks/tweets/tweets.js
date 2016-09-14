modules.define('tweets', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {},
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
