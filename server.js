const express = require("express")
// ()
const app = express()
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');

var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function main() {
    await mongoose.connect("mongodb://admin:test@0.0.0.0:27017/test3?authSource=admin", {
        useNewUrlParser: true,
        //  useUnifiedTopology: true 
    })
        .then(() => console.log('DB Connection Successfull'))
        .catch(error => console.error(error));
}


const titleSchema = new mongoose.Schema(({
    title: String,
    content: String
}))
var titleSchemaModel = mongoose.model('titles', titleSchema);


app.post("/addtitle", async (req, res) => {
    const title = new titleSchemaModel({
        title: req.body.title,
        content: req.body.content,
    })
    try {
        const dataToSave = await title.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.get("/titles", async (req, res) => {
    try {
        const data = await titleSchemaModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get("/title/:id", async (req, res) => {
    try {
        const data = await titleSchemaModel.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
main()


app.listen(3001)

