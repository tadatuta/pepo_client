block('page').mod('view', 'profile-edit').content()(function () {
    return [
        {
            block: 'profile-edit',
            user_data: this.ctx.user_data
        }
    ];
});
