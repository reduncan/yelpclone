# yelpclone
This is a project for a Coding Bootcamp. We are not profiting from this project. 

yelp is a a web app that allows users to search for businesses and restaurants anywhere in the USA. Each business page shows the hours of operation, price rating, menus, reviews, user ratings and many more aspects of their business. 

For this project we were tasked with duplicating the yelp web app and having the following features:

* Users can add reviews and star ratings
* Users can search for reviews based on location
* Users can search for reviews based on a search term and tags
* Users can sort by price rating
* Integrating Google Maps into the app

## Getting Started

To get started with this project you will need to clone into the repository on your machine. Once you have cloned the repository you will need to run `npm install` to install all of the needed packages to run the app. After you have installed the needed packages you can start a local server by running `npm start` in your terminal. Now you are ready run our app locally. 

### Prerequisites

You will need the following isntalled on your machine to be able to run our app:

* Node.js
* Express
* Mongoose

Our project uses dotenv node package
You need to create an .env file with GEOCODE_KEY={YOUR-API-KEY} as an environmental variables for the results to render.

## Deployment

We have our app set to run on port 3000. If you prefer to use a different port feel free to chaneg the port after cloning into the repository. 

## Contributing

We are not currently accepting contributions to this project. 

## Authors

* **Robert Duncan** - Lead Architect
  * created base HTML and CSS for all pages
  * relayed information to our Instruction Team on progress and blockers
  * implemented random background generator on homepage
  * configured information for business.html DOM manipulation

* **Ben Nguyen** - Reviews/Ratings
  * Created base HTML, Javascript and CSS for review page.
  * Created base base functionality for review box.
  * Connected routes from business to review page.
  * Created a mobile friendly version for review page. 
  
* **Justin Kook** - Search by Location
  * created html render for the search results
  * standardized location inputs based on google geocoding api
  * filtered search results based on price tags
  * dynamic html title and ability to search only by location
  
* **David Ye** - Search by Terms/Tags
  * created search function to filter the database for tags and terms
  * created html render api to build elements dynamically
  * added a feature to automatically detect user's location and use it as default
  * contributed to results page css to support the element rendering
  * created functions to perform ETL on data coming from database to frontend 
  
* **Matthew Carpenter** - Google Maps
  * Created map layout for results, and business page
  * Utilized Google Maps API to link restaurants lat/lon to pinned items on map
  * Created/Styled large map box on results page/Animated with CSS
  * Created/Styled business info box on business page 


## License

This project is licensed under the MIT License

## Acknowledgments

* Yelp-Fusion NPM package
* Unsplash Photos
  * Nathan Dumlao (https://unsplash.com/@nate_dumlao)
  * Heather Schwartz (https://unsplash.com/@the_modern_life_mrs)
  * Drew Graham (https://unsplash.com/@dizzyd718)
  * Brenda Godinez (https://unsplash.com/@cravethebenefits)
  * Stella Tzertzeveli (https://unsplash.com/@tacoship)
  * Brooke Larke (https://unsplash.com/@brookelark)
  * Rob Bye (https://unsplash.com/@robertbye)
  * Vitalina Makakenko (https://unsplash.com/@vitalina)
  * Anita Austvika (https://unsplash.com/@anitaaustvika)
  * NordWood Themes (https://unsplash.com/@nordwood)

