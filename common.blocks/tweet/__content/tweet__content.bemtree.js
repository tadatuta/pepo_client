block('tweet').elem('content')(
    content()(
        function () {
            var extras = this.ctx.extras,
                content_right = [
                    {
                        block: 'link',
                        mods: { plaintext: true },
                        content: this.ctx.content,
                        url: this.ctx.url
                    }
                ];

            if (extras) {

                if ((extras.url) && (!extras.attachment)) {
                    content_right.push({
                        block: 'tweet-url',
                        content: [
                            {
                                block: 'link',
                                url: extras.url,
                                content: extras.url
                            }
                        ]
                    });
                }

                if (extras.image) {
                    content_right.push({
                        block: 'tweet-image',
                        content: [
                            {
                                block: 'image',
                                url: extras.image
                            }
                        ]
                    });
                }

                if (extras.attachment) {
                    content_right.push({
                        block: 'tweet-attachment',
                        target: extras.attachment.target,
                        url: extras.attachment.url,
                        title: extras.attachment.title
                    });
                }

                if (extras.geo) {
                    content_right.push({
                        block: 'tweet-geo',
                        content: extras.geo
                    });
                }
            }

            return content_right;
        }
    )
);
