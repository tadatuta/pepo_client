block('page').mod('view', 'profile')(
    content()(function () {
        var curr_data = this.data;
        return [
            {
                block: 'header',
                content: {
                    block: 'profile',
                    profile_data: curr_data.profile_data,
                    tweets_last: curr_data.tweets_last
                }
            }
        ];
    })
);
