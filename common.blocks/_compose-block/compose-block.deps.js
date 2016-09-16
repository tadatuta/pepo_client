([
    {
        shouldDeps: [
            {
                block: 'pepo-textarea'
            },
            {
                block: 'compose-menu'
            }
        ]
    },
    {
        tech: 'js',
        mustDeps: [
            {block: 'button', mods: {snapshot: 'url'}, tech: 'bemhtml'},
            {block: 'url-input', tech: 'bemhtml'},
            {block: 'compose-modal', tech: 'bemhtml'},
            {block: 'dropzone', tech: 'bemhtml'}
        ]
    }

]);
