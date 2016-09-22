/**
 * @module compose
 */
modules.define('compose', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    /**
     * @class compose
     * @bem
     */
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
                        this._changeButtonMods(textarea, save_btn);
                    }, this);

                    this.bindTo('save', 'click', function () {
                        this._postTweet(image_upload, textarea);
                    });
                }
            },

            /**
             * Sends the tweet to the server and returns user to feed page
             * @private
             * @param image_upload {String} Image returned from dropzone block
             * @param textarea {Object} block: 'textarea'
             */
            _postTweet: function (image_upload, textarea) {
                var url,
                    that = this,
                    re = /(https?:\/\/|www)[^\n ,]+/g,
                    textarea_val = textarea.getVal(),
                    parse_url = textarea_val.toLowerCase().match(re);

                if (parse_url) {

                    if (textarea_val == parse_url[0]) {
                        url = undefined;
                        textarea_val = parse_url[0];
                    } else {
                        url = parse_url[0];
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
            },

            /**
             * Change button mods
             * @private
             * @param input_block {Object} Input/textarea object
             * @param button {Object} save_button object
             * @returns button mods
             */
            _changeButtonMods: function (input_block, button) {
                var input_val = input_block.getVal();

                if (!input_val || input_val.length > 140) {
                    return button.setMod('disabled', true);
                } else {
                    return button.setMod('disabled', false);
                }
            }
        },
        {}));
});
