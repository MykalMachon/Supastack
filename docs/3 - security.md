## Securing Our Tables

Now that we have authentication, and our database setup, we should create row-level security rules or "policies". These lock down specific rows in each table to only allow CRUD actions from users with the right level of access.

### Example of the Issue

A practical example of why this Security and row-level security is neccesary, is that without this, users can edit everyone's posts through the API, not just their own.

For example: if we run the code:

```javascript
const supabase = useSupabase(); // imagine this is the supabase client

// This would delete someone elses account- which you shouldn't be able to do
supabase.from('users').delete().match('email', 'eq', '<someones_email>');
```

users would be able to delete other users accounts... which we definitely don't want!

### Row Level Access for Posts

We only want users to be able to see other users posts if they're public (aka have been published by the user). This can be achieved using row-level security (REFERENCE: Row Level Security)

```sql
-- enable open row-level security for posts that aren't drafts
alter table posts enable row level security;

create policy "Public posts are viewable by everyone."
  on posts for select
  using ( is_public = true );

create policy "Users can only create their own posts."
  on posts for insert
  with check ( auth.uid() = user_id );

create or replace policy "Users can only update their own posts."
  on posts for update
  using ( auth.uid() = user_id );

create policy "Users can only delete their own posts."
  on posts for delete
  using ( auth.uid() = user_id );

```

### Row Level Access for Likes

We only want users to be able to create, edit, and delete their own likes. However, they should be able to see everyone else's likes at all times.

```sql
-- enable open row-level security for likes
alter table likes enable row level security;

create policy "All likes are viewable by everyone."
  on likes for select
  using ( true );

create policy "Users can only create their own likes."
  on likes for insert
  with check ( auth.uid() = user_id );

create policy "Users can only update their own likes."
  on likes for update
  using ( auth.uid() = user_id );

create policy "Users can only delete their own likes."
  on likes for delete
  using ( auth.uid() = user_id );

```

### Row Level Access for Users

This is where things get particularly interesting, as we need to make sure that users are the only people who can edit their own info.

Supabase makes this super easy with their built in auth table and functions (REFERENCE: Supabase Auth)

```sql
-- enable open row-level security for users
alter table users enable row level security;

create policy "Users info is viewable by everyone."
  on users for select
  using ( true );

create policy "Users can insert their own user info."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update their own user info."
  on users for update
  using ( auth.uid() = id );

create policy "No user should be able to delete their profile."
  on users for delete
  using ( false );
```

### Confirming Row-Level Policies were created

We can do a number of SQL queries to ensure that our rules are setup properly! we can also try to edit posts that aren't ours in the app to see how things go!

Here's a query that prints out our row-level policies:

```sql
select * from pg_policies
```

after we run this, we can see all the policies we've created. Double check that you have all your policies in place, and let's move on to the next step.
