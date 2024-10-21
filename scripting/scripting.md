# Redis Scripting
- We can write the LUA script as a part of scripting and redis runs LUA script and provides the result.

## When to use Script
- Limiting the amount of data exchanged between server and redis.
- Solving some concurrency issues
- Minimizing the number of round trips between server and redis.

## Downside of Script
- Keys must be known ahead of time.
- Tough to test script
- Loss of language feature like type checking in TS.
- Another language to deal with LUA.

**Server** ---> Write the script ----> Load the script with `SCRIPT LOAD 'script'` command ----> Redis stores the script so can be ran in future then sends back the script id
**Script id** ---> Hold onto script id

- Once the script is loaded we can execute the script with `EVALSHA ID`. Redis runs the script,gets the return value and send value back to server.

`SCRIPT LOAD 'return 1+1'` -- Returns back the id
`EVALSHA <ID> 0`             -- Provides the result

- LUA script also accepts the arguments to get argument we can use ARGV[1]. Argv is global variable and should be provided as string.
- `SCRIPT LOAD 'return 1 + tonumber(ARGV[1])'`
- `EVALSHA ID 0 '1' '2' '3'` 
- Here 0 is number of keys provided to the Redis to distingush which is key and which are arguments passed 


## Providing key list
- Running redis command in lua we can use `return redis.call('GET','color')`
- So there is the issue with the above command as we are using the color as the key writing the scripts won't be feasible.
- Redis needs to know exactly which keys we want to access ahead of time.
### Always redis needs to know which keys we want to access ahead of time because it maintains the array of the keys in the lua script.
- To access key we use `KEYS[1]`

`script load 'return redis.call("GET",KEYS[1])`
`evalsha <ID> 1 key_name`
