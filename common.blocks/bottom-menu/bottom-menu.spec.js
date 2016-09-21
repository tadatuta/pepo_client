var assert = require('chai').assert;

var _addLinks = function () {
    var links = ['localhost:8080/compose', 'localhost:8080/feed',
        'localhost:8080/users-search', 'localhost:8080/profile'];

    links.map(function (v) {
        document.location.href = v;
    });
};

describe('нижнее меню', function () {
    it('_addLinks должно быть функцией', function () {
        assert.isFunction(_addLinks);
    });
});
