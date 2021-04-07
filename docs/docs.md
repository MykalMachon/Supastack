# Supastack: Creating a Blog App with Supabase

I've been hearing about Supabase from friends and fellow web developers for awhile, so when I read the outline for this term project I was excited to get to work on a project that utilized this new and interesting database.

## Introduction

### Outcomes & Skills

This tutorial aims to provide a solid intro to the following technologies:

1. **Supabase:** This is at the core of our app, and will be used for authentication, user management, and database management.
2. **PostgreSQL:** Supabase is built ontop of PostgresSQL, and we'll be writing queries & creating tables with it.
3. **PL/pgSQL:** We'll use this database programming language to create a trigger, and a function to automate user creation.
4. **Indexing:** We create an index to help us query one of our tables in PostgreSQL
5. **Netlify:** we'll use Netlify to deploy your instance of the Supastack application, so you'll get a passing knowledge!

When you're done following this tutorial you will have a hosted, minimal blogging platform, powered by Supabase, and hopefully a better understanding of how to make your own apps with Supabase.

### Prerequisites

Before we hop into things, there's a few pieces of software you'll need to have installed, and setup before we get going.

1. **Node.js & Node Package Manager (or NPM):** This allows us to install our dpenedencies, and run our app locally.
2. **Git version control:** This will be used to "clone" the example app I've built out called "Supastack"
3. **An internet connection:** We'll be installing dependencies, hosting websites, and accessing the supabase website.
4. **A Github Account:** Supabase requires it's users to signin with Github so you'll need an account.

Once these are all installed, we should be good to go!

### Signup for Supabase

Go to supabase (located at https://supbase.io) and signup for an account. You can do this by clicking the "sign in" button and then clicking the github Oauth button.

Once you're into your account, we can create a project which will act as a container for our auth system, and our database. Name your project whatever you'd like (Supastack-clone works!), and you can set anything as your database password and region as it won't be relevant to what we're doing in this tutorial.

Once everything's provisioned and setup, move to the next step!

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

## Database Setup

This document outlines all the SQL commands we need to setup the rest of the tables in the database.
For the sake of time, and considering I developed Supastack for this tutorial, these three tables should be enough to illustrate some core database concepts.

### Posts Table

This table represents each one of the posts that will be made on the platform.

```sql
create table public.posts (
  id          uuid DEFAULT uuid_generate_v4(),
  title       text,
  content     json,
  created_at  timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at  timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_public   boolean default 't',
  user_id     uuid references public.users not null,
  PRIMARY KEY (id)
)
```

### Likes Table

This table contains all likes on posts- this way users can only like a post once, etc, etc.

```sql
create table public.likes (
  id        bigint generated by DEFAULT as identity primary key,
  post_id   uuid references public.posts not null,
  user_id   uuid references public.users not null
)
```

These are the primary tables we'll need for the rest of the tutorial.

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

## Indexing the Likes Table

Since we're often going to be looking up likes by their post ID, we have an opportunity to create an index on the post_id column in likes.

To create that index, use the SQL command below (REFERENCE: Postgres SQL)

```sql
-- This creates an index on the likes table when looking up by post_id
CREATE INDEX index_likes_by_post_id
ON likes(post_id)
```

Once you have some data in your database, you'll be able to run the following command to see how the query runs (you should see that the index is used)

```sql
-- use this to see what the query does before and after the lookup
EXPLAIN SELECT *
FROM likes
WHERE post_id = '<id-from-a-post-with-likes';
```

## Connecting Supabase to Supastack

### Cloning The Project

I've created a project that works with this database & the supabase system. It's hosted on github and we can use Git to fork, and then clone it from this URL: https://github.com/MykalMachon/Supastack

1. **Fork Supastack**: You can click the "fork" button at the top of the repo to fork my repository. Now you should be able to clone your own version to your machine

2. **Clone Supastack locally & install deps**: follow the commands below in your command line.

```bash
git clone https://github.com/<your-username>/Supastack
# wait for github to clone the repok
cd ./Supastack
# install dependencies
npm install
```

3. **Setup environment:** You'll need your supabase project URL, and your anon public API key. You can find these in your supabase project, under settings > API. create a file called `.env.local` in the home directory of the repo, paste your supabase project URL and your public anon API into the file as below.

```env
NEXT_PUBLIC_SUPABASE_URL="<your-supabase-project-url>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-public-anon-api-key>"
```

4. **Run your app:** Now you should be able to run your app with the command `npm run dev` in your console.

### Experiment With Your App

Create an account, signin, and try creating posts. You can also try making multiple accounts with different emails so you can like your own posts, and make sure that evkerything is working properly.

## Deploying to Netlify

This is a stub
