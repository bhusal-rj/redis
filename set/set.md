# SET As Data Type

- A set is the collection of strings where each string is unique.
- Set will not have duplicate values.

## Set Operations
- **Union**      -    Returns all the unique elements present from all sets
- **Intersect**  -    Returns element that exist in all set
- **Diff**       -    Returns the element that exist on only one set

## Set Commands

- **SADD**           -      Adds a string to a set and Returns 1 if element is added or 0
- **SMEMBERS**       -      Returns all the strings stored in a set
- **SISMEMBER**      -      Returns if element exist in set else 0
- **SMISMEMBER**      -      Returns if multiple element exist within a set `smismember key member:1 member:2`. We get array of result
- **SUNION**         -      Perform union on set
- **SDIFF**          -      Perform difference on set
- **SINTER**         -      Perform intersection operation on set
- **SUNIONSTORE**    -      Perform union on set and store result in key `sunionstore destination key:1 key:2`
- **SDIFFSTORE**     -      Perform difference on set and store result in key
- **SINTERSTORE**    -      Perform intersection operation on set and store result in key
- **SCARD**          -      No of elements within a set
- **SREM**           -      Remove the element from the set
- **SSCAN**          -      Scan through all the elements in the set. `sscan key curosrID count value`



## Common UseCases
- Enforcing uniqueness of the values.
- Creating relationship between different records. `users#45:like`. Set of items liked by the user
- Finding command attributes between different thing.
- General list of elements where order doesnot matter.

#### Which items do users with the id 45 like?
--> `SMEMBERS users#45:like`

#### How many items user with 45 like?
--> `SCARD users#45:like`

#### Do user with ID 45 like the item with ID 123?
--> `SISMEMBER users#45:like 123`

#### Which items do both user 45 and user 32 like?
--> `SINTER users#45:like users#32:like`

