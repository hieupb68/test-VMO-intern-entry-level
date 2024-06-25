-- demo: https://onecompiler.com/postgresql/42h63a9u4

-- Tạo bảng users
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR NOT NULL,
    avatar VARCHAR,
    birthday TIMESTAMP,
    created_time TIMESTAMP NOT NULL
);

-- Tạo bảng friend
CREATE TABLE "friend" (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES "users"(id),
    receiver_id INT NOT NULL REFERENCES "users"(id),
    status VARCHAR,
    created_time TIMESTAMP
);

-- Tạo bảng message
CREATE TABLE "message" (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES "users"(id),
    receiver_id INT NOT NULL REFERENCES "users"(id),
    type VARCHAR NOT NULL,
    content VARCHAR,
    status VARCHAR,
    created_time TIMESTAMP
);

-- Insert dữ liệu vào bảng users
INSERT INTO "users" (username, password, fullname, avatar, birthday, created_time)
VALUES
    ('user1', 'password1', 'User One', NULL, '1990-01-01', '2024-06-24'),
    ('user2', 'password2', 'User Two', NULL, '1995-05-05', '2024-06-24'),
    ('user3', 'password3', 'User Three', NULL, '1988-10-10', '2024-06-24'),
    ('user4', 'password4', 'User Four', NULL, '1987-03-15', '2024-06-24');

-- Insert dữ liệu vào bảng friend
INSERT INTO "friend" (sender_id, receiver_id, status, created_time)
VALUES
    (1, 2, 'accepted', '2024-06-24'),
    (1, 3, 'pending', '2024-06-24'),
    (2, 4, 'accepted', '2024-06-24'),
    (3, 1, 'rejected', '2024-06-24');

-- Insert dữ liệu vào bảng message
INSERT INTO "message" (sender_id, receiver_id, type, content, status, created_time)
VALUES
    (1, 2, 'text', 'Hello', 'read', '2024-06-24'),
    (2, 1, 'text', 'Hi', 'sent', '2024-06-24'),
    (1, 3, 'image', NULL, 'pending_read', '2024-06-24'),
    (3, 1, 'text', 'Hey', 'read', '2024-06-24');

-- Lấy id, username, fullname, avatar của các user có id = 2, 3
SELECT id, username, fullname, avatar
FROM "users"
WHERE id IN (2, 3);

-- Lấy các bạn bè (id, username, fullname, avatar) của user có id = 2
SELECT u.id, u.username, u.fullname, u.avatar
FROM users u
JOIN friend f ON (u.id = f.receiver_id AND f.sender_id = 2 AND f.status = 'accepted') 
                OR (u.id = f.sender_id AND f.receiver_id = 2 AND f.status = 'accepted');


-- Lấy tin nhắn của user có id = 2 với một bạn bè nào đó (ví dụ: id bạn bè = 3)
SELECT id AS message_id, sender_id, receiver_id, type, status, content, created_time
FROM message
WHERE (sender_id = 2 AND receiver_id = 3) OR (sender_id = 3 AND receiver_id = 2);


-- Lấy tin nhắn cuối cùng (last_message) với tất cả bạn bè của user có id = 2
WITH last_message AS (
    SELECT m.*, 
           ROW_NUMBER() OVER (PARTITION BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id) ORDER BY created_time DESC) AS rn
    FROM message m
    WHERE sender_id = 2 OR receiver_id = 2
)
SELECT LEAST(sender_id, receiver_id) AS friend_id, 
       id AS message_id, 
       type, 
       status, 
       content, 
       sender_id, 
       created_time
FROM last_message
WHERE rn = 1;

-- Lấy danh sách 10 user (id, username, avatar, birthday) có số lượng bạn bè nhiều nhất trong hệ thống
SELECT u.id, u.username, u.avatar, u.birthday, COUNT(f.id) AS friend_count
FROM users u
JOIN friend f ON u.id = f.sender_id OR u.id = f.receiver_id
WHERE f.status = 'accepted'
GROUP BY u.id
ORDER BY friend_count DESC
LIMIT 10;

