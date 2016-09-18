modules.define('compose', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var avatar,
                        that = this;

                    this.findBlockOutside('page').on('upload_success', function (event, data) {
                        avatar = data.image;
                    }, this);

                    this.bindTo('save', 'click', function () {
                        this.postTweet(avatar);
                    });

                    this.bindTo('add-image', 'click', function () {
                        that.toggleMod('dz');
                    });

                }
            },

            postTweet: function (avatar) {
                var url,
                    that = this,
                    textarea_val = this.findBlockInside('textarea').getVal(),
                    parse_url = textarea_val.toLowerCase().match(/(https?:\/\/|www)[^\n ,]+/g);

                if (parse_url) {
                    url = parse_url[0];
                    textarea_val = textarea_val.replace(/(https?:\/\/|www)[^\n ,]+/g, '');

                    //если ссылок больше одной, то у пользователя нет выхода - она будет удалена
                    if (parse_url.length > 1) {
                        textarea_val = textarea_val.replace(/(https?:\/\/|www)[^\n ,]+/g, '');
                    }
                }

                $.ajax({
                    url: window.config.api_server + '/api/user/feed',
                    method: 'POST',
                    data: {
                        content: textarea_val,
                        image: avatar,
                        url: url,
                        extras: {
                            attachment: 'http://assets.pokemon.com/assets/cms2/img/misc/_tiles/privacy-policy-change-169.jpg'
                        }
                    },
                    dataType: 'json'
                }).done(function (data) {
                    console.log(data);
                    //document.location.href = '/feed';
                    that.unbindFrom('save', 'click');
                });
            }
        },
        {}));
});
