modules.define('login', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                'js': {
                    'inited': function () {

                        var field_login = this.findBlockInside('input');

                        this.bindTo('add', 'click', function (e) {
                            e.preventDefault();

                            $.ajax({
                                url: window.config.api_server + '/api/user/',
                                type: 'POST',
                                data: {
                                    displayName: field_login.findBlockInside('input__control').domElem.val()
                                },
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                context: this
                            }).done(function () {
                                document.location.href = '/profile-edit/';
                            }).fail(function () {
                                field_login.setMod('has-error', true);
                            });
                        });

                        field_login.findBlockInside('input__control').bindTo('focus', function () {
                            field_login.setMod('has-error', false);
                        });
                    }
                }
            }
        }
    ));

});
