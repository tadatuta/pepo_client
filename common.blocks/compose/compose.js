modules.define('compose', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var image_upload,
                        that = this,
                        save_btn = this.findBlockInside('save', 'button'),
                        textarea = this.findBlockInside('textarea');

                    save_btn.setMod('disabled', true);

                    this.findBlockOutside('page').on('upload_success', function (event, data) {
                        image_upload = data.image;
                        save_btn.setMod('disabled', false);
                    }, this);

                    this.bindTo('add-image', 'click', function () {
                        that.toggleMod('dz');
                    });

                    textarea.on('change', function () {
                        var textarea_val = textarea.getVal();

                        if (!textarea_val || textarea_val.length > 140) {
                            save_btn.setMod('disabled', true);

                            textarea_val.slice(0, 140);
                        } else {
                            save_btn.setMod('disabled', false);
                        }
                    }, this);

                    this.bindTo('save', 'click', function () {
                        this.postTweet(image_upload, textarea);
                    });
                }
            },

            postTweet: function (image_upload, textarea) {
                var url,
                    that = this,
                    re = /(https?:\/\/|www)[^\n ,]+/g,
                    textarea_val = textarea.getVal(),
                    parse_url = textarea_val.toLowerCase().match(re);

                if (parse_url) {
                    url = parse_url[0];
                    textarea_val = textarea_val.toLowerCase().replace(re, '');

                    //если ссылок больше одной, то у пользователя нет выхода - она будет удалена
                    if (parse_url.length > 1) {
                        textarea_val = textarea_val.toLowerCase().replace(re, '');
                    }
                }

                $.ajax({
                    url: window.config.api_server + '/api/user/feed',
                    method: 'POST',
                    data: {
                        content: textarea_val,
                        image: image_upload,
                        url: url
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
