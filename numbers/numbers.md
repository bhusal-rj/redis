# Working with numbers in **Redis** is similar to working with the strings

## Basic Commands for working with **Numbers**

- SET          -  **Setting up the value**
- GET          -  **Getting the value**
- MGET         -  **Get multiple values associated with the different keys**
- MSET         -  **Set multiple values to the multiple keys**
- DEL          -  **Deleting the values associated with the key**

- DECR         -  **Decrease the numeric value associated with the key**
- DECRBY       -
- INCRBYFLOAT  -    
- INCRBY       -
- INCR         - 


### `SET age 20`
- Redis stores the number as the string inside it
- When performing above operation if number **Redis** performs the operation else throws an index out of range
