modules.define('profile', ['i-bem__dom', 'BEMHTML', 'jquery'], function (provide, BEMDOM, BEMHTML, $) {

    provide(BEMDOM.decl(this.name,
        {
            onSetMod: {
                js: function () {
                    var radio = this.findBlockInside('radio-group'),
                        optional = this.elem('optional');

                    if (radio.getVal() == 0) {

                    }

                    radio.bindTo('click', function () {
                        var val = radio.getVal();

                        switch (val) {
                            case '0':
                                $.ajax({
                                    url: window.config.frontend_server + '/get-last',
                                    success: function (data) {
                                        BEMDOM.update(optional,
                                        BEMHTML.apply(data));
                                    }
                                });
                                break;

                            case '1' :
                                $.ajax({
                                    url: window.config.frontend_server + '/get-pics',
                                    success: function (data) {
                                        BEMDOM.update(optional,
                                        BEMHTML.apply(data));
                                    }
                                });
                                break;

                            case '2' :
                                $.ajax({
                                    url: window.config.frontend_server + '/get-likes',
                                    success: function (data) {
                                        BEMDOM.update(optional,
                                        BEMHTML.apply(data));
                                    }
                                });
                                break;
                        }
                    });
                }
            }
        },
        {}
    ));
});
