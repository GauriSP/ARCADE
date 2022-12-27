let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();
  
var playerLogin = require("../database/models/playerModel");
  
// CREATE Student
router.post("/createLogin", (req, res, next) => {
    player = new playerLogin({playerId:req.body.playerId,password:req.body.password});
    player.save((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(data);
    } 
  });
});
  

router.get("/checkLogin", (req, res) => {
    playerLogin.find({},{_id:0,__v:0},(error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
  
// UPDATE student
// router
//   .route("/update-student/:id")
//   // Get Single Student
//   .get((req, res) => {
//     studentSchema.findById(
//         req.params.id, (error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.json(data);
//       }
//     });
//   })
  
//   // Update Student Data
//   .put((req, res, next) => {
//     studentSchema.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       (error, data) => {
//         if (error) {
//           return next(error);
//           console.log(error);
//         } else {
//           res.json(data);
//           console.log("Student updated successfully !");
//         }
//       }
//     );
//   });
  
// // Delete Student
// router.delete("/delete-student/:id", 
// (req, res, next) => {
//   studentSchema.findByIdAndRemove(
//       req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });
  
module.exports = router;