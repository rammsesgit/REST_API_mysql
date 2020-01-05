CREATE DATABASE node_mysql_ts;

USE node_mysql_ts;

CREATE TABLE post(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE post;