const Cities = require('./cities');
const {descriptors} = require('./data');
const {places} = require('./data');

const Campground = require('../Models/campground');
const {mongoose} = require('../Packages');

mongoose.connect('mongodb://localhost:27017/Yelp-Camp')
    .then(D => console.log('Connected To Mongoose'))
    .catch(E => console.log('Error From Mongoose Side'));


const emptyDB = async  () => {
    await Campground.deleteMany({})
}



const shuffleCamps = async () => {
    await emptyDB()
        .then()
        .catch(E => console.log('Could Not Clear DB Elements'))

    for(let i=0; i<50; i++){
        const Price = Math.floor(Math.random() * 100);
        const Descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
        const Place = descriptors[Math.floor(Math.random() * descriptors.length)];
        const City = Cities[Math.floor(Math.random() * Cities.length)].city;

        await Campground.insertMany({
            title: Descriptor + ' ' + Place,
            price: Price,
            description: Descriptor,
            location: City
        })
            .then(D => console.log(D))
            .catch(E => console.log('Could Not Insert Into DB'))
    }
}
shuffleCamps()
    .then(D => mongoose.connection.close())
    .catch(E => console.log('Could Not Disconnect Mongoose'));



