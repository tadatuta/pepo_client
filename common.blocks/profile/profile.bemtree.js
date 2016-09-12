block('profile')(
    content()(
        function () {
            var data = this.data.profile_data;
            return [
                {
                    elem: 'header',
                    url: data.avatar,
                    username: data.lastName + ' ' + data.firstName,
                    login: data.displayName,
                    description: data.description
                },
                {
                    elem: 'body'
                },
                {
                    elem: 'optional'
                }
            ];
        }
    )
);
