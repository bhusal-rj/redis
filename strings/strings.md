# Strings related commands within **Redis**

## Getters(Retrive a value)

- MGET - **Get multiple values associated with the multiple keys**
#### Kind of same commands
- GET  
- GETDEL    -   **Gets the value of the key and deletes the key**
- GETEX     -   **Get the value associated with the key and set the timer**

#### Not super obvious usecases
- SUBSTR
- GETRANGE   -  **Get the range of character associated with the key**
- LCS


## Setters(Set a value)
- GETSET
- DEL     -  **Delete the key**
- STRLEN  -  **Length of the string value**

#### Kind of same command
- SET
- SETNX **Depricated**
- SETEX **Depricated**

#### Kind of same command
- MSET     -  **Multiple setting at the same time**
- MSETNX   -  **Multiple setting at the same time. Will not set if one of the key already exist**

#### Not super obvious usecases
- APPEND
- SETRANGE  -  **Sets the value from the offset**
