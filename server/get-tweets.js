var Render = require('./render'),
    render = Render.render,
    config = require('./config'),
    request = require('request');

module.exports = function (req, res, cell) {
    var url = config.servers.api_server + '/api/user',
        cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']);

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);

        if (answer) {
            if (response.statusCode != 404) {
                render(req, res, null, {
                    block: 'tweets',
                    tweets: answer[cell]
                })
            }
        }
    })
};
