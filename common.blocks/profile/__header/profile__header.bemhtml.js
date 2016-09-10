block('profile').elem('header')(
    content()(
        function () {
            return [
                {
                    block: 'button',
                    mix: { block: 'profile', elem: 'to-edit' },
                    mods: { theme: 'simple', size: 'm', type: 'link' },
                    url: '/profile-edit/',
                    icon: {
                        block: 'icon',
                        mods: { profile: 'edit' }
                    }
                },
                {
                    block: 'image',
                    mods: { type: 'avatar' },
                    url: this.ctx.url,
                    js: false
                },
                {
                    block: 'about-user',
                    username: this.ctx.username,
                    login: '@' + this.ctx.login,
                    description: this.ctx.description
                }
            ];
        }
    )
);
