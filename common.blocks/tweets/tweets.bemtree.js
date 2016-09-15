var moment = require('moment');
moment.locale('ru');

block('tweets')(
    content()(function () {

        if (this.ctx.tweets === undefined) {
            return {
                block: 'text',
                mods: { nothing: true },
                content: 'Постов нет'
            };
        } else {
            var tweets = this.ctx.tweets.tweets,
                users = this.ctx.tweets.users;

            tweets = tweets.map(function (v, i) {

                if (users[v.author].firstName && users[v.author].lastName) {
                    var username = users[v.author].firstName + ' ' + users[v.author].lastName;
                } else if (!users[v.author].firstName || !users[v.author].lastName) {
                    var username = users[v.author].firstName || users[v.author].lastName;
                }

                var diff_time = moment(tweets[i].timestamp).fromNow();

                return {
                    block: 'tweet',
                    avatar: users[v.author].avatar,
                    username: username,
                    login: '@' + users[v.author].displayName,
                    time: diff_time,
                    content: tweets[i].content,
                    url: tweets[i]._id,
                    extras: tweets[i].extras,
                    id: tweets[i]._id
                };
            });

            return tweets;
        }
    })
);
