/**
 * @module profile-edit
 */
modules.define('profile-edit', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {

    /**
     * @class profile-edit
     * @bem
     */
    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: function () {
                    var avatar;

                    this.findBlockOutside('page').on('upload_success', function (event, data) {
                        avatar = data.image;
                    }, this);

                    this.bindTo('save', 'click', function () {
                        this._setUserInfo(this, avatar);
                    });

                    this.bindTo('back', 'click', function () {
                        document.location.href = window.config.frontend_server + '/profile';
                        this.unbindFrom('back', 'click');
                    });
                }
            },

            /**
             * Returns input values
             * @private
             * @param field_name {String} Name of the field that you want to get
             * @returns {String} input_value
             */
            _getInputValue: function (field_name) {
                return this.findBlockInside({ block: 'input', modName: 'field', modVal: field_name }).getVal();
            },

            /**
             * @private
             * @param ctx {Object} Context
             * @param avatar {String} Image returned from dropzone block
             */
            _setUserInfo: function (ctx, avatar) {
                var this_avatar = avatar,
                    firstName_val = ctx._getInputValue('firstName'),
                    lastName_val = ctx._getInputValue('lastName'),
                    descr_val = ctx.findBlockInside('textarea').getVal();

                $.ajax({
                    url: window.config.api_server + '/api/user',
                    method: 'POST',
                    data: {
                        avatar: this_avatar,
                        firstName: firstName_val,
                        lastName: lastName_val,
                        description: descr_val
                    },
                    dataType: 'json'
                }).done(function () {
                    document.location.href = window.config.frontend_server + '/profile';
                });

                ctx.unbindFrom('save', 'click');
            }
        },
        {}
    ));
});
