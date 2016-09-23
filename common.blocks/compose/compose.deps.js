[
    {
        mustDeps: { block: 'i-bem', elem: 'dom' },
        shouldDeps: [
            { elem: ['add-image', 'body', 'button', 'controls', 'footer', 'textarea', 'save', 'dropzone'] },
            { block: 'dropzone', mods: ['disable'] },
            'input',
            'jquery'
        ]
    },
    {
        tech: 'spec.js',
        shouldDeps: { tech: 'bemhtml', block: 'compose' }
    }
]
