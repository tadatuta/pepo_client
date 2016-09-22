module.exports = {
    specs: ['./common.blocks/**/*.spec.js'],

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};
