CS 453/553 Project 2 Summer 2023

Mad Mike's Mechanic Shop Expands

Problem Statement

Mad Mike is so thrilled with your REST based system for his auto shop,
he is looking for new ways to use technology to help his business. He
has talked with his parts supplier and they have an online ordering
system.

\
Problem is, their ordering system is not REST based, it's SOAP/WSDL
based. So Mike has once again come to you to help integrate his existing
auto inventory system with the parts company's ordering system.

Class requirements

*NOTE: If your project 1 system doesn't work, you can build this as a
standalone system, but you will have to build both the client and server
and run them in docker containers. *

Using your existing REST based system for Mad Mike:

-   Build a SOAP/WSDL server that takes a part number and returns a
    price and a delivery date (you can hardcode them or create random
    numbers).

    -   This includes the code and the WSDL file

    -   This server should run in a separate docker container from the
        REST server but it can be in the same docker-compose file. (see
        my example at the bottom)

    -   I recommend using the node soap library 

-   Add a new endpoint to the REST server that uses a SOAP client that
    calls the Supplier SOAP Server with a part number and returns the
    price and delivery date to your client/postman/curl command.

-   The web service should be stateless and RESTful (I would recommend
    using node/express but you do you as long as it runs automatically
    in the docker container

-   You do need to show examples of calling the server using Curl, Wget,
    Postman, HTTP request, etc...

Getting started

See my example at Specifically the client.js and soap-server.js

What to turn in

You may work in a team (max 2 members) if you want, but you don't have
to if you are away from Huntsville and that is too difficult. However,
if you are in a team I expect both of you to code, write api spec, test,
do DB queries, basically work at least a little in every part of the
system.

The easiest way to turn this in is to make a github repo and just paste
that into the submit, but if you don't want to do that you can turn in

-   WSDL file

-   Server source code

-   Docker files

-   Build instructions

-   Client calls (curls, etc..)

Note: I don't expect your system to be perfect, but I do expect it to
work at least at the minimal level.
