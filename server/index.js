const express = require('express');
const cors = require('cors');
const { addGood, getBasketGoods } = require('./helpers');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./static'));

app.get('/', (req, res) => {
    res.send('<h1>hello!</h1>')
});

app.get('/basketgoods', (req, res) => {
    // console.log("app.get(basketgoods");
    getBasketGoods().then((data) => {
        res.send(data);
    });
});

app.post('/:id', (req, res) => {
    // console.log("app.post");
    addGood(req.params.id).then(() => {
        getBasketGoods().then((data) => {
            res.send(data);
        });
    }).catch((err) => {
        res.send(err);
    });
});

app.delete('/delete/:id', (req, res) => {
    // console.log("app.delete");
    deleteGood(req.params.id).then(() => {
        getBasketGoods().then((data) => {
            res.send(data);
        });
    }).catch((err) => {
        res.send(err);
    });
});

app.listen('8000', () => {
    console.log('Server run!');
});