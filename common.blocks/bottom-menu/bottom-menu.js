modules.define('bottom-menu', ['i-bem__dom', 'jquery'], function (provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {

        _onMenuClick: function () {
            var buttons = this.findBlocksInside('button'),
                urls = [window.config.frontend_server + '/compose', window.config.frontend_server + '/feed',
                    window.config.frontend_server + '/users-search', window.config.frontend_server + '/profile'];

            urls.map(function (v, i) {
                buttons[i].bindTo('click', function () {
                    document.location.href = v;
                });
            });
        }
    }, {
        live: function () {
            this.liveInitOnBlockInsideEvent('click', 'button', function () {
                this._onMenuClick();
            });
        }
    }));
});
