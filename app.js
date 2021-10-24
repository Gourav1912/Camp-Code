const {express} = require('./Packages');
const {ejs} = require('./Packages');
const {ejsMate} = require('./Packages');
const path = require('path');

const {methodOverride} = require('./Packages')
const Campground = require('./Models/campground');
const {mongoose} = require("./Packages");

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', ejs);
app.use(express.urlencoded());


console.log(methodOverride)
app.use(methodOverride('_method'))

//Connecting To Server and Mongo

app.listen(8080, () => {
    console.log('Listening To Port', 8080);
});
mongoose.connect('mongodb://localhost:27017/Yelp-Camp')
    .then(D => console.log('Connected To Mongoose'))
    .catch(E => console.log('Error From Mongoose Side'));


app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/campgrounds', async (req, res) => {
    const allCamps = await Campground.find({})
        .catch(E => console.log('Error')); //Error To Handle

    res.render('camps.ejs', {allCamps});
});

app.get('/campgrounds/insert', (req, res) => {
    const {descriptors} = require('./Seeds/data')
    res.render('insert.ejs', {descriptors});
});

app.get('/campgrounds/:id/update', async (req, res) => {
    const {id} = req.params;
    const {descriptors} = require('./Seeds/data')
    await Campground.findById(id)
        .then(camp => res.render('update.ejs', {camp, descriptors}))
        .catch(E => res.send('<h3>Sorry! Error</h3>'))
});

app.patch('/campgrounds/:id/update', async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body ,{new: true})
        .then(camp => res.redirect('/campgrounds'))
        .catch(E => res.send('<h3>Sorry! Error</h3>'))
});

app.delete('/campgrounds/:id/delete', async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id)
        .then(camp => res.redirect('/campgrounds'))
        .catch(E => res.send('<h3>Sorry! Error</h3>'))
});

app.post('/campgrounds/insert', async (req, res) => {
    await Campground.insertMany(req.body)
        .then(camp => res.redirect('/campgrounds'))
        .catch(E => res.send('<h3>Sorry! Error</h3>'))
});

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    await Campground.findById(id)
        .then(camp => res.render('detail.ejs', {camp}))
        .catch(E => res.send('<h3>Sorry! Error</h3>'))
});

