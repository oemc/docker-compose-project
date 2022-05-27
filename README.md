# docker-compose-project
This repository contains the source code of a web application and a web api which functionality is to store and retrieve data from a relational database and a cache database.
Both applications, as well as the  databases, can be deployed using the provided docker-compose with just a couple of commands and configurations. 

# Usage

1. Create the volume mdb_init and copy the `mariadb_init.sql` script into it. 
2. Create the files `mariadb_passsword.txt`, `mariadb_root_passsword.txt` and `redis_password.txt` with some passsword inside them. These will be loaded to the containers and will be the credentiasl used for the commmunication betweeen them.
3. Run the following commands 
``` 
docker compose build
docker compose up
```
5. Visit localhost:8000 in your browser
