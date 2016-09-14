block('tweet')(
    content()(
        function () {
            return [
                {
                    elem: 'header',
                    avatar: this.ctx.avatar,
                    about_user: {
                        username: this.ctx.username,
                        login: this.ctx.login,
                        time: this.ctx.time
                    }
                },
                {
                    elem: 'content',
                    content: this.ctx.content,
                    url: this.ctx.url,
                    extras: this.ctx.extras
                },
                {
                    elem: 'controls',
                    extras: this.ctx.extras
                }
            ];
        }
    ));
