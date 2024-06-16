import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
const port=3000;
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.post("/",async (req,res)=>{
    const l=req.body["reel-link"];
    const options = {
        method: 'POST',
        url: 'https://instagram-bulk-scraper-latest.p.rapidapi.com/media_download_from_url',
        headers: {
          'x-rapidapi-key': 'cad8d2b23cmshdfae5940dc0894dp1778e7jsnefe961b8e490',
          'x-rapidapi-host': 'instagram-bulk-scraper-latest.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          url: l
        }
      };

      try {
          const response = await axios.request(options);
          const fetched=response.data;
          res.render("index.ejs",{
            content:fetched.data.main_media_hd
          });
      } catch (error) {
          console.error(error);
      }
});

app.listen(port,()=>{
    console.log("Server listening");
});
