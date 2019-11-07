create table Users(
     userid integer NOT NULL,
     firstname varchar(50) NOT NULL,
     lastname varchar(50) NOT NULL,
     useremail varchar(100) NOT NULL unique,
     phone varchar(15) NOT NULL,
     username varchar(50) NOT NULL,
     userpassword text NOT NULL
);