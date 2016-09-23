block('profile').elem('header')(
    content()(
        function () {
            return [
                {
                    block: 'button',
                    mods: { theme: 'simple', type: 'link' },
                    mix: { block: 'profile', elem: 'to-edit' },
                    url: '/profile-edit',
                    icon: {
                        block: 'icon'
                    }
                },
                {
                    block: 'button',
                    mods: { theme: 'simple', type: 'link' },
                    mix: { block: 'profile', elem: 'to-feed' },
                    url: '/feed',
                    icon: {
                        block: 'icon'
                    }
                },
                {
                    block: 'image',
                    mods: { type: 'avatar' },
                    mix: { block: 'profile', elem: 'avatar' },
                    url: this.ctx.url
                },
                {
                    block: 'about-user',
                    mix: { block: 'profile', elem: 'about-user' },
                    username: this.ctx.username,
                    login: '@' + this.ctx.login,
                    description: this.ctx.description
                }
            ];
        }
    )
);
