block('tweet').elem('header')(
    content()(function () {
            var about_user = this.ctx.about_user;

            return [
                {
                    block: 'image',
                    mods: { type: 'avatar' },
                    mix: { block: 'tweet', elem: 'avatar' },
                    url: this.ctx.avatar
                },
                {
                    block: 'about-user',
                    mix: { block: 'tweet', elem: 'about-user' },
                    username: about_user.username,
                    login: about_user.login,
                    time: about_user.time
                }
            ];
        }
    )
);
