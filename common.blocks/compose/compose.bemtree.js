block('compose')(
    content()(function () {
        return [
            {
                elem: 'body'
            },
            {
                elem: 'controls'
            },
            {
                elem: 'dropzone',
                content: {
                    block: 'dropzone',
                    js: { url: '/api/user/image' }
                }
            },
            {
                elem: 'footer'
            }
        ];
    })
);
