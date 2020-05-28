const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const users = require('../../Users')

// Get all users API route
router.get('/', (req, res) => {
    res.json(users)
})

// Getting single result by Id
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ message: 'User not found'})
    }
})

// Adding a new User
router.post('/', (req, res) => {
    if(!req.body.name || !req.body.age || !req.body.color){
        return res.status(400).json({
            message: "name, age & color are required"
        })
    }
    const postData = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        color: req.body.color
    }
    users.push(postData)
    res.redirect('/')

    // for APIs only
    // res.send(users)
})

// Updating a User by Id
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    const postData = req.body
    if(found){
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.name = postData.name ? postData.name : user.name
                user.age = postData.age ? postData.age : user.age
                user.color = postData.color ? postData.color : user.color

                res.json({ message: 'User updated successfully', user })
            }
        })
    } else {
        res.status(400).json({ message: 'User not found'})
    }
})

// Deleting a User by Id
router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if(found){
        res.json({
            message: "User has been deleted successfully", users: users.filter(user => user.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ message: 'User not found'})
    }
})

module.exports = router;