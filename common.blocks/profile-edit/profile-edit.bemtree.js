block('profile-edit')(
    content()(function () {
        var user_data = this.data.user_data,
            content = [
                {
                    elem: 'header',
                    content: 'Редактирование профиля'
                },
                {
                    elem: 'avatar',
                    content: [
                        {
                            block: 'dropzone',
                            mix: { block: 'profile-edit', elem: 'dropzone' },
                            js: { url: '/api/user/image', current: user_data.avatar, size: 100 }
                        }
                    ]
                }
            ];

        var username = ['Введите имя', 'Введите фамилию'].map(function (v) {
            var input_value,
                name;

            if (v == 'Введите имя') {
                input_value = user_data.firstName;
                name = 'firstName';
            } else {
                input_value = user_data.lastName;
                name = 'lastName';
            }

            if (!user_data.firstName || !user_data.lastName) {
                input_value = '';
            }

            return {
                elem: 'username',
                content: [
                    {
                        block: 'input',
                        mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true },
                        mix: { block: 'profile-edit', elem: 'input' },
                        val: input_value,
                        name: name,
                        placeholder: v
                    }
                ]
            };
        });

        content.push(username, {
            elem: 'description',
            description: user_data.description
        });

        return content;
    })
);
