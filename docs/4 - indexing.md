## Indexing the Likes Table

```sql
-- This creates an index on the likes table when looking up by post_id
CREATE INDEX index_likes_by_post_id
ON likes(post_id)
```

```sql
-- use this to see what the query does before and after the lookup
EXPLAIN SELECT *
FROM likes
WHERE post_id = 'asc2_asdc_nc2t_wxWc';
```

_reference_: https://www.postgresqltutorial.com/postgresql-indexes/postgresql-create-index/
