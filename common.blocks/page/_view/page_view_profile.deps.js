({
    shouldDeps: [
        { block: ['header', 'body', 'footer'] },
        { block: 'profile' },
        { block: 'tweets', mods: { display: 'last' } },
        { block: 'hidden-menu', mods: { side: 'right' } }
    ]
});
