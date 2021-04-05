## Setting Up Authentication

This app uses Supabase's built in Authentication system and tables and a `public.users` table that contains publically available user data into the app.

### Enable Authentication In Supabase

In your supabase admin, go to authentication and switch it on. There should be a switch on the authentication page that enables you to do this.

All new users are inserted into a table called auth.users, this table isn't accessible through the supabase library, and has built in security that makes it impossible for anyone besides a database admin, or the signed in user, to access anyone's info but their own.

### Create a `public.users` Table

One of the key issues we're going to face in this application, as in any application, is security. We're going to need to make sure users of our application can't get ahold of other users private data. To do this, we're going to create a public user table (public.users) that contains info other users can see.

You can create the table with this SQL command in the Supabase SQL tool.

```sql
create table public.users (
  id            uuid not null primary key,
  email         text,
  display_name  text,
  description   text,
  PRIMARY KEY (id)
)
```

Note: we're NOT autogenerating a UUID as the auth.users table already does this- it just contains the same id so we can match tuples between the two.

### Setup triggers when user is created

Since we're going to have two tables for our users (a public one, and a private one) we should setup a PGSQL function, and a trigger.

This function will be triggered whenever a new user is added to our private table, and will copy over the user's ID, and their email to the public table, as this should be available to everyone.

This is also documented in the supabase docs- this is a slightly modified version of that PL/pgSQL. (REFERENCE: Supabase Docs)

```sql
-- create a function to copy new users over to the public.users table
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
