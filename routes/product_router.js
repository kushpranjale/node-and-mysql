const express = require('express');
const db = require('../db/user_db');
const validating = require('../validators/product_schema'); 
const routs= express.Router();


//Adding products
routs.post('/create',(req,res,next) => {
 const sql = "INSERT INTO products (name, quantity, price) VALUES (?,?,?)"
 const {error} = validating(req.body);
 if(error) {
     return res.status(403).send(error.details[0].message)
 }
    db.query(sql,[req.body.name,req.body.quantity,req.body.price],(err,result) => {
        if(err) {
            res.status(500).send({ error: 'Something failed! '+err });
        } else
        res.json({status: 'success', result: result });
    })
});

//fetching all products
routs.get('', (req,res,next) => {
    const sql = `SELECT * FROM products`
    db.query(sql,(err, result) => {
        if(err) {
            res.status(500).send({ error: 'Something failed! '+err });
        }
        else
        res.json({status: 'success', result: result });
    })
});

//Delete Product
routs.delete('/delete/:id', (req,res,next) => {
    const id = req.params.id;
    const sql = `DELETE FROM products WHERE product_id= ${id}`;
    console.log(id)
    db.query(sql, (err, result) => {
        if(err) {
            res.status(500).send({ error: 'Something failed! '+err });
        }
        res.json("succesfuly deleted ")
    })
}); 

//Edit product
routs.put('/edit/:id', (req,res,next) =>{
    const sql = `UPDATE products SET name = ?, quantity = ?, price = ? WHERE product_id = ? `;
    db.query(sql, [req.body.name,req.body.quantity,req.body.price, req.params.id],(err, result) => {
        if(err) {
            res.status(500).send({error: 'somthing failed! '+err})
        }
        res.json({status: 'successfully updated', result: result });
    })
});

//get single product
routs.get('getsingle/:id', (req, res, next) => {
    
    const sql = `select * from products where product_id = ?`
    db.query(sql,req.params.id, (err, result) => {
        if(err) {
            res.status(500).send({error: 'somthing failed! '+err})
        } else
            res.json({status: 'successfully got product', result: result });
    })
});

//get total counts
routs.get('/total',(req,res,next) => {
    const sql = `SELECT COUNT(*) AS 'total products' FROM products`
    db.query(sql,req.params.id, (err, result) => {
        if(err) {
            res.status(500).send({error: 'somthing failed! '+err})
        }

        res.json({status: 'Total numbers', result: result });
    })
});
    
module.exports = routs;