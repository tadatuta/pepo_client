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
                content_right.push(
                    extras.url ? {
                        block: 'link',
                        mix: { block: 'tweet', elem: 'url' },
                        url: extras.url,
                        content: extras.url
                    } : '',
                    extras.image ? {
                        block: 'image',
                        mix: { block: 'tweet', elem: 'image' },
                        url: extras.image
                    } : ''
                );
            }

            return content_right;
        }
    )
);
