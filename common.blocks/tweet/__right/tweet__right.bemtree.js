block('tweet').elem('right')(
    content()(
        function () {
            var about_user = this.ctx.about_user,
                content_right = [
                    {
                        block: 'about-user',
                        username: about_user.username,
                        login: about_user.login,
                        time: about_user.time
                    },
                    {
                        block: 'link',
                        mods: { plaintext: true },
                        content: about_user.content,
                        url: about_user.url
                    }
                ];

            //if (extras) {
            //
            //    if ((extras.url) && (!extras.attachment)) {
            //        content_right.push({
            //            block: 'tweet-url',
            //            content: [
            //                {
            //                    block: 'link',
            //                    url: extras.url,
            //                    content: extras.url
            //                }
            //            ]
            //        });
            //    }
            //
            //    if (extras.image) {
            //        content_right.push({
            //            block: 'tweet-image',
            //            content: [
            //                {
            //                    block: 'image',
            //                    url: extras.image
            //                }
            //            ]
            //        });
            //    }
            //
            //    if (extras.attachment) {
            //        content_right.push({
            //            block: 'tweet-attachment',
            //            target: extras.attachment.target,
            //            url: extras.attachment.url,
            //            title: extras.attachment.title
            //        });
            //    }
            //
            //    if (extras.geo) {
            //        content_right.push({
            //            block: 'tweet-geo',
            //            content: extras.geo
            //        });
            //    }
            //}
            //
            //content_right.push({
            //    elem: 'controls',
            //    extras: about_user.extras
            //});

            return content_right;
        }
    )
);
