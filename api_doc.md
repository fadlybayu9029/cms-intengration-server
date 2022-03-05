# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /news`
- `POST /news`
- `PUT /news/:id`
- `DELETE /news/:id`
- `GET /news/:id`

&nbsp;

## 1. GET /news

_Response (201 - Created)_

```json
[
    {
        "id": 1,
        "title": "Fifa and Uefa suspend all Russian clubs and national teams",
        "content": "The world and European football governing bodies said they would be banned until further notice.",
        "imageUrl": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/AE50/production/_123442644_hi074198049.jpg",
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2022-03-01T10:51:11.208Z",
        "updatedAt": "2022-03-01T10:51:11.208Z"
    },
    {
        "id": 2,
        "title": "Neil Diamond's song catalogue including hit Sweet Caroline bought by Universal Music Group",
        "content": "The 81-year-old singer has sold more than 130 million records worldwide throughout his career spanning 60 years - making him one of the best-selling musicians of all time.",
        "imageUrl": "https://e3.365dm.com/22/02/1600x900/skynews-neil-diamond-diamond_5689737.jpg?bypass-service-worker&20220228142317",
        "userId": 3,
        "categoryId": 2,
        "createdAt": "2022-03-01T10:51:11.208Z",
        "updatedAt": "2022-03-01T10:51:11.208Z"
    }
]
```


&nbsp;

## 2. POST /news

Request:

- body:

```json
{
        "title": "String",
        "content": "String",
        "imageUrl": "String",
        "userId": "Integer",
        "categoryId": "Integer"
    }
```

_Response (201 - Created)_

```json
{
    "msg": "Create News Sucess",
    "News": {
        "id": 6,
        "title": "jojojojojojo",
        "content": "wmdwmdkmdkwmdk",
        "imageUrl": "demdkemdkemdkemkemdkem",
        "userId": 1,
        "categoryId": 2,
        "updatedAt": "2022-03-01T14:36:01.191Z",
        "createdAt": "2022-03-01T14:36:01.191Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": "Title cannot null or empty"
}
OR
{
    "msg": "Content cannor null or empty"
}
```

&nbsp;

## 3. PUT /news/:id

Description:
- Update news based on id

Request:

- body:

```json
{
        "title": "String",
        "content": "String",
        "imageUrl": "String",
        "userId": "Integer",
        "categoryId": "Integer"
    }
```

_Response (200 - Ok)_

```json
{
    "msg": "Update Done",
    "previous": {
        "id": 4,
        "title": "wow",
        "content": "kkokokokokoko",
        "imageUrl": "lalalalalala",
        "userId": 2,
        "categoryId": 3,
        "createdAt": "2022-03-01T13:44:31.143Z",
        "updatedAt": "2022-03-01T15:05:26.413Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": "Title cannot null or empty"
}
OR
{
    "msg": "Content cannor null or empty"
}
```

_Response (404 - Not Found)_

```json
{
    "msg": "News Id not found"
}
```

&nbsp;

## 4. DELETE /news/:id

Description:
- Delete news by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "msg": "jojojojojojo has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
    "msg": "News Id not found"
}
```

&nbsp;

## 5. GET /news/:id

Description:
- Find news based on id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 3,
    "title": "Anti-war sentiment grows in Russia despite govt crackdown",
    "content": "MOSCOW -- As Russian troops were closing in on the Ukrainian capital, more and more Russians spoke out Saturday against the invasion, even as the government's official rhetoric grew increasingly harsher.",
    "imageUrl": "https://s.abcnews.com/images/International/WireAP_68ede5d90a6e4224b9025305df0823c2_16x9_992.jpg",
    "userId": 2,
    "categoryId": 3,
    "createdAt": "2022-03-01T10:51:11.208Z",
    "updatedAt": "2022-03-01T10:51:11.208Z"
}
```

_Response (404 - Not Found)_

```json
{
    "msg": "News Id not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
