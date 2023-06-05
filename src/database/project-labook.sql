-- Active: 1684348961361@@127.0.0.1@3306
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now','localtime')) NOT NULL
    );

INSERT INTO users (id, name, email, password, role)
VALUES
  -- tipo NORMAL e senha = fulano123
	('u001', 'Fulano', 'fulano@email.com', '$2a$12$qPQj5Lm1dQK2auALLTC0dOWedtr/Th.aSFf3.pdK5jCmYelFrYadC', 'NORMAL'),

  -- tipo NORMAL e senha = beltrana456
	('u002', 'Beltrana', 'beltrana@email.com', '$2a$12$403HVkfVSUbDioyciv9IC.oBlgMqudbnQL8ubebJIXScNs8E3jYe2', 'NORMAL'),

  -- tipo ADMIN e senha = BigBoss789
	('u003', 'BigBoss', 'bigboss@email.com', '$2a$12$lHyD.hKs3JDGu2nIbBrxYujrnfIX5RW5oq/B41HCKf7TSaq9RgqJ.', 'ADMIN');

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now','localtime')) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME('now','localtime')) NOT NULL
    );

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        post_id TEXT NOT NULL REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE,
        like INTEGER
    );