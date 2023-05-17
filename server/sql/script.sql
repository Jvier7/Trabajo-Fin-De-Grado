CREATE TABLE users (
	id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    email varchar(255),
    password varchar(255)
);
CREATE TABLE todo (
	id int PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    dateCreated date,
    text varchar(255),
    isCompleted boolean,
    priority int(1),
    FOREIGN key (user_id) REFERENCES users(id)
);