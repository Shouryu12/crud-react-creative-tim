CREATE DATABASE reactdb;

CREATE TABLE users
(
    id       serial  not null primary key,
    nome     varchar(100) not null,
    datanasc varchar(10),
    ativo    boolean default true,
    email    varchar(100)
);