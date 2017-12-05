CREATE DATABASE IF NOT EXISTS burgers_db;
USE burgers_db;

DROP TABLE IF EXISTS burgers;

CREATE TABLE burgers (
    id integer NOT NULL AUTO_INCREMENT,
    burger_name varchar(100) NOT NULL,
    devoured boolean DEFAULT false,
    PRIMARY KEY (id)
);
