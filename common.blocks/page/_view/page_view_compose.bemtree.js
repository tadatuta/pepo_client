block('page').mod('view', 'compose')(
    content()(function () {
        return {
            block: 'compose',
            mods: { dz: true }
        };
    })
);
