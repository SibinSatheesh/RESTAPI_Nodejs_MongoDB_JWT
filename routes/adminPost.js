const router = require('express').Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
//   console.log(storage)
const upload = multer({ storage: storage });
//  console.log(upload)
const Admin = require("../model/Admin");


router.get("/get", async (req, res) => {
    try {
      const getAll = await Admin .find();

      if (!getAll) 
      return  res.status(400).json("No users");

      res.status(200).json(getAll);
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });

  
router.post("/:postId", async (req, res) => {
    //console.log(req.body._id);
    try {
      const getOne = await Admin.findById({_id: req.params.postId});

      if (!getOne) 
      return  res.status(400).json("No user");

      console.log(getOne);
      res.status(200).json(getOne);
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });
  
  //posting the request
    router.post("/send", upload.single("Image"), async (req, res) => {
    // console.log(req.body);
    if (!req.file) return res.send('Please upload a file')
    const user = new Admin ({
      name: req.body.name,
      Image: req.file.path,
      position: req.body.position
    });
  
    try {
      const savedPost = await user.save();
      if (!savedPost) 
      return  res.status(400).json("No data to save");
  
      res.status(200).json({ savedPost });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });

  //deleting the request

router.delete('/:postId', async (req, res) => {
    console.log(req.params)
    try {
      const removedPosts = await Admin .remove({_id: req.params.postId});
      if (!removedPosts) 
      return  res.status(400).json("No data to delete");
  
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });
  
  //update
  router.patch('/:postId', upload.single("Image"),async (req, res) =>{
     //console.log(req.body)
     try {
      const updatedPost=await Admin .updateOne(    
        { _id: req.params.postId}, 
        { 
            name:req.body.name, 
            Image:req.file.path, 
            position: req.body.position
        })
        if (!updatedPost) 
        return   res.status(400).json("Cannot update");
  
           res.status(200).json(" Updated succesfully");
        } catch (err) {
              res.status(400).json({ msg: err });
            }
  });


  module.exports = router;