CREATE TABLE Users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	uuid VARCHAR(255) NOT NULL,
	firstName VARCHAR(100) NOT NULL,
	lastName  VARCHAR(100) NOT NULL,
	email     VARCHAR(255) NOT NULL UNIQUE,
	password  VARCHAR(255) NOT NULL,
	created   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER before_user_insert
	BEFORE INSERT ON Users
	FOR EACH ROW 
	SET new.uuid = uuid_short();

CREATE TABLE Categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    admin INT NOT NULL,
    FOREIGN KEY (admin) REFERENCES Users (id),
    private BOOLEAN NOT NULL DEFAULT 0,
    created   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserCategories (
	userId INT NOT NULL,
	categoryId INT NOT NULL,
	CONSTRAINT constr_UserCategories_user_fk 
		FOREIGN KEY user_fk (userId) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT constr_UserCategories_category_fk 
		FOREIGN KEY category_fk (categoryId) REFERENCES Categories (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (userId, categoryId)
);



