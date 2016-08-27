modules.define('compose-block', ['i-bem__dom', 'jquery', 'BEMHTML'],

    function (provide, BEMDOM, $, BEMHTML) {

        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: {
                    inited: function () {
                        function update_btn(btnelem, textelem) {
                            var val = textelem.domElem.val();

                            console.log(val);

                            if (val) {
                                btnelem.delMod("disabled");
                            } else {
                                btnelem.setMod("disabled", true);
                            }
                        }

                        var that = this,
                            text_input = this.findBlockInside('textarea'),
                            send_tweet_btn = this.findBlockInside('send-tweet-btn');

                        update_btn(send_tweet_btn, text_input);

                        text_input.bindTo('keyup', function () {
                            update_btn(send_tweet_btn, text_input);
                        });

                        send_tweet_btn.bindTo('click', function () {
                            if (this.hasMod("disabled")) {
                                return;
                            }

                            var old_error = that.findBlockInside('error-message');

                            if (old_error) {
                                BEMDOM.destruct(old_error.domElem);
                            }

                            that.dropElemCache('error-message');

                            $.ajax(
                                {
                                    url: "http://localhost:8080/api/user/testUser/feed", // TODO решить с ребятами из сервера, нафига мне тут логин постить
                                    type: "POST",
                                    data: {
                                        text: text_input.domElem.val()
                                    },
                                    dataType: "json",
                                    contentType: "multipart/form-data",
                                    context: this
                                }
                            ).done(
                                function () {
                                    document.location.href = "/";
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