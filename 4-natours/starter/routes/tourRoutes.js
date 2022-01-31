const express = require('express');
const tourController = require('./../controllers/tourController');
//create new routes with
const router = express.Router();

router.param('id', tourController.checkID);

//Create checkBody Middleware to check if body contains the name and price propertyIsEnumerable
//If not send back 400 bad request
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
