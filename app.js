import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var newItems = ["Buy Food", "Buy Liquid", "Cook Food", "Eat Food"];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    dayType: day,
    item: newItems,
  });
});

app.post("/", (req, res) => {
  const newList = req.body.addList;
  newItems.push(newList);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
