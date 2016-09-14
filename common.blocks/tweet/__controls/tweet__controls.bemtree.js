block('tweet').elem('controls').content()(function () {
    var extras = this.ctx.extras;

    return {
        block: 'control-group',
        content: ['reply', 'repost', 'like'].map(function (value) {
            var add_btns = {
                block: 'button',
                mods: {},
                mix: { block: 'tweet', elem: 'action' },
                text: '',
                icon: {
                    block: 'icon',
                    mix: { block: 'tweet', elem: 'icon' },
                    mods: {}
                },
                js: {
                    action: value
                }
            };

            if ((extras.likes.length && value === 'like') || (extras.retweets.length && value === 'repost')) {
                add_btns.text = extras.likes.length || extras.retweets.length;
                add_btns.mods = { type: 'good' };
            }

            add_btns.icon.mods[value] = true;

            return add_btns;
        })
    };
});
