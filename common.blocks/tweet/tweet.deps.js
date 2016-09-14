([
    {
        block: 'tweet',
        shouldDeps: [
            { elem: ['header', 'controls', 'about-user', 'avatar', 'content', 'action', 'icon'] },
            { block: 'button', mods: ['enabled'] },
            { block: 'tweet-attachment' },
            { block: 'vmap' }
        ]
    }
]);
