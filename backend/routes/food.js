const router = require('express').Router()
const Food = require('../models/Food')

// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find()
    res.json(foods)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create food
router.post('/', async (req, res) => {
  try {
    const food = new Food(req.body)
    const savedFood = await food.save()
    res.status(201).json(savedFood)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update food
router.put('/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(food)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete food
router.delete('/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id)
    res.json({ message: 'Food deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router 