# Streams
- Kind of like a cross between list and a sorted set.
- Used for commuication between different server.
- Most useful with consumer groups.

**Message Producer** ----> Redis Stream ---> **Message Consumer**
- Message is produced by the producer and sent to the Redis stream.
- Redis adds the message with the unique id generated from the UNIX timestamp and stores the message.
- Provides the message whenever the consumer asks for the message.
- Similar to the message queue.

- Send an email to 'as@gmail.com' ---> Server(Queue up a job and pass to the message stream) ---> Redis stream stores the message
                                                                                                              |
                                                                                                              |
                             Third party email <----- Worker(Waits for an element to be added to stream <-----|


## Commands
- XADD    -     Adds the key to the stream.                         `XADD key * field value field value`
Here * represents to have redis generate an id for us in unix timestamp

- XREAD  -      Reads the message from the stream without deleting.  `XREAD STREAMS key timestamp(to tell after)`
`XREAD COUNT 2 STREAMS key 0-0` ---> Read 2 value from the key without deleting the key.
`XREAD BLOCK 3000 STREAMS key 0-0` ---> Wait for 3000ms if no messages are available.(Can be used as distributed lock as well)
- Returns even if found one record. 

`XREAD BLOCK 3000 COUNT 2 STREAMS KEY $`   -    Represents right now on key

### Important Concept
`XREAD COUNT 3 BLOCK 3000 STREAMS new_messages $`
- Intenstion here is to get the 3 messages after now but as the default behavior of XREAD whenever a single message occurs blocking operation will end and considering certail delay in processing the other two messages will be ignored so inorder to get these messgaes we need to ensure to use the id of the message recevied as the timestamp.


- XRANGE -    Similar to XREAD with starting and ending timestamp.`XRANGE key startingat endingat count number`
`XRANGE key starting_time_stamp-0 ending_time_stamp-0 streams `
- Time range in xrange is inclusive to make it exclusive we need to add (

### Issues with Xrange
- The message will be delivered to all consumers which might be unwanted behavior.
- What if the stream crashes after getting the messages.

### Consumer Groups
- All consumer in a group get a unique name.
- Redis keeps track of where it sent each message to which consumer.
- Redis mains the stream of messages sent to consumer and whether they have acknowledged or not.
- Redis keeps track of what last delivered message is.

`XGROUP CREATE key name_of_group timestamp mkstream`
- we can use $ or any timestamp so that if the stream exist, only handle messages added from this point on or after that point on.
- mkstream --> only make the stream if it doesnot exist

`XGROUP CREATECONSUMER key name_of_group name_of_consumer`

`XINFO GROUPS key`                 --> List info for all consumer groups tied to a given stream
`XINFO CONSUMERS key group_name`   --> List the consumers tied to a consumer group
`XREADGROUP GROUP group_name worker_name count number block ms streams key >`
- GROUP group_name    -    **Specify the name of the group**
- worker_name         -    **Name of the worker we are reading as**
- COUNT 1             -    **Number of records we are reading as**
- STREAMS fruits > | (timestamp)    -    **Only messages that were not deliverd to any other consumer group**

`xreadgroup group fruits-group worker-1 count 1 streams fruits >` 
- When worker-1 reads the message with the above command the redis stream server maintains a log named **I sent the message with the id to worker-1**
- Now woker-1 has ownership of that message. Worker needs to sent the acknowledgement to the redis server that it has processed the message

`XACK key group_name message_id` ---> Sends the acknowledgement.
- If before sending ack if the worker has been crashed then we can use

`XAUTOCLAIM key group-name own-worker-name pending_duration id`
- Claims messages that have been pending with other works for too long.
- pending duration is the look for unacknowledged messages that have been pending for **pending_duration**
