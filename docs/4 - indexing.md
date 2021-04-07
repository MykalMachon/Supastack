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
