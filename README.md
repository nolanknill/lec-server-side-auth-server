# Installation
1. Create a database with the same name as in .env's DB_DATABASE
2. Install packages `npm install`
3. Copy .env.example to .env `cp .env.example .env` and fill in datbase credentials
4. Run migrations `npm run migrate`
5. Run seeds `npm run seed`
6. Start server `npm run dev`
7. Generate a secret key and add to .env's JWT_SECRET_KEY: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"`

## Available Endpoints

```
POST /users/register

Request body:
{
    name
    email
    password
}

Response: 
{
    message: "Successfully logged in",
    token
}
```

```
POST /users/login

Request body:
{
    email
    password
}

Response: 
{
    message: "Successfully logged in",
    token
}
```

```
GET /posts

Request Headers:
{
    Authorization: `Bearer {token}`
}
```

# MySQL Review

## MySQL Terms
### Table
A table is a collection of related data held in a table format within a database.


### Record
Group of fields within a table that are relevant to a specific entity.

### Columns
A set of data values of a particular type, one value for each row of the database

## CRUD 
- Create
- Read
- Update
- Delete

## How to CRUD in MySQL?

### READ
```
SELECT * FROM authors
```
- Associated endpoint: GET /authors

### CREATE
```
INSERT INTO 
    authors 
    (first_name, last_name, email) 
VALUES 
    ("Stephen", "Pinker", "spinker@steven.com"),
    ("Alice", "Munro", "amunro@steven.com");
```
- Associated endpoint: POST /authors

### UPDATE
```
UPDATE 
    authors 
SET 
    last_name="Munro" 
WHERE 
    author_id=5
```
- Associated endpoint: PUT /authors/:authorId


### DELETE
```
DELETE FROM 
    books 
WHERE 
    book_id=3
```
- Associated endpoint: DELETE /books/:bookId



## Blogging Platform

user
- id  Primary Key
- name

post
- id   Primary Key
- user_id   Foreign Key -> references another table's key / PK!
- title
- content


### Join Query
Gets all posts with the name of the user that posted
```
SELECT 
    post.id, post.user_id, post.title, post.content, user.name
FROM post 
    JOIN user ON user.id = post.user_id
```


## How to run migrations:

- `npx knex migrate:make <migration_file_name>`
    - Creates a migration file

- Write up function to run on migration

- Write down function in case of rollback migration
    - This should be the opposite action of the up function

- `npx knex migrate:latest`

- Need to rollback some changes?
    - `npx knex migrate:rollback`