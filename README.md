# Written by John Ingram for CS453
This program sets up a simple web server that connects to MongoDB
and provides a REST API for a car repair shop. This server can also 
interact with a SOAP server that returns a price and delivery date for a given part number

# How to build and run
## Build
```bash
docker-compose build
```
## Run
```bash
docker-compose up
```

# Client call for Project 2

-   Get a price and delivery date for a part number -> GET /parts/:id 

        curl -X GET http://localhost:3000/parts/1234

# Client calls for Project 1
## I used Curl because it's simple, but of course Wget or HTTP requests would work too

-   Add a new car to the shop ->    POST /cars   

        curl -X POST   http://localhost:3000/cars   -H 'Content-Type: application/json'   -d '{
        "vin": "12345678901234567",
        "plateno_state": "123456_CA",
        "make_model": "Toyota Camry",
        "year": 2010,
        "owner_name": "John Doe",
        "owner_address": "123 Main St",
        "owner_dlno": "A1234567",
        "problem": "Check engine light is on",
        "time_in_out": "2021-10-01T08:00:00Z",
        "workers": ["Alice", "Bob"]
        }'

-   Update a car in the shop -> PUT /cars/:id 

        curl -X PUT -H "Content-Type: application/json" -d '{
        "vin": "12345678901234567", 
        "plateno_state": "CA", 
        "make_model": "Toyota Camry", 
        "year": 2015, "owner_name": 
        "John Doe", "owner_address": "123 Main St", 
        "owner_dlno": "A1234567", 
        "problem": "Check tire light", 
        "time_in_out": "2021-10-01T08:00:00Z", 
        "workers": ["Alice", "Bobby"]}' http://localhost:3000/cars/649cdb819ba575fdd03eb6f4 

-   Get a car in the shop -> GET /cars/:id 

        curl -X GET http://localhost:3000/cars/<car id>

-   Get all cars in the shop -> GET /cars/

        curl -X GET http://localhost:3000/cars

-   Remove a car from the shop -> DELETE /cars/:id 

        curl -X DELETE http://localhost:3000/cars/<car id>
