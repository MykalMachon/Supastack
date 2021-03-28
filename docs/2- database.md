# Database Setup

This document outlines all the SQL commands we need to setup the tables in the database.

## Posts Table

This table represents each one of the posts that will be made on the platform.

```sql
create table public.posts (
  id        uuid not null primary key,
  title     text,
  content   json,
  slug      text not null unique,
  user_id   uuid references public.users not null,
)
```

## Users Table

This table represents all public user info on the platform! it's pretty basic right now, but each user tuple matches a private auth.users tuple that contains private information.

```sql
create table public.users (
  id        uuid not null primary key,
  username  text,
  bio       text,
)
```

## Likes

This table contains all likes on posts- this way users can only like a post once, etc, etc.

```sql
create table public.users (
  id        uuid not null primary key,
  username  text,
  bio       text,
)
```

## Comments

```sql
create table public.users (
  id        uuid not null primary key,
  username  text,
  bio       text,
)
```
