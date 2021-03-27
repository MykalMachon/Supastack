# Security Setup

Now that we have authentication, and our database setup, we should create row-level security rules. These lock down specific rows in each table to only allow CRUD actions from users with the right level of access.

## Example of the Issue

A practical example of why this Security and row-level security is neccesary, is that without this, users can edit everyone's posts through the API, not just their own.

For example: if we run the code:

```javascript
const supabase = useSupabase(); // imagine this is the supabase client
```

## Row Level Access for Posts, Likes, and Comments

## Row Level Access for Users

## Confirming Row-Level Access works!

We can do a number of SQL queries to ensure that our rules are setup properly! we can also try to edit posts that aren't ours in the app to see how things go!

### SQL Queries

Here's a query that prints out our row-level access rules:

```sql

```

### Editing Posts we Shouldn't be Able To
