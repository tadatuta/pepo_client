block('profile')(
    content()(
        function () {
            var curr_ctx = this.ctx,
                profile_data = curr_ctx.profile_data,
                content = [
                    {
                        elem: 'header',
                        url: profile_data.avatar,
                        username: profile_data.lastName + ' ' + profile_data.firstName,
                        login: profile_data.displayName,
                        description: profile_data.description
                    },
                    {
                        elem: 'body'
                    }
                ];

            (curr_ctx.tweets_last) ? content.push({
                elem: 'optional',
                content: {
                    block: 'tweets',
                    tweets: curr_ctx.tweets_last
                }
            }) : content.push({
                elem: 'optional'
            });

            return content;
        }
    )
);
