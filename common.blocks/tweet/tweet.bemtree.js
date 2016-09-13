block('tweet')(
    content()(
        function () {
            //здесь приходит data из блока tweets

            return [
                {
                    elem: 'left',
                    content: {
                        block: 'image',
                        mods: { type: 'avatar' },
                        url: this.ctx.avatar
                    }
                },
                {
                    elem: 'right',
                    about_user: {
                        username: this.ctx.username,
                        login: this.ctx.login,
                        time: this.ctx.time,
                        content: this.ctx.content,
                        url: this.ctx.url
                    }
                }
            ];
        }
    ));
