const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

//Modify the incoming request using express.json middleware
//Middlewares are used for modifying requests before it reaches the end response
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middle ware fuck u');
  next();
});

let path = `${__dirname}/dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(`${path}`));

//ROUTE HANDLERS
const getAllTours = async (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    //Add + to convert id str to integer
    const tour = tours.find((el) => el.id === +id);
    console.log(tour);
    if (!tour) {
      return res.status(400).json({
        status: 'failed',
        error: 'No tours found with the given tour ID',
      });
    }
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

const createTour = async (req, res) => {
  try {
    const tourID = tours[tours.length - 1].id + 1;

    //create a new tour object then spread the request data from request body + tourID
    const tour = { id: tourID, ...req.body };
    tours.push(tour);
    //push to our existing tours array

    fs.writeFile(`${path}`, JSON.stringify(tours, null, 4), (err) => {
      if (err) return console.error(err);

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

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const keysToUpdate = Object.keys(req.body);
    //name, duration
    const tour = tours.find((el) => el.id === +id);
    // console.log(tour);
    //Add + to convert id str to integer
    if (!tour) {
      return res.status(400).json({
        status: 'failed',
        message: 'No Tour found with this ID',
      });
    }
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

const deleteTour = async (req, res) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === +id);
  // console.log(tour);
  //Add + to convert id str to integer
  if (!tour) {
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

const getAllUsers = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
//create new routes with
const tourRoutes = express.Router();
const userRoutes = express.Router();

tourRoutes.route('/').get(getAllTours).post(createTour);
tourRoutes.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//USER ROUTES

userRoutes.route('/').get(getAllUsers).post(createUser);

userRoutes.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(3000, () => {
  console.log('App running');
});
