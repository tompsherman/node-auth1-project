const router = require('express').Router()

const Users = require('./userModels')

const currentTime = new Date().toDateString()

const secure = (req, res, next) => {
    //check if there is a user in the session:
    if(req.session && req.session.user){
    next()
    } else {
      res.status(401).json({message: "unauthorized user"})
    }
  }

// @desc		Test end is working
// @route		GET /test
router.get('/test', (req, res) => {
    res.status(202).json({message: 'the server is running at ' + currentTime})
})
// @desc		Get all users
// @route		GET /
router.get('/', secure, (req, res) => {
    Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
})
// @desc		Get a user by id
// @route		GET /:id
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})
// @desc		Update a user by id
// @route		PUT /:id
router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})
// @desc		Remove a user by id
// @route		DELETE /:id
router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(res.status(200).json({message:'the user is now deleted'}))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
})

module.exports = router