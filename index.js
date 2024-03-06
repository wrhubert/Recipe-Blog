import express from "express";
import bodyParser from "body-parser";
//import path from 'path';
//import url from 'url';

/* const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname); */

const app = express();
const port = 3000;
let recipeList = [ {rId: 1, rName: "Pancakes", cName: "Bill Hubert", prep: "2 minutes", cook: "10 minutes", 
ingredients: "1 1/2 cups flour, 2 tablespoons sugar, 3 teaspoons baking powder, pinch of salt, " + 
"1 1/4 cup milk, 1 egg, 2 tablespoons vegetable oil",  
directions: "Mix the flour, sugar, baking powder and salt in a mixing bowl.  Prep your griddle to 375 degrees.  " + 
"Add the milk, egg and oil to the mix.  Mix until the batter is slightly lumpy.  Use a 1/4 cup to add batter to the " + 
"griddle in a circular pattern.  Flip pancakes over once.  Usually takes about 20-30 seconds per side."} ];
let recipeID = "default";
let recId = 2; 

app.use(bodyParser.urlencoded({ extended: true }));
// Simpler version to use the static folder.
app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)  => {
    res.render("index.ejs", {
        recipeList: recipeList, 
        recipeID: recipeID,
    });  
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/recipe", (req, res) => {
    res.render("recipe.ejs");
});

app.post("/submit", (req, res) => {    
    const recipe = { rId: recId++, rName: req.body["rName"], cName: req.body["cName"], prep: req.body["prep"], 
    cook: req.body["cook"], ingredients: req.body["ingredients"], directions: req.body["directions"]};
    recipeList.push(recipe);    
    res.render("index.ejs", { recipeList });
    console.log(recipeList);
});

app.post("/recipe", (req, res) => {
    let currentRecipe = [];
    for (let i=0; i < recipeList.length; i++) {;
        currentRecipe = recipeList[i];
        console.log(currentRecipe);
        if ((req.body["rId"]) == currentRecipe.rId) {
            console.log("We have a match!");
            res.render("recipe.ejs", {
                currentRecipe: currentRecipe, 
            });  
        }
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});