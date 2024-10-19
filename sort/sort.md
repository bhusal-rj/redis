# Working with Relational data in Redis
- There are two ways of loading relational data in redis

### Create a simple pipeline with bunch of HGetAll
### Use SORT command in very clever way

## Terminologies
- **SORT** operates on the members of a sorted set not the scores!.
- **SORT** refers to these members as scores!!. Members are the scores in SORT.
- To sort all the members alphabetically we need to use `SORT key alpha`.
- Limit and offset can be used to limit the result in **SORT**.

### More Background
- Probably the trickiest command to understand.
- Used in sets, sorted sets and lists.
- Calling this command SORT is misleading.

| ID   | Title | Year Published |
| :--   | :--       | :--       |
| good  | Good Book | 1950      |
| bad   | Bad Book  | 1930      |
| ok    | Ok book   | 1940      |

## What if we had to get the id of the book sorted by the year published.
#### List out the ID of each book and Sort by the year published.

- Step 1:- Create the hash of all the books:good,books:bad and books:ok.
  ```
  hset books:good title 'Good Book' year 1950
  hset books:bad  title 'Bad Book'  year 1930
  hset book:ok    title 'Ok Book'   year 1940
  ```
- Step 2:- Create the sorted sets for the like as well
```
zadd books:like 40 ok 999 good 0 bad
```

- Step 3 :- `books:*->year`
  Here * represents all the members of the sorted set. So it will look for the keys `books:ok,books:good,books:bad`.
  **->** Means that after finding the key sort the new set with the value after **->** which is year
  Now after sorting year is removed and the member is returned


## List the title of the book sorted by the year published.
`Sort books:like by books:*->year get books:*->title`
- By sorts by the value after **->** and remove the value and get replaces the member by the value after **->**
- Get can be applied as many as time we want which appends the result i.e, provided the multiple result.
- To retain the original member we can use `get #`
- By with non-key member will cause no sort
