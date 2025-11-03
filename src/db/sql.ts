const SQL_CREATE_TABLE_POSTS_DATA = `--sql
    CREATE TABLE IF NOT EXISTS post_data (
        slug TEXT PRIMARY KEY,
        number_of_views INTEGER NOT NULL DEFAULT 0
    );
`

const SQL_CREATE_TABLE_COMMENTS_DATA = `--sql
    CREATE TABLE IF NOT EXISTS comment_data (
        id SERIAL PRIMARY KEY NOT NULL,
        slug TEXT NOT NULL,
        parent_id INTEGER DEFAULT NULL,
        user_id INTEGER NOT NULL,
        body TEXT NOT NULL,
        time_stamp TIMESTAMPTZ NOT NULL DEFAULT NOW,
    );
`

const SQL_CREATE_TABLE_USERS_DATA = `--sql
    CREATE TABLE IF NOT EXISTS user_data (
        id SERIAL PRIMARY KEY NOT NULL,
        fullname TEXT NOT NULL,
        image_path TEXT DEFAULT NULL
    );
`

const SQL_CREATE_TABLE_LIKES_DATA = `--sql
    CREATE TABLE IF NOT EXISTS like_data (
        id SERIAL PRIMARY KEY NOT NULL,,
        parent_id INTEGER NOT NULL
        user_id INTEGER NOT NULL,
        time_stamp TIMESTAMPTZ NOT NULL,
        is_positive BOOLEAN NOT NULL DEFAULT TRUE
    );
`

// Views
const SQL_CREATE_VIEW_TOP_LEVEL_COMMENTS = `--sql
    CREATE VIEW top_level_comments AS (
        SELECT 
            comment.slug,
            comment.user_id,
            user.fullname AS user_name,
            user.image_path AS user_image,
            comment.body,
            count(likes.id) AS number_of_likes,,
            count(dislikes.id) AS number_of_dislikes
            count(reply.id) AS number_of_replies,
            comment.time_stamp
        
        FROM comment_data AS comment
        INNER JOIN user_data AS user ON comment.user_id = user.id
        INNER JOIN likes ON comment.id = likes.parent_id
        INNER JOIN dislikes ON comment.id = dislikes.parent_id
        INNER JOIN comment_data AS reply ON comment.id = rd.parent_id

        WHERE comment.parent_id IS NULL
    );
`

const SQL_CREATE_VIEW_REPLIES = `--sql
    CREATE VIEW replies AS (
        SELECT 
            comment.slug,
            comment.user_id,
            user.fullname AS user_name,
            user.image_path AS user_image,
            comment.body,
            count(likes.id) AS number_of_likes,,
            count(dislikes.id) AS number_of_dislikes
            count(reply.id) AS number_of_replies,
            comment.time_stamp
        
        FROM comment_data AS comment
        INNER JOIN user_data AS user ON comment.user_id = user.id
        INNER JOIN likes ON comment.id = likes.parent_id
        INNER JOIN dislikes ON comment.id = dislikes.parent_id
        INNER JOIN comment_data AS reply ON comment.id = rd.parent_id

        WHERE comment.parent_id IS NOT NULL
    );
`

const SQL_CREATE_VIEW_LIKES = `--sql
    CREATE VIEW likes AS (
        SELECT
            id,
            user_id,
            time,
            parent_id
        FROM like_data 
        WHERE is_positive IS TRUE
    );
`
const SQL_CREATE_VIEW_DISLIKES = `--sql
    CREATE VIEW dislikes AS (
        SELECT
            id,
            user_id,
            time_stamp,
            parent_id
        FROM like_data 
        WHERE is_positive IS FALSE
    );
`

const SQL_CREATE_VIEW_POSTS = `--sql
    CREATE VIEW posts AS (
        SELECT 
            post.id,
            post.number_of_views,
            count(likes.id) AS number_of_likes

        FROM post_data AS post
        INNER JOIN likes ON post.id = likes.parent_id
        INNER JOIN dislikes ON post.id = dislikes.parent_id
    );
`
