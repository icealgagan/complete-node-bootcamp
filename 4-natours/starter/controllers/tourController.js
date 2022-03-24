//CONTROLLER - is where all the functions takes place.
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //Using filtering and sorting
    // First we need to get the query params_ create a shallow copy
    const reqObj = { ...req.query };

    //Mga keys na idedelete natin
    //So if we use .find() hindi sya mapapasama as a filtering key
    const excludedKeys = ['page', 'sort', 'limit', 'fields'];

    //We dont want to return a new array so we use forEach
    excludedKeys.forEach((key) => delete reqObj[key]);

    //Now we can pass the query with filtering
    //parang sa mongodb lang na pag get all using .find()
    const tours = await Tour.find(reqObj);

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getTour = async (req, res) => {
  try {
    //Tour.findOne({_id: req.params.id})
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createTour = async (req, res) => {
  //will create a tour on the database
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    const errorMessage = error.message;
    console.log(error);
    res.status(400).json({
      errorMessage,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    //:id
    //new : true is the one that would be returned in the response
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    const errorMessage = error.message;
    res.status(400).json({
      errorMessage,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    const errorMessage = error.message;
    console.log(error);
    res.status(400).json({
      errorMessage,
    });
  }
};
