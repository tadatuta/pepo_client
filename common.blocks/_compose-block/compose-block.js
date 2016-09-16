modules.define('compose-block', ['i-bem__dom', 'jquery', 'BEMHTML'],

    function (provide, BEMDOM, $, BEMHTML) {

        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: {
                    inited: function () {
                        function update_btn(btnelem, textelem) {
                            var val = textelem.domElem.val();

                            if (val) {
                                btnelem.delMod('disabled');
                            } else {
                                btnelem.setMod('disabled', true);
                            }
                        }

                        var that = this,
                            tweet_attachment = null,
                            tweet_image = null,
                            tweet_url = null,
                            tweet_to_reply = null,
                            text_input = this.findBlockInside('textarea'),
                            send_tweet_btn = this.findBlockInside('send-tweet-btn');

                        if (this.params.tweets) {
                            tweet_to_reply = this.params.tweets[0]._id;
                            text_input.domElem.val('@' + this.params.users[this.params.tweets[0].author].displayName + ' ');
                        }

                        // события редактора

                        this.findBlockOutside('page').on(
                            'upload_success', // имя БЭМ-события
                            function (event, data) {
                                tweet_image = data.image;
                                send_tweet_btn.setMod('disabled', false);
                            },
                            that
                        );

                        this.findBlockOutside('page').on(
                            'url_snapshot_success', // имя БЭМ-события
                            function (event, data) {
                                var pre = that.findBlockInside('tweet-attachment');
                                if (pre) {
                                    BEMDOM.destruct(pre.domElem);
                                    that.dropElemCache();
                                }

                                if (data.status !== 'OK') {
                                    tweet_url = null;
                                    tweet_attachment = null;
                                    return;
                                }
                                data = data.attachment;
                                BEMDOM.append(
                                    that.findBlockInside('modal-body').domElem,
                                    BEMHTML.apply({
                                        block: 'tweet-attachment',
                                        target: data.url,
                                        title: data.title,
                                        url: data.image
                                    })
                                );

                            },
                            that
                        );

                        this.findBlockOutside('page').on(
                            'url_snapshot_set', // имя БЭМ-события
                            function (event, data) {
                                tweet_url = data.url;
                                BEMDOM.append(
                                    that.findBlockInside('modal-body').domElem,
                                    BEMHTML.apply({
                                        block: 'tweet-attachment'
                                    }));
                            },
                            that
                        );

                        this.findBlockOutside('page').on(
                            'url_attachment_set', // имя БЭМ-события
                            function (event, data) {
                                if (data.status !== 'OK') {
                                    tweet_url = null;
                                    var pre = that.findBlockInside('tweet-attachment');
                                    if (pre) {
                                        BEMDOM.destruct(pre.domElem);
                                        that.dropElemCache();
                                    }
                                    return;
                                }
                                tweet_attachment = data.attachment;
                                send_tweet_btn.setMod('disabled', false);

                            },
                            that
                        );

                        update_btn(send_tweet_btn, text_input);

                        text_input.bindTo('change', function () {
                            update_btn(send_tweet_btn, text_input);
                        });

                        send_tweet_btn.bindTo('click', function () {
                            if (this.hasMod('disabled')) {
                                return;
                            }

                            var old_error = that.findBlockInside('error-message'),
                                uri;

                            if (old_error) {
                                BEMDOM.destruct(old_error.domElem);
                            }

                            that.dropElemCache('error-message');

                            if (tweet_to_reply) {
                                uri = '/api/tweet/' + tweet_to_reply;
                            } else {
                                uri = '/api/user/feed';
                            }

                            $.ajax(
                                {
                                    url: window.config.api_server + uri,
                                    type: 'POST',
                                    data: JSON.stringify(
                                        {
                                            content: text_input.domElem.val(),
                                            extras: {
                                                image: tweet_image,
                                                url: tweet_url,
                                                attachment: tweet_attachment
                                            }
                                        }
                                    ),
                                    dataType: 'json',
                                    contentType: 'application/json; charset=utf-8',
                                    context: this
                                }
                            ).done(
                                function () {
                                    document.location.href = '/';
                                }
                            ).fail(
                                function (msg) {
                                    var response = msg.responseText;
                                    if (!response) {
                                        response = 'Неизвестная ошибка сервера';
                                    }

                                    BEMDOM.append(that.domElem, BEMHTML.apply({
                                        block: 'error-message',
                                        content: response
                                    }));

                                    that.dropElemCache('error-message');
                                }
                            );

                        });
                    }
                }
            }

        }));

    });
