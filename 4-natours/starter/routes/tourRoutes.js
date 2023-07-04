//In tourRoutes we declare here the HTTP verbs and the functions to use only then export it.
const express = require('express');
const tourController = require('../controllers/tourController');
//create new routes with
const router = express.Router();

// router.param('id', tourController.checkID);

//If not send back 400 bad request
//router.route('/') is basically just server.com/api/v1/tours"/"
router
  .route('/5-cheapest-tours')
  .get(tourController.getCheapestTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

//we export the router so we can use it on the app js mounting
module.exports = router;
