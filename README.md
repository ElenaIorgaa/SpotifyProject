This is a project made for service oriented programming course. It contains:
- an IDM service that makes use of SOAP, written in Python that manages the users and roles of the application (these are stored in a SQL database)
- a RESTful service for the artists and the songs, written in java, Spring Boot, using a SQL database (MariaDB)
- a RESTful service for the playlists that makes use of the previous one in order to add a song to the database and the data is store in a NoSQL database (i used MongoDB)
- Eureka server to which my RESTful services connect and a Gateway
- User interface implemented in REACT
