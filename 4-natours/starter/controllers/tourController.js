//CONTROLLER - is where all the functions takes place.
const Tour = require('../models/tourModel');

exports.getCheapestTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratings,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

class APIFeatures {
  //creates a new object out of this Class
  // query = Mongoose query,
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //using filtering
    const queryObj = { ...this.queryString };
    //these are the keys to remove from the req.query from the request obj
    const excludedKeys = ['page', 'sort', 'limit', 'fields'];

    //So if we use .find() hindi sya mapapasama as a filtering key
    excludedKeys.forEach((key) => delete queryObj[key]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //run query on Mongoose.
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //Sorting results; If may req.query.sort sa request
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //default sorting
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }
}

exports.getAllTours = async (req, res) => {
  try {
    //Using filtering and sorting
    // First we need to get the query params_ create a shallow copy
    //build the query
    const queryObj = { ...req.query };

    //Mga keys na idedelete natin
    //So if we use .find() hindi sya mapapasama as a filtering key
    const excludedKeys = ['page', 'sort', 'limit', 'fields'];

    //We dont want to return a new array so we use forEach
    excludedKeys.forEach((key) => delete queryObj[key]);

    //Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    //need lagyan ng dollar sign $gte, $lte etc
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //Now we can pass the query with filtering
    //parang sa mongodb lang na pag get all using .find() but this is mongoose query
    //this Tour returns a query so we can chain methods Tour.method()
    let query = Tour.find(JSON.parse(queryStr));

    //Sorting results; If may req.query.sort sa request
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      //default sorting
      query = query.sort('-createdAt');
    }

    //api.com/tours?fields
    //including fields in query
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      //do not include this field as it is used by mongodb internally
      query = query.select('-__v');
    }

    const page = req.query.page * 1 || 1; //3
    const limit = req.query.limit * 1 || 100; // 10
    const skip = (page - 1) * limit; // 3 - 1 * 10 = skip 20 results on each page
    //page=3&limit=10, page 1 1-10, page 2 21-30 etc

    //4 API limiting results
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const totalTours = await Tour.countDocuments();
      if (skip >= totalTours) throw new Error('This page does not exist.');
    }
    //Execute query
    const features = new APIFeatures(Tour.find(), req.query).filter();
    const tours = await features.query;

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
