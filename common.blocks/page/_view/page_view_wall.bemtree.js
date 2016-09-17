block('page').mod('view', 'wall')(
    content()(function () {
        return [
            {
                block: 'body',
                content: {
                    block: 'tweet-list',
                    tweets: this.data.tweets
                }
            },
            {
                block: 'footer',
                content: {
                    block: 'bottom-menu'
                }
            }
        ];
    })
);
