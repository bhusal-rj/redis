# What is **Redis**?
- Redis is a database whereby data can be retrived using the queries.
- Redis is extremely fast because all data is stored in memory.
- Redis organizes all of its data in simple data structures.
- Redis is extremely simple.
- Redis processes are synchronous in nature.


## Redis Design Methodlogy
1. Figure out what queries we need to answer.
2. Structure data to best answer those queries.
- Opposite methodology as compared to the SQL.

## Design Consideration
- What Kind of data are we storing?                
- Should we be concerned about the size of data?   
- Do we need to expire the data
- Key name policies
- Any business logic concerns

## Key Naming
- Keys should be unique.
- Other engineer must understand about the goal of the key.
- Extremely common practise to use a ':' to separates the different parts of the key. Eg,  `users:posts:91` - **Posts associated with user id 91**
- Now a days using # for unique identifier is prefered; `users:posts#91`

## Handling Concurrency


## Pipelining
- When we need to query redis to execute or perform multiple actions it causes the certain delay.
`Client --> Server process --> Response --> Client`
- Suppose we need to query the redis to **GET** all the items within the product has having the key of the items of size 1000.
- One scenario would be to use the loopover all the 1000 ids and call `HGETALL` to fetch the relevant data but it introduces certain delay so instead of sending
the command one by one we can batch out with the help of pipelining.
- `await Promise.all(id=>client.HGETALL(id))` can be used in node-redis



# What are Commands?
### Redis supports different command to query or insert the data within the memory. Redis supports following data types,
- String
- List
- Hash
- Set
- Sorted Set
- Bitmap
- Hyperloglog
- JSON
- Index

### The command associated with the **String** data type are **SET** , **GET** , **Append** etc...
`SET message 'hi there'`
- Redis interprets the message as the key and places the value hi there as the value of the key message

`GET message`
- Finds the value of the key message

## Take the reference of [Strings](strings/strings.md) for the String related commands.
## Take the reference of [Numbers](/numbers/numbers.md) for the Number related commands.
