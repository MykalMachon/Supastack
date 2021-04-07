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

## Setup Authentication

## Creating Tables

## Securing Tables

## Indexing the Likes Table

## Setup Supastack Using Supabase

## Deploying Our App

## References

1. Postgres Row Level Policies (https://www.postgresql.org/docs/9.5/ddl-rowsecurity.html)
2. Supabase Docs: Auth (https://supabase.io/docs/guides/auth)
3. Postgres Indexing: https://www.postgresqltutorial.com/postgresql-indexes/postgresql-create-index/
