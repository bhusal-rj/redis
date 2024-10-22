# Handling the Concurrency in **Redis**
- Use an atomic update commands(like HINCYBY, HSETNX). They allow to update directly from **Redis**.
- Use a transaction with the watch command.
- Use a lock
- Use a custom LUA update script

## Transaction
- Groups together one or more commands to run sequentially.
- Similar to pieplining, but with big difference.
- Transaction cannot be undone or rolled back.
- With transaction the commands get executed one after another. 


## Issue with Watch Command
- More number of commands will be failed.

```
  MULTI - Start a new transaction
  SET color red
  SET count 5
  EXEC - Run all the queued command
```

### Watch with transaction
```
  WATCH color
  MULTI
  SET color blue
  SET count 5
  EXEC
```
- If any other process tries to modify the value of color running exec will throw an error as we are watching the key color

### Isolated connections for transaction
```
  WATCH color
  GET color
  GET count
  MULTI
  SET color red
  SET count 5
  EXEC
```
- If any process tries to modify the color than the exec command here will not be successful as color is being watched.

