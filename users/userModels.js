const db = require('../data/db-config')

module.exports = {

    // function names
    find, // GET / all ducks
    findBy, // GET / specific duck by specific data
    findById, // GET / specific duck
    findSteps, //  GET / .join tables together **BAD NAME -- CHANGE **
    create, // POST / add new duck
    createStep, // POST / insert new step **BAD NAME -- CHANGE **
    update, // PUT / edit duck
    remove // DELETE / remove duck

}

    // functions
    function find(){
        return db('users')
    }
    function findBy(filter){
        return db('users').where(filter).orderBy('id')
    }
    function findById(id){
        return db('users')
        .where({id})
        .first()
    }
    function findSteps(id){
        return db('users')
    }
    async function create(duck){
        const [id] = await
        db('users').insert(duck)
            return db('users')
            .where({id})
            .first()
    }
    function createStep(id){
        return db('users')
    }
    async function update(id, changes){
        const count = await db('users').where({id}).update(changes)
        if (count){
            return db('users').where({id}).first()
        } else {
            return Promise.resolve(null)
        }
    }
    function remove(id){
        return db('users')
    }