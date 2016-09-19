block('tweet-list')(
    content()(function () {
        if (this.ctx.tweets.tweets.length == 0) {
            return {
                block: 'text',
                mods: { nothing: true },
                content: 'На данный момент ничего нет'
            };
        } else {
            return this.ctx.content;
        }
    }),

    js()(function () {
        if (this.ctx.tweets.tweets.length == 0) {
            return ;
        } else {
            return {
                tweet_last_time: this.ctx.tweets.tweets[this.ctx.tweets.tweets.length - 1].timestamp
            };
        }
    })
);
