/**
 * @module bottom-menu
 */

modules.define('bottom-menu', ['i-bem__dom', 'jquery'], function (provide, BEMDOM) {

    /**
     * @class bottom-menu
     * @bem
     */
    provide(BEMDOM.decl(this.name, {

        /**
         * Returns links for menu buttons
         * @private
         * @returns {String} Links
         */
        _addLinks: function () {
            var buttons = this.findBlocksInside('button'),
                links = [window.config.frontend_server + '/compose', window.config.frontend_server + '/feed',
                    window.config.frontend_server + '/profile'];

            links.map(function (v, i) {
                buttons[i].bindTo('click', function () {
                    document.location.href = v;
                });
            });
        }
    }, {
        live: function () {
            this.liveInitOnBlockInsideEvent('click', 'button', function () {
                this._addLinks();
            });
        }
    }));
});
