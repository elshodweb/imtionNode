create database todos;


create table tasks(
  id serial not null,
  title text not null,
  descr text not null,
  is_done boolean default false,  
  created_at timestamp without time zone default current_timestamp NOT NULL 
);

INSERT INTO tasks(
  title,descr
)values
('4itletieltiel', 'sfdafasfewfsdfewfwefewfdwe');

select * from tasks;
select * from tasks where id = $1;


update tasks set title = $1, descr = $2 where id = $3 ; 



select * from tasks where created_at between '2023-03-12T10:47:42.666Z' and '2023-05-12T10:48:03.990Z';

select * from tasks where created_at between '2023-04-12T10:48:02.990Z' and '2023-04-12T10:48:05.990Z';

select * from tasks where created_at between $1 and $2;
