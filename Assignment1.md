CS 453/553 Project 1 Summer 2023

Mad Mike's Mechanic Shop

Problem Statement
=================

Mad Mike has contracted you to build him a system to keep track of the cars that come into his many shops.  Mike has 48 shops in four states.  He needs to know certain things about each car for liability and government compliance issues.  

-   VIN 

-   Plate #, State

-   Make/Model

-   Year

-   Owners Name, Address and DL Number

He would also like to keep a record of 

-   A description of the problem

-   Time the car was in the shop (day in, day out)

-   Which workers worked on the car

He doesn't want to host servers everywhere so you need to make this project cloud based.  Specifically it needs to run in docker containers using docker-compose, so we can deploy it on AWS, Asure, etc....

At each of his shops, an employee would enter the information into a web browser, and it would submit to the host in AJAX form using HTTP and a RESTful interface.

Class requirements
==================

Obviously we don't have a lot of time, so we can't completely finish this to production ready.  So, what you need to do for the purpose of the class is 

-   Have a web-service that runs in docker (Docker file, docker-compose, whatever images you need)

-   The web service should be stateless and RESTful (I would recommend using node/express but you do you as long as it runs automatically in the docker container)

-   The data contract between the client and the servier should use JSON and be defined in an [OpenAPI specification](https://swagger.io/specification/).  (You can generate code from the API spec or generate the API spec from code or hand build both, whichever works for you)

-   You don't have to build a front end GUI (like react or some other javascript framework) but you can if you want (bonus points)

-   You do need to show examples of calling the server using Curl, Wget, Postman, HTTP request, etc...

-   The server should connect to some kind of DB, I recommend SQLITE (which is a file based relational database) or Mongo (which is no-sql and easy to setup in docker and pretty easy to use)

Getting started 
================

So the main resource we are concerned with is the Automobile.  So we need to 

-   Add a new car to the shop ->    POST /cars   

-   Update a car in the shop -> PUT /cars/:id 

-   Get a car in the shop -> GET /cars/:id 

-   Get all cars in the shop -> GET /cars/

-   Remove a car from the shop -> DELETE /cars/:id 

How far you want to go with Owners, different geographical shops, etc.., I leave up to you.  They can be simple strings in the car record or full blow first class citizens of the system.

What to turn in 
================

You may work in a team (max 2 members) if you want, but yo udon't have to if you are away from Huntsville and that is too difficult.  However, if you are in a team I expect both of you to code, write api spec, test, do DB queries, basically work at least a little in every part of the system.

-   OpenAPI spec

-   Server source code

-   Docker files

-   Build instructions

-   Client calls (curls, etc..)

Note: I don't expect your system to be perfect, but I do expect it to work at least at the minimal level of adding, getting, and removing cars from the system. So make sure you do that before you try to get fancy.