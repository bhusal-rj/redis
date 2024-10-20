# List
- Always try to avoid list as possible
- Implemented as doubly linked list.
- Often used for time series data.


## List Commands
- LPUSH          -   "Push the item to a list from left side"
- RPUSH          -   "Push the item to the right of the list"
- LLEN           -   "Get number of items present within a list"
- LINDEX         -   "Get the item at the given index in list"
- LRANGE         -   "Get the range of items `LRANGE key start end` -1 is end"
- LPOS           -   "Find the index of value within the key".`LPOS key index rank number count number maxlen number`
`Rank specifies the number th instance to get LPOS key index rank 2 means get the 2nd index`
`Count specifies the number of index of the given value. Count 2 means give back the two indexes of the number`
`Maxlen specifies how many records to look for. Max len 10 means look only for first 10 items`

- LPOP           -   "Removea and return some numbers from the left side. If no number remove first"
- RPOP           -   "Remove and return last number from the right side"
- LSET           -  "Change the value of specific index. `LSET key 0 26` Change the first value to 26"
- LTRIM          -   "Remove all elements outside of this range. `LTRIM key start end`. Removes all items except values from start to end"
