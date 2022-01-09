# Generic ORM TypeScript SQLite
**Generic ORM TypeScript SQLite** a simple backend application for CRUD operations on Sqlite using typescript generics.


## How to run
I assume that you have already Node.js & Yarn installed.
1. Running backend<br />
    ```yarn dev```<br />
    The server will be running on port 3333.<br /><br />

2. Testing<br />
    ```yarn test```


3. API endpoints<br />
    GET ```localhost:3000/students``` fetch all students.<br/>
    POST ```localhost:3000/students``` insert a new student.<br />
    POST ```localhost:3000/students/:id``` update a single student. <br />
    DELETE ```localhost:3000/students/:id``` delete a single student. <br />
    GET ```localhost:3000/students/count``` fetch the number of students. <br />
