// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
//   app.get("/api/posts/", function(req, res) {
//     db.stockBuySell.findAll({})
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

  // Get route for returning posts of a specific category
//   app.get("/api/posts/category/:category", function(req, res) {
//     db.stockBuySell.findAll({
//       where: {
//         category: req.params.category
//       }
//     })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

  // Get rotue for retrieving a single post
//   app.get("/api/posts/:id", function(req, res) {
//     db.stockBuySell.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

  // POST route for saving a new post
  app.post("/api/buy", function(req, res) {
    console.log(req.body);
    db.stockBuySell.create({
    id: req.body.id,
    userId: req.body.userId,
    companyName: req.body.companyName,
    stockTicker: req.body.ticker,
    sector: req.body.sector,
    epocDate: req.body.epocDate,
    purchaesPrice: req.body.price,
    owned: true
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     db.stockBuySell.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

  // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.stockBuySell.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });
};
