# HyperLogLog
- Algorithm for approximately counting the number of unique elements.
- Similar to set, but doesnot store the elements.
- It doesnot actually store data so no matter how many elements are added it has size of 12kb

## Command
- PFADD    -     Add key to the HyperLogLog. If Key already present we get 0 else 1
- PFCOUNT  -     Get the approximate count of the number of times the key has been added to HyperLog
