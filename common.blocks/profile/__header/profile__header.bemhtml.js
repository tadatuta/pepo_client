block('profile').elem('header')(
    content()(
        function () {
            return [
                {
                    block: 'button',
                    mods: { theme: 'simple' },
                    mix: { block: 'profile', elem: 'edit' },
                    icon: {
                        block: 'icon'
                    }
                },
                {
                    block: 'image',
                    mods: { type: 'avatar' },
                    url: this.ctx.url
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
