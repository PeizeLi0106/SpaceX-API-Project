import express from "express";
import axios from "axios";
import body_parser from "body-parser";



const app = express();
const port = 3000;
const BASE_URL = "https://api.spacexdata.com/latest";

app.use(express.static("public")); // a middleware to serve static files
app.use(body_parser.urlencoded({ extended: true })); // a middleware to parse url encoded data

app.get("/", async (req, res) => {
    try{
        const [companyRes, crewRes, roadsterRes, rocketsRes, shipsRes] = await Promise.all([
            axios.get(`${BASE_URL}/company`),
            axios.get(`${BASE_URL}/crew`),
            axios.get(`${BASE_URL}/roadster`),
            axios.get(`${BASE_URL}/rockets`),
            axios.get(`${BASE_URL}/ships`),
        ])
        const company = companyRes.data; //a JSON
        const crew = crewRes.data; //an array of JSONs
        const roadster = roadsterRes.data; //a JSON
        const rockets = rocketsRes.data; //an array of JSONs
        const ships = shipsRes.data; //an array of JSONs
        
        res.render("index.ejs", {company: company, crew: crew, roadster: roadster, rockets: rockets, ships: ships});
    }catch(error){
        console.log(error.response.data);
    }
});




app.listen(port, () => {
    console.log(`the app is listening on port ${port}`);
});