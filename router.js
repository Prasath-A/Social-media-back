const express = require("express");
const router = express.Router();
const Database = require("./schema");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Database.find()
    .exec()
    .then((data) => {
      res.status(200).json(data);
    });
});

router.post("/", (req, res) => {
  const database = new Database({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  database
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Database.deleteOne({ id: id });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Update the item in MongoDB
    const updatedItem = await Database.findOneAndUpdate(
      { id: id },
      { ...req.body },
      { new: true }
    );

    // Send a response
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/* router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Database.findByIdAndUpdate({ id }, { ...req.body });

    res.status(200).json(result);
  } catch (err) {
    console.log("error da .ennanu solve pannu");
    res.status(400).json({ error: err });
  }
}); */
// router.delete('/:id',(req,res)=>{
//   const id=req.params.id;
//   Database.deleteOne({_id:id}).exec().then(result=>{
//     console.log(result);
//     res.status(200).json(result);
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json(err);
//   })
// });

module.exports = router;
