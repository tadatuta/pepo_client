// Karma configuration
// Generated on Wed Sep 21 2016 00:02:19 GMT+0300 (MSK)

module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'browserify'],

        files: [
            "./common.blocks/**/*.spec.js"
        ],

        exclude: [],

        preprocessors: {
            './common.blocks/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
