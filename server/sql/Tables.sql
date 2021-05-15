CREATE TABLE Users (  
    id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    uuid varchar(255) comment 'unique identifier',
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    updateTime DATETIME COMMENT 'update time',
    firstName VARCHAR(100) NOT NULL,
	lastName  VARCHAR(100) NOT NULL,
	email     VARCHAR(255) NOT NULL UNIQUE,
	password  VARCHAR(255) NOT NULL
) default charset utf8;

CREATE TRIGGER before_user_insert
	BEFORE INSERT ON Users
	FOR EACH ROW 
	SET new.uuid = uuid_short();

CREATE TABLE Household (
    id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    name VARCHAR(255) NOT NULL,
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    updateTime DATETIME COMMENT 'update time',
    createdBy INT NOT NULL,
    CONSTRAINT constr_Household_User_id
        FOREIGN KEY User_fk (createdBy) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TodoList (
    id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    updateTime DATETIME COMMENT 'update time',
    name VARCHAR (255) NOT NULL,
    createdBy INT NOT NULL,
    CONSTRAINT constr_TodoList_User_id
        FOREIGN KEY User_fk (createdBy) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ListTask (
    id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    createTime DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    updateTime DATETIME COMMENT 'update time',
    task VARCHAR (255) NOT NULL,
    due TIMESTAMP,
    TodoList_id INT NOT NULL,
    User_id INT,
    Household_id INT,
    CONSTRAINT constr_ListTask_TodoList_id
        FOREIGN KEY TodoList_fk (TodoList_id) REFERENCES TodoList (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT constr_ListTask_User_id
        FOREIGN KEY User_fk (User_id) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT constr_ListTask_Household_id
        FOREIGN KEY Household_fk (Household_id) REFERENCES Household (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE UserHouseholds (
    User_id INT NOT NULL,
    CONSTRAINT constr_UserHouseholds_User_id
        FOREIGN KEY User_fk (User_id) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    Household_id INT NOT NULL,
    CONSTRAINT constr_UserHouseholds_Household_id
        FOREIGN KEY Household_fk (Household_id) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (User_id, Household_id)
);

CREATE TABLE HouseholdLists (
    List_id INT NOT NULL,
    CONSTRAINT constr_HouseholdLists_List_id
        FOREIGN KEY List_fk (List_id) REFERENCES TodoList (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    Household_id INT NOT NULL,
    CONSTRAINT constr_HouseholdLists_Household_id
        FOREIGN KEY Household_fk (Household_id) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (List_id, Household_id)
);

CREATE TABLE UserLists (
    User_id INT NOT NULL,
    CONSTRAINT constr_UserLists_User_id
        FOREIGN KEY User_fk (User_id) REFERENCES Users (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    List_id INT NOT NULL,
    CONSTRAINT constr_UserLists_List_id
        FOREIGN KEY List_fk (List_id) REFERENCES TodoList (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (User_id, List_id)
);