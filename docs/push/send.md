## Отправка уведомлений.

Данный метод позволяет отправить уведомления, согласно списку переданных клиентов.

Строка запроса:  
`POST api/push/send`

### Параметры
|Параметр|Описание|Примечания|
| :-------------: |:-------------:| :----:|
|`title` | Заголовок уведомления | *[обязательное поле]* |
|`description`       | Текст уведомления      | *[обязательное поле]* |
|`userList`           | `Array` Список пользователей, полученный методом `clients/get`    | *[обязательное поле]* |

### Пример запроса
`POST api/push/send

```javascript
{
    title: 'HelloWorld!'
    description: 'Hi, Client. It`s ProDeliveryApp'
    userList: [
      {
        client_phone: "+79994546479",
        token: "rt3hb45j345j3h45v6j345hv6j345hv6",
        os: "android",
        _id: "60547ef1a1f92cfdcda52eae"
      }
    ] 
}
```

### Пример ответа
`200 OK`

```json
{
    "response": {
        "msg": "Отправлено",
        "push_count": 1,
        "send_to": [
            {
                "client_phone": "+79994546479",
                "token": "rt3hb45j345j3h45v6j345hv6j345hv6",
                "os": "android",
                "_id": "60547ef1a1f92cfdcda52eae"
            }
        ]
    }
}
```
___________
Разработка: [`Vunderkind (Стрелов Игорь)`](https://github.com/VunderkindMedia) и [`Doc (Дегтяренко Денис)`](https://github.com/docokha)
