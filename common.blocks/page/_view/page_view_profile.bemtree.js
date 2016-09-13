block('page').mod('view', 'profile')(
    content()(function () {
        var curr_data = this.data;
        return [
            {
                block: 'header',
                content: {
                    block: 'profile',
                    profile_data: curr_data.profile_data,
                    tweets_like: curr_data.tweets_liked,
                    tweets_pics: curr_data.tweets_pics,
                    tweets_last: curr_data.tweets_last
                }
            }
        ];
    })
);
