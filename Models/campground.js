const {mongoose} = require('../Packages/index');

const CampSchema = new mongoose.Schema({
   title: String,
   price: Number,
   description: String,
   location: String
});

module.exports = mongoose.model('campground', CampSchema);



