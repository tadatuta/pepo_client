block('tweet')(
    content()(
        function () {
            var tweet_data = this.ctx.data[0];

            return [
                {
                    elem: 'left',
                    content: {
                        block: 'image',
                        mix: { block: 'avatar', mods: { type: 'tweet' } },
                        url: tweet_data.avatar
                    }
                },
                {
                    elem: 'right',
                    content: [
                        {
                            block: 'account-info',
                            content: [
                                {
                                    block: 'text',
                                    mods: { username: true },
                                    content: tweet_data.firstName + ' ' + tweet_data.lastName
                                },
                                {
                                    block: 'text',
                                    mods: { id: true },
                                    content: '@' + tweet_data.login
                                }
                            ]
                        },
                        {
                            block: 'text',
                            mods: { time: true },
                            content: tweet_data.timestamp
                        },
                        {
                            block: 'text',
                            mods: { main: true },
                            content: tweet_data.content
                        },
                        {
                            block: 'control-group',
                            content: ['reply', 'repost', 'like'].map(function (v, i, content) {
                                var button = {
                                    block: 'button',
                                    mods: {},
                                    text: i,
                                    mix: { block: 'tweet', elem: 'button' },
                                    icon: {
                                        block: 'icon',
                                        mods: {}
                                    }
                                };

                                button.icon.mods[content[i]] = true;
                                button.mods[content[i]] = true;

                                return button;
                            })
                        }
                    ]
                }
            ];
        }
    )
);