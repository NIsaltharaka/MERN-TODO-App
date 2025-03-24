const router = require("express").Router();

const todoItemModels = require("../models/todoitem");

router.post('/api/items', async (req,res)=>{
    try {
        const newItem = new todoItemModels({
            item:req.body.item,
            price:req.body.price
        })
        const saveItem = await newItem.save()
        res.status(200).json("item added successfully!");

    } catch (error) {
        res.json(err)
    }
})

router.get('/api/items', async (req,res)=>{
    try {
        const allTodoItems = await todoItemModels.find({})
        res.status(200).json(allTodoItems);
    } catch (error) {
        res.json(err)
    }
})

router.put('/api/items/:id', async (req,res)=>{
    try {
        const updateItem = await todoItemModels.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json("item updated!");
    } catch (error) {
        res.json(err)
    }
})

router.delete('/api/items/:id', async (req,res)=>{
    try {
        const deleteItem = await todoItemModels.findByIdAndDelete(req.params.id)
        res.status(200).json("item deleted successfull!");
    } catch (error) {
        res.json(err)
    }
})

module.exports=router;