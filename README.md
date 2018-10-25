# demographic-statistics-dbms

**ABSTRACT

	Demographic statistics are measures of the characteristics of, or changes to, a population.

Records of births, deaths, marriages,immigration and emigration, and a regular census of population provide vital information that help in drafting National Policies.

The project will focus on having a web interface accessible by the public where the data can be entered and then stored in the DB.

A separate server/program can be used to process the statistics like life expectancy, birth rate, sex ratio, etc.

The processed information is later converted into graphs conveniently with the copious APIs found online.

Also note that while demographic statistics are generally for a whole nation, this project will have a small sample size of about 30-50 people and their statistics.


**SOFTWARE DESCRIPTION

		This project uses MongoDB for the database and JavaScript for the front-end.  It utilizes the MEAN* Stack
    which is fully programmable in JavaScript.

*MEAN stands for MongoDB, Express, Angular and Node.js. It can be implemented flawlessly in a Linux environment and has good uptime.


**HOME PAGE


![home](https://user-images.githubusercontent.com/17880433/47487621-67848c00-d860-11e8-9e3c-b2fb8e99cd43.png)


**BAR CHART


![main ui](https://user-images.githubusercontent.com/17880433/47487715-93a00d00-d860-11e8-9e8f-231984b818f3.png)


**INSTALLATION INSTRUCTIONS

Initializing ...

	npm init
	
Install the required dependencies

	npm install [depds]
	
Start MongoDB Service
	
	sudo systemctl start mongodb.service
	
Start Nodemon
	
	nodemon server.js
	
