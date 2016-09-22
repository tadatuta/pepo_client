block('about-user').elem('header')(
    content()(
        function () {
            var head = [
                {
                    block: 'text',
                    mods: { username: true },
                    content: this.ctx.username
                }
            ];

            (this.ctx.time) ? head.push({
                block: 'text',
                mods: { time: true },
                content: this.ctx.time
            }) : '';

            return head;
        }
    )
);
