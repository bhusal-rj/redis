# Redis Modules
- Additional advanced data structure.
- Managing all the Redis modules is always tedious so we use Redis Stack to run redis modules.
`REDIS Modules ---> Module Load ---> Redis Core`


## Quering
- Gives the exact result asked for.

## Searching
- Gives the result that best answer the question.

## Redis Stack
- Redis stack includes several modules by default.
- RediSearch
- RedisJSON
- RedisGraph
- RedisTimeSeries
- RedisBloom


## RediSearch
- In Core Redis data structure we cannot directly use the filtering criteria like searching with conditions.

#### Create an index. (FT.CREATE)
- Find all the keys that start with items#.
- Out of those record some info about the fields like name color and price.

#### Run a query. (FT.SEARCH)
- Use the index find items with a particular name color and price

Creating a hash
```
  HSET cars#a1 name 'fast car' color red year 1950
  HSET cars#b1 name 'car' color red year 1960
  HSET cars#c1 name 'old car' color blue year 1970
  HSET cars#d1 name 'new car' color blue year 1990
```

Creating index
`FT.CREATE idx:cars ON HASH PREFIX 1 cars# SCHEMA name TEXT year NUMERIC color TAG`
- idx:cars                 -       Name of the index.
- ON HASH                  -       Specify the kind of records we want to seach. Options are HASH or JSON.
- PREFIX 1 cars#           -       Find all the keys that starts with 'cars#' and index them and 1 is number of prefixes.
- SCHEMA key type          -       Fields that should be indexed for each hash.

### Types
- NUMERIC    - Numbers
- GEO        - Geographic cordinates
- VECTOR     - Similarity queries
- TAG        - Exact string lookup
- TEXT       - Fuzzy string

- () - text
- {} - tag
- [] - numbers

Running a query to find name of fast car
`FT.SEARCH idx:cars '@name:(fast car)'`

Running a query to find car of color blue
`FT.SEARCH idx:cars '@color:{blue}'`

Car between year 1950 and 1970
`FT.SEARCH idx:cars '@year:[1955 1980]'`


## Tag Queries
- @color{blue}        -    Color equal to blue.
- -@color{blue}       -    Color not equal to blue.
- @color{red|blue}    -   Color equal to red or blue.
- @color {light\blue} -  Escape spaces with \

## Text queries
- Stop words are removed (a, the , or , and such words). `a fast,fast car!!!` -> `[fast,fast,car]`
- Stemming is used to reduce words to base form. Eg, fasting to fast, fastly to fast, fasts to fasts etc.
- @name:(fast car)    -     Name contains 'fast' and 'car'
- @name:(fast | car)  -     Name contains 'fast' or 'car'
- -@name:(fast)       -     Name doesnot include 'fast'

## Fuzzy Searching
- We can go upto three character mismatch.
- FT.SEARCH idx:cars '@name:(%car%)' - Handle 1 character mismatch.
- We can add upto 3 % to include 3 character mismatch.
- We can use `@name:(ra*)` there must be atleast two characters before * sign
