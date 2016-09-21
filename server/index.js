Object.assign || (Object.assign = require('object-assign'));

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
//    expressSession = require('express-session'),
    slashes = require('connect-slashes'),
//    passport = require('passport'),
//    LocalStrategy = require('passport-local').Strategy,
    request = require('request'),

    config = require('./config'),
    staticFolder = config.staticFolder,

    getTweets = require('./get-tweets'),
    getPage = require('./get-page'),
    Render = require('./render'),
    render = Render.render,
    dropCache = Render.dropCache,

    port = process.env.PORT || config.defaultPort,
    isSocket = isNaN(port),
    isDev = process.env.NODE_ENV === 'development';

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(favicon(path.join(staticFolder, 'favicon.ico')))
    .use(serveStatic(staticFolder))
    .use(morgan('combined'))
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(slashes());
// TODO: csrf, gzip

app.get('/ping/', function (req, res) {
    res.send('ok');
});

app.get('/get-last', function (req, res) {
    getTweets(req, res, 'tweets_last');
});

app.get('/get-pics', function (req, res) {
    getTweets(req, res, 'tweets_pics');
});

app.get('/get-likes', function (req, res) {
    getTweets(req, res, 'tweets_liked');
});

app.get('/get-feed/:last_time', function (req, res) {
    var url = config.servers.api_server + '/api/user/feed/history/?offset=' + encodeURIComponent(req.params.last_time),
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
                    block: 'tweet-list',
                    tweets: answer
                })
            }
        }
    })
});

app.get('/auth/', function (req, res) {
    getPage(req, res, '/api/user/', 'auth', '/signup/', '/feed/');
});

app.get('/compose/', function (req, res) {
    render(req, res, {
        view: 'compose',
        title: 'Compose new tweet message'
    })
});

app.get('/feed/', function (req, res) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/user/feed';

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);

        if (response.statusCode == 403) {
            res.redirect('/auth/');
        }
        else {
            if (answer) {
                answer.usemap = true;
                render(req, res, {
                    view: 'feed',
                    title: 'Wall Page',
                    tweets: answer
                })
            }
        }
    });
});

app.get('/login/', function (req, res) {
    render(req, res, {
        view: 'login',
        title: 'Login  Page'
    })
});

app.get('/profile-edit', function (req, res) {

    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/user/';

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);

        if (response.statusCode == 403) {
            res.redirect('/auth/');
        }
        else {
            if (answer) {
                answer.self = true;
                render(req, res, {
                    view: 'profile-edit',
                    title: 'Edit Profile  Page',
                    user_data: {
                        firstName: answer.firstName,
                        lastName: answer.lastName,
                        description: answer.description,
                        avatar: answer.avatar
                    }
                })
            }
        }
    });
});

app.get('/profile', function (req, res) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/user/';

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);

        if (response.statusCode == 403) {
            res.redirect('/auth/');
        }
        else {
            if (answer) {
                render(req, res, {
                    view: 'profile',
                    title: 'User profile',
                    profile_data: answer,
                    tweets_last: answer.tweets_last
                })
            }
        }
    });
});

app.get('/signup/', function (req, res) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/user/';

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);
        if (response.statusCode == 403) {
            res.redirect('/auth/');
        }
        else {
            (answer.notRegistered) ? render(req, res, {
                view: 'signup',
                title: 'Signup Page'
            }) : res.redirect('/feed/');
        }
    });

});

app.get('/users/:login', function (req, res) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/users/' + encodeURIComponent(req.params.login);

    request({
        url: url,
        headers: {
            Cookie: cookie,
            json: true
        }
    }, function (error, response, answer) {
        answer = JSON.parse(answer);

        if (response.statusCode == 403) {
            res.redirect('/auth/');
        }
        else {
            (answer && response.statusCode != 404) ? render(req, res, {
                view: 'profile',
                title: 'Profile  Page',
                profile_data: answer
            }) : res.redirect('*');
        }
    });
});

app.get('/single/', function (req, res) {
    render(req, res, {
        view: 'single',
        title: 'Single block',
        single: req.query.single
    })
});

app.get('*', function (req, res) {
    res.status(404);
    return render(req, res, { view: '404' });
});

if (isDev) {
    app.get('/error/', function () {
        throw new Error('Uncaught exception from /error');
    });

    app.use(require('errorhandler')());
}

isSocket && fs.existsSync(port) && fs.unlinkSync(port);

app.listen(port, function () {
    isSocket && fs.chmod(port, '0777');
    console.log('server is listening on', this.address().port);
});
