block('single-tweet')(
    content()(
        function () {
            return {
                block: 'tweet-list',
                content: {
                    block: 'tweet'
                }
            }
        }
    )
);
