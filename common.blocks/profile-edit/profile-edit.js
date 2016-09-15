modules.define('profile-edit', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
            onSetMod: {
                js: function () {
                    var avatar;

                    this.findBlockOutside('page').on('upload_success', function (event, data) {
                        avatar = data.image;
                    }, this);

                    this.bindTo('save', 'click', function () {
                        var firstName_val = this.findBlockInside({
                                block: 'input',
                                modName: 'field',
                                modVal: 'firstName'
                            }).getVal(),
                            lastName_val = this.findBlockInside({
                                block: 'input',
                                modName: 'field',
                                modVal: 'lastName'
                            }).getVal(),
                            descr_val = this.findBlockInside('textarea').getVal();

                        $.ajax({
                            url: window.config.api_server + '/api/user',
                            method: 'POST',
                            data: {
                                avatar: avatar,
                                firstName: firstName_val,
                                lastName: lastName_val,
                                description: descr_val
                            },
                            dataType: 'json'
                        }).done(function () {
                            document.location.href = window.config.frontend_server + '/profile';
                        });

                        this.unbindFrom('save', 'click');
                    });

                    this.bindTo('back', 'click', function () {
                        document.location.href = window.config.frontend_server + '/profile';
                        this.unbindFrom('back', 'click');
                    });
                }
            }
        },
        {}
    ));
});
