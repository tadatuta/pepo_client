# profile-edit

Предоставляет пользователю возможность отредактировать некоторую информацию о себе.

## Обзор блока

Блок profile-edit предоставляет пользователю возможность отредактировать следующие данные о себе:
- имя и фамилию;
- дополнительную информацию (поле "О себе");
- аватар.

### Поля блока

| Поле | Тип | Описание |
| ---- | --- | -------- |
| user_data | <code>`json`</code> | Для хранения/передачи данных о пользователе |

## Описание блока

### Поле `user_data`

```js
{
    user_data:{
        firstName: answer.firstName, //имя пользователя
        lastName: answer.lastName, // фамилия пользователя
        description: answer.description, // дополнительная информация
        avatar: answer.avatar // аватар
    }
}
```

## Кнопки блока

### Кнопка `Сохранить(profile_edit__save)`

При нажатии на кнопку картинка и все данные из input'ов передаются ajax-запросом на сервер и приложение возвращает
пользователя к странице просмотра профиля.

```js
$.ajax({
    url: window.config.api_server + '/api/user',
    method: 'POST',
    data: {
        avatar: avatar,
        firstName: firstName_val,
        lastName: lastName_val,
    },
    dataType: 'json'
}).done(function () {
    document.location.href = window.config.frontend_server + '/profile';
});
```

### Кнопка `Назад(profile-edit__back)`

Возвращает пользователя на страницу просмотра профиля без сохранения данных.