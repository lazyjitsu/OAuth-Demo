Important: Sometimes we use posts to do a get! This reason is that in the body, we can provide MORE options and get doesn't check the body IMU. Such requests are NOT really part of the REST pattern cause we're doing a POST to do a read/GET. The HTTP verb doesn't match up. GET requests don't allow us to pass data in the body of th request. 




E.g.

```
https://api.spacexdata.com/v4/launches/query
# returns the following and notice the rocket property
{
    "docs": [
        {
            "fairings": {
                "reused": false,
                "recovery_attempt": false,
                "recovered": false,
                "ships": []
            },
            "links": {
                "patch": {
                    "small": "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
                    "large": "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png"
                },
                "reddit": {
                    "campaign": null,
                    "launch": null,
                    "media": null,
                    "recovery": null
                },
                "flickr": {
                    "small": [],
                    "original": []
                },
                "presskit": null,
                "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
                "youtube_id": "0a_00nJ_Y88",
                "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
                "wikipedia": "https://en.wikipedia.org/wiki/DemoSat"
            },
            "static_fire_date_utc": "2006-03-17T00:00:00.000Z",
            "static_fire_date_unix": 1142553600,
            "net": false,
            "window": 0,
            "rocket": "5e9d0d95eda69955f709d1eb",
```

We can now go to the rockets collection and get one rocket  doing

```
From:
https://api.spacexdata.com/v4/rockets/{{id}}
To:
https://api.spacexdata.com/v4/rockets/5e9d0d95eda69955f709d1eb
```


Post query example. Make sure postman set to POST and to JSON:
```
https://api.spacexdata.com/v4/launches/query
Body:
{
    "query":{},
    "options": {
        "populate": [
            "rocket"
        ]
    }
}
```

Or more specific query:
```

{
    "query":{},
    "options": {
        "populate": [
            {
                "path": "rocket",
                "select": {
                    "name":1
                }
            }
        ]
    }
}


# returns
{
    "docs": [
        {
            "fairings": {
                "reused": false,
                "recovery_attempt": false,
...
            "rocket": {
                "name": "Falcon 1",
                "id": "5e9d0d95eda69955f709d1eb"
            },
            }
        }
    ]
}
```


To make requests from our Node API, we'll be installing `axios`

```
npm i axios
```

Flattening payload demo:
function duplicate(n) {
    return [n,n]
}
[1,2].flatMap(duplicate);
// [1,1,2,2]

### Pagination

**Dealing with space X pagination.**

When we get our response, we're only getting the first ten launches. This is because space X is using pagination and thus returning the first page of data which is 10 launches per page. Excerpt from the bottom of the response

```
    "totalDocs": 205,
    "offset": 0,
    "limit": 10,
    "totalPages": 21,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
```

Paginated APIs always let you specify which page you want to view. An excerpt from our postman query:

```
{
    "query":{},
    "options": {
        "page":2,
        "populate": [
            {
                "path": "rocket",
                "select": {
                    "name":1
                }
            }
        ]
    }
    ...
}
```
We can also dictate how many documents per page. E.g. 20 instead of 10
```
    "options": {
        "page":2,
        "limit":20,
        "populate": [
            {
                "path": "rocket",
                "select": {
                    "name":1
                }
            }
        ]
    }
```

Since we need everything, even better is turning off pagination using "pagination": false instead of the page & limit options.

**Dealing with our own APIs pagination**

We need to have a way to limit how much data we respond back to the client. A common way of doing this pagination is by passing what's called the query parameter into our GET requests. E.g.

```
http://localhost:8100/v1/launches?param=value

# or more specifically, say limit 50 launches 

http://localhost:8100/v1/launches?limit=50

```

If we had 140 launches, it would require three pages that each have 50 or less launches to respond with all of the data, so we coul navigate from pag eto page by adding more more parameter. E.g.

```
http://localhost:8100/v1/launches?limit=50&page=1
```


