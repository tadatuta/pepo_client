module.exports = {
    extends: 'loris/es5',
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true,
        mocha: true,
        "bem-xjst/bemhtml": true,
        "bem-xjst/bemtree": true
    },
    "globals": {
        "modules": true,
        "BEMHTML": true,
        "Dropzone": true
    },
    "rules": {
        "no-console": 0,
        "space-in-parens": 0,
        "camelcase": 0,
        "strict": 0,
        "no-unused-expressions": 0,
        "one-var": 0,
        "quote-props": 0,
        "object-curly-spacing": 0,
        "array-callback-return": 0,
        "consistent-this": 0,
        "curly": 0,
        "max-len": 0,
        "block-scoped-var": 0,
        "no-redeclare": 0,
        "eqeqeq": 0
    },
    "plugins": [
        "bem-xjst"
    ]
};
