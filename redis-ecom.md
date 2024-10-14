# Ecommerce project that leverages the power of **Redis**

## Introduction
The first step before doing anything is connecting to the **Redis** either it may be in remote server or in the local PC. There is a file named `worker/client.ts` which establishes the connection with the redis host.

## Task 1 - **Prevent the multiple rendering of the Server Side Component Using Redis**
- Figure Out what page the user is trying to view.
- See if the page has already been rendered and stored in Redis.
- If not render and store in redis and send the response.

### Redis Design Methodlogy
1. Figure out what queries we need to answer.
2. Structure data to best answer those queries.
- Opposite methodology as compared to the SQL.

**What kind of data should we fetch?**
- We should fetch the html attribute associated with the page.


### Design Consideration
- What Kind of data are we storing?                -  **String**
- Should we be concerned about the size of data?   -  **There are no advantages of loading the dynamic pages as their content gets changed so it will be good to store the static pages. Assuming 100kb per pages so caching dynamic pages will not be possible as it will consume more resources. For static pages all pages are same to all users so caching 10 pages will only cost 1MB to all users**
- Do we need to expire the data?                   -  **Yes,after number of days**
- Key name policies
- Any business logic concerns


### Keys within the project

| Page Name | Address | Unique Route | Key |
| :--------     | :------                | :-----------      | :--                     |
| Privacy Page  | localhost:3000/privacy | /privacy          | pagecache#/privacy      |
| About Us Page | localhost:3000/about   | /about            | pagecache#/about        |
| Signin Page   | localhost:3000/signin  | /auth/signin      | pagecache#/auth/signin  |
| Signup Page   | localhost:3000/signup  | /auth/signup      | pagecache@/auth/signup  |
