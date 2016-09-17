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
            render(req, res, {
                view: 'auth',
                title: 'Auth  Page'
            })
        } else {
            if (answer.notRegistered) {
                res.redirect('/signup/');
            }
            else {
                res.redirect('/feed/');
            }
        }
    });

});

app.get('/comment/', function (req, res) {
    render(req, res, {
        view: 'comment',
        title: 'comment'
    })
});

app.get('/compose/', function (req, res) {
    render(req, res, {
        view: 'compose',
        title: 'Compose new tweet message'
    })
});

app.get('/comment/:id', function (req, res) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/tweet/' + req.params.id;

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
                    view: 'compose',
                    title: 'Reply to tweet message',
                    tweet_data: answer
                })
            }
            else {
                render(req, res, {
                    view: '500',
                    title: ''
                })
            }

        }
    });
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
                    view: 'wall',
                    title: 'Wall Page',
                    tweets: answer
                })
            }
        }
    });
});

app.get('/map/', function (req, res) {
    render(req, res, {
        view: 'vmap',
        title: 'My map'
    })
});

app.get('/login/', function (req, res) {
    render(req, res, {
        view: 'login',
        title: 'Login  Page'
    })
});

app.get('/profile-edit', function (req, res) {

    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']);
    var url = config.servers.api_server + '/api/user/';

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

    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']);
    var url = config.servers.api_server + '/api/user/';

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
            if (answer.notRegistered) {
                render(req, res, {
                    view: 'signup',
                    title: 'Signup Page'
                });
            }
            else {
                res.redirect('/feed/');
            }
        }
    });

});

app.get('/tweet/:id', function (req, res) {
    var cookie = request.cookie('connect.sid=' + req.cookies['connect.sid']),
        url = config.servers.api_server + '/api/tweet/' + req.params.id;

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
                    view: 'tweet',
                    title: 'Tweet  Page',
                    tweet_data: answer
                })
            }
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

            if (answer) {
                if (response.statusCode != 404) {
                    render(req, res, {
                        view: 'profile',
                        title: 'Profile  Page',
                        profile_data: answer
                    })
                } else {
                    res.status(404);
                    return render(req, res, { view: '404' });
                }
            }
        }
    });
});

app.get('/users-search/', function (req, res) {
    render(req, res, {
        view: 'users-search',
        title: 'Users Search'
    })
});

app.get('/single/', function (req, res) {
    render(req, res, {
        view: 'single',
        title: 'Single block',
        single: req.query.single
    })
});

app.get('/image-upload/', function (req, res) {
    render(req, res, {
        view: 'image-upload',
        title: 'Image upload'
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
