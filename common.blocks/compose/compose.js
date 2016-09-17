modules.define('compose', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var avatar;

                    this.findBlockOutside('page').on('upload_success', function (event, data) {
                        avatar = data.image;
                    }, this);

                    this.bindTo('save', 'click', function () {
                        this.postTweet(avatar);
                    });

                    var that = this,
                        btns = this.findBlocksInside('button');

                    btns.forEach(function (v, i) {
                        switch (btns[i].getVal()) {
                            case '0':
                                btns[i].bindTo('click', function () {
                                    that.elem('image').setElemMod('visible', true);
                                });
                                break;

                            case '1':
                                btns[i].bindTo('click', function () {
                                    console.log(1);
                                });
                                break;

                            case '2':
                                btns[i].bindTo('click', function () {
                                    console.log(2);
                                });
                                break;
                        }
                    });
                }
            },

            postTweet: function (avatar) {
                var that = this;

                $.ajax({
                    url: window.config.api_server + '/api/user/feed',
                    method: 'POST',
                    data: {
                        content: this.findBlockInside('textarea').getVal(),
                        image: avatar
                    },
                    dataType: 'json'
                }).done(function () {
                    document.location.href = '/feed';
                    that.unbindFrom('save', 'click');
                });
            }
        },
        {}));
});
