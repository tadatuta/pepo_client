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

        var username = ['Введите имя', 'Введите фамилию'].map(function (v, i) {
            var input_value,
                curr_index = i + 1,
                id;

            if (v == 'Введите имя') {
                input_value = user_data.firstName;
                id = 'firstName';
            } else {
                input_value = user_data.lastName;
                id = 'lastName';
            }

            return {
                elem: 'username',
                content: [
                    {
                        block: 'input',
                        mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true, field: id },
                        mix: { block: 'profile-edit', elem: 'input' },
                        tabIndex: curr_index,
                        val: input_value,
                        placeholder: v
                    }
                ]
            };
        });

        content.push(username, {
            elem: 'description',
            description: user_data.description
        }, {
            elem: 'buttons'
        });

        return content;
    })
);
