var Render = require('./render'),
    render = Render.render,
    config = require('./config'),
    request = require('request');

module.exports = function (req, res, url, view, first_redirect, second_redirect) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + url;

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);

        if (response.statusCode == 403) {
            render(req, res, {
                view: view,
                title: 'Auth  Page'
            })
        } else {
            if (answer.notRegistered) {
                res.redirect(first_redirect);
            }
            else {
                res.redirect(second_redirect);
            }
        }
    });
};