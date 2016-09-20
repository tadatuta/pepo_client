# Tweet-list

Используется для сортировки данных для блока tweet и дальнейшего вывода его на страницу.

## Обзор блока

Получает данные с сервера и сортирует/передает необходимые блоку tweet.

### Поля блока
|Поле|Тип|Описание|
| ---- | --- | -------- |
| tweets | <code>`json`</code> | Принимает необходимый тип записей |


## Описание блока

### Поле 'tweets'

Получает данные о пользователях и их записях в виде:
```js
{
    tweets: [
        tweets: [ { Object }, { Object } ],
        users: [ { Object }, { Object } ]
    ]
}
```

### Методы блока

### Метод `getTweets()`

Используется для получения массива записей. При успешном ajax-запросе выводит блок `tweet-list` в указанном котексте.

```js
{
    getTweets: function (block, rtn_tweets) {
        $.ajax({
        url: window.config.frontend_server + '/get-' + rtn_tweets,
        success: function (data) {
        BEMDOM.update(block,
            BEMHTML.apply(data));
        }});
    }
}
```

### Подгрузка по скроллу

Подгрузка массива записей на страницу `feed`. Выводит 10 последних записей или, если их нет - блок, указывающий на отсутствие записей.

```js
var nothing = {
        block: 'text',
        mods: { nothing: true },
        content: 'На данный момент больше ничего нет'
    },
    inProgress = false;
this.bindToWin('scroll', function () {

    this.unbindFrom('scroll');
    if ($(window).scrollTop() + $(window).height() >= $(document).height() + 20 && !inProgress) {

        inProgress = true;
        $.ajax({
            url: window.config.frontend_server + '/get-feed/' + last_time,
            success: function (data) {
                if (!body) {
                    BEMDOM.append(that.domElem,
                        BEMHTML.apply(nothing));
                } else {
                    BEMDOM.append(body.domElem, data);
                }
            }
        }).fail(function () {
            BEMDOM.append(that.domElem,
                BEMHTML.apply(nothing));
        });
    }
});
```