const mongoose = require('mongoose');
const { getAuthor } = require('../services/authServices');
const router = require('express').Router();
const productService = require('../services/productService');
const authService = require('../services/authServices');
const { getOne } = require('../services/recipeService');

router.post('/create', async (req, res) => {
    const { title, type, imageUrl, nutrition, description, _ownerId } = req.body;

    try {
        if (title == "" || type == "" || imageUrl == "") {
            throw "All fields are required!";
        } else {
            const product = await productService.createProduct({
                title,
                type,
                imageUrl,
                nutrition,
                description,
                _ownerId
            });
            res.json(product);
        };
    } catch (err) {
        res.json({ message: err });
    };
});

router.get('/all', async (req, res) => {
    const products = await productService.getAll();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await getOne(productId);
    res.json(product);
});

router.get('/profile/:ownerId', async (req, res) => {
    const _ownerId = mongoose.Types.ObjectId(req.params.ownerId);
    const products = await productService.getAll();
    const owned = products.filter(product => product._ownerId.toString() === _ownerId.toString());
    res.json(owned);
});

router.get('/author/:id', async (req, res) => {
    const userId = req.params.id;
    const author = await getAuthor(userId);
    res.json(author);
});

router.put('/edit/:id', async (req, res) => {
    const data = req.body;
    const productId = req.params.id;
    const editted = await productService.editProduct(productId, data);
    res.json(editted);
});

router.delete('/delete/:id', async (req, res) => {
    const productId = req.params.id;
    const deleted = await productService.deleteProduct(productId);
    res.json(deleted);
});

module.exports = router;