modules.define(
    'spec',
    ['bottom-menu', 'i-bem__dom', 'jquery', 'BEMHTML', 'sinon', 'chai'],
    function(provide, BottomMenu, BEMDOM, $, BEMHTML, sinon, chai) {

var expect = chai.expect;

var bottomMenu;

beforeEach(function() {
    bottomMenu = BEMDOM.init($(BEMHTML.apply({ block : 'bottom-menu' })).appendTo('body'))
        .bem('bottom-menu');
});

afterEach(function() {
    BEMDOM.destruct(bottomMenu.domElem);
});

// var _addLinks = function () {
//     var links = ['localhost:8080/compose', 'localhost:8080/feed',
//         'localhost:8080/users-search', 'localhost:8080/profile'];

//     links.map(function (v) {
//         document.location.href = v;
//     });
// };

describe('нижнее меню', function () {
    it('_addLinks должно быть функцией', function () {
        // assert.isFunction(_addLinks);
    });
});

provide();

});
