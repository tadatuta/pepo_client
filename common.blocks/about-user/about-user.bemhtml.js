block('about-user')(
    js()(true),
    content()(function () {
        var data = this.ctx,
            about = [
                {
                    elem: 'header',
                    username: data.username,
                    time: data.time
                },
                {
                    block: 'text',
                    mods: { id: true },
                    content: data.login
                }
            ];

        if (!data.description) {
            return about;
        } else {
            about.push({
                block: 'text',
                mods: { about: true },
                content: data.description
            });

            return about;
        }
    })
);
