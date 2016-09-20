/**
 * @module tweet
 */
modules.define('tweet', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    /**
     * @class tweet
     * @bem
     */
    provide(BEMDOM.decl(this.name,
        {
            /**
             * Add or delete action data (likes, repost)
             * @param ctx {Object} Current context
             * @param url {String} Request link
             * @param method {String} Method name
             * @private
             */
            _addDelAction: function (ctx, url, method) {
                return $.ajax({
                    url: window.config.api_server + '/api/tweet/' + this.params.id + '/' + url,
                    type: method,
                    dataType: 'json',
                    context: ctx
                });
            },

            /**
             * Change styling of tweet buttons
             * @param e {event}
             * @private
             */
            _onClick: function (e) {
                var action = e.target.params.action,
                    tweet_id = this.params.id,
                    that = e.target;

                switch (action) {
                    case 'like':
                        if (!that.hasMod('type')) {
                            this._addDelAction(that, 'like', 'POST').done(function (msg) {
                                that.setMod('type', 'good');
                                that.setMod('enabled');
                                that.setText(msg.tweets[0].extras.likes.length);
                            });
                        } else {
                            this._addDelAction(that, 'like', 'DELETE').done(function (msg) {
                                this.delMod('type');
                                this.delMod('enabled');
                                this.delMod('focused');
                                this.setText(msg.tweets[0].extras.likes.length);
                            });
                        }
                        break;

                    case 'repost':
                        if (!that.hasMod('type')) {
                            this._addDelAction(that, 'retweet', 'POST').done(function (msg) {
                                that.setMod('type', 'good');
                                that.setMod('enabled');
                                that.setText(msg.tweets[0].extras.retweets.length);
                            });
                        } else {
                            this._addDelAction(that, 'retweet', 'DELETE').done(function (msg) {
                                this.delMod('type');
                                this.delMod('enabled');
                                this.delMod('focused');
                                this.setText(msg.tweets[0].extras.retweets.length);
                            });
                        }
                        break;

                    case 'reply':
                        document.location.href = window.config.api_server + '/comment/' + tweet_id;
                        break;
                }
            }
        },
        {
            live: function () {
                this.liveInitOnBlockInsideEvent('click', 'button', function (e) {
                    this._onClick(e);
                });
            }
        }));
});
