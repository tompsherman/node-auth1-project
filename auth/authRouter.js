const router = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('../users/userModels')

const currentTime = new Date().toDateString()

// @desc		Test end is working
// @route		GET /test
router.get('/test', (req, res) => {
    res.status(202).json({message: 'the auth router is running at ' + currentTime})
})

// @desc		Add a new 
// @route		POST /
router.post('/register', async (req,res)=>{ 
    try {
      const {username, password} = req.body
      // do the hash, add hash to the db
      const hash = bcrypt.hashSync(password, 10) // 10 = 2^10 rounds of hashing
      const user = {username, password: hash}
      const addedUser = await Users.create(user)
      res.status(202).json(addedUser)
    } catch (error) {
      // res.status(500).json({message: "something went wrong"}) -- production
      res.status(500).json({message: error.message, error: error.stack})
    }
  })
// @desc		Add a new 
// @route		POST /
router.post('/login', async (req,res)=>{ 
    //checks if credentials legit
    try{
      // use req.body.username to find in db user with said username
      const [user] = await Users.findBy({username: req.body.username})
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        // if user and creds good = welcome message
        req.session.user = user // session middleware tacks session property on req.body, compares with user
        res.status(200).json({message: `welcome back ${user.username}`})
      }
      // if no user, send back failure message
      // if user, but creds bad, send packing
       else { res.status(401).json({message: 'bad credentials'})}
  
      //compare decrypt hash of the user pulled against req.body.password
    } catch(error){
      res.status(500).json({message: error.message, error: error.stack})
    }
  })
// @desc		Get all s
// @route		GET /
router.get('/logout', (req,res)=>{ 
    if (req.session && req.session.user) {
      // we need to destroy session
      req.session.destroy(error => {
        if (error) {
          res.json({message: "can not leave"})
        } else {
          res.json({message: 'good bye'})
        }
      })
    } else {
      res.status(200).json({message: "you have no session..."})
    }
  })

module.exports = router