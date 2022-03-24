//used for filesystem
const fs = require('fs');

//Load the tours data
const path = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(`${path}`));

exports.checkBody = async (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing Name or Price',
    });
  }
  next();
};

//ROUTE HANDLERS
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'failed',
      message: 'No Tour found with this ID',
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    //Add + to convert id str to integer
    const tour = tours.find((el) => el.id === +id);
    // console.log(tour);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch ({ message }) {
    return res.status(400).json({
      status: 'failed',
      message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tourID = tours[tours.length - 1].id + 1;

    //create a new tour object then spread the request data from request body + tourID
    const tour = { id: tourID, ...req.body };
    tours.push(tour);

    //push to our existing tours array
    fs.writeFile(`${path}`, JSON.stringify(tours, null, 4), (err) => {
      if (err) return err;

      res.status(201).json({
        status: 'success',
        data: {
          tour: { ...tour },
        },
      });
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const keysToUpdate = Object.keys(req.body);
    //name, duration
    const tour = tours.find((el) => el.id === +id);
    // console.log(tour);
    //Add + to convert id str to integer

    //update value for each
    keysToUpdate.forEach((key) => {
      tour[key] = req.body[key];
    });
    tours.splice(tour.id, 1, tour);

    return fs.writeFile(`${path}`, JSON.stringify(tours, null, 4), (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    });
  } catch ({ message }) {
    return res.status(400).json({
      status: 'failed',
      message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  if (!tours) {
    return res.status(400).json({
      status: 'failed',
      message: 'No Tour found with this ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
