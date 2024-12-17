import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let newItems = ["Buy Food", "Buy Liquid", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    item: newItems,
    copyYear: today.getFullYear(),
  });
});

app.post("/", (req, res) => {
  let newList = req.body.addList;
  console.log(req.body);

  if (req.body.list == "Work List") {
    workItems.push(newList);
    res.redirect("/work");
  } else {
    newItems.push(newList);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    item: workItems,
    copyYear: new Date().getFullYear(),
  });
});
app.post("/work", (req, res) => {
  let newList = req.body.addList;
  workItems.push(newList);
  res.redirect("/work");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
