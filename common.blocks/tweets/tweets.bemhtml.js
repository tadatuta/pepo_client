block('tweets')(
    js()(function () {
        return {
            tweet_last_time: this.ctx.tweets.tweets[this.ctx.tweets.tweets.length - 1].timestamp
        };
    })
);
