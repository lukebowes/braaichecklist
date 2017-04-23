/**
 * Created by LukeDogg on 2017/04/23.
 */

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    "use strict";
    
    app.get('/checklist', function(req, res){


        var id = new ObjectID (req.query.id)
        const details = { '_id': id};

        console.log(id);

        console.log(req.query.id);

        db.collection('braai').findOne( details, function(err, items){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(items);
            }
        });
    });

    app.post('/checklist', function(req, res) {

        console.log(req.body)

        console.log('adding header');
        //addheader

        if (req.body == undefined) {
            res.send({'error': "Missing values for beer and braai level"});
            return;
        }

        var braaiRec = {
            createDate : app.locals.moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
            description : req.body.description
        }

        var checklist = {

        }

        db.collection('braai').insert(braaiRec, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred, while adding the braai record' });
            } else {


                console.log(result.ops[0]);
                
                var id = result.ops[0]._id;


                if ((req.body.beer || 'no') =='Yes'){
                    //add beer to the list

                }
                
                var braaiLevel = ((req.body.level || 'Standard'))

                var checklist = {}
                
                switch (braaiLevel.toLowerCase()){
                    case "standard" :
                         checklist = [
                             {HeadId : id ,Description:"Porter House Steak", quantity: "5", metric:"Kg"},
                             {HeadId : id ,Description:"Green Salad", quantity: "2", metric:"Bags"},
                             {HeadId : id ,Description:"Chips", quantity: "2", metric:"Bags"},
                             {HeadId : id ,Description:"Chops", quantity: "2", metric:"Kg"},
                             {HeadId : id ,Description:"Dip", quantity: "2", metric:"Container"},
                             {HeadId : id ,Description:"Garlic Rolls", quantity: "2", metric:"Dozen"},
                             {HeadId : id ,Description:"Cases", quantity: "1", metric:"Dozen"},
                         ];
                        break;
                    case "meduim" :
                        checklist = [
                            {HeadId : id ,Description:"Porter House Steak", quantity: "10", metric:"Kg"},
                            {HeadId : id ,Description:"Green Salad", quantity: "5", metric:"Bags"},
                            {HeadId : id ,Description:"Chips", quantity: "5", metric:"Bags"},
                            {HeadId : id ,Description:"Chops", quantity: "5", metric:"Kg"},
                            {HeadId : id ,Description:"Dip", quantity: "5", metric:"Container"},
                            {HeadId : id ,Description:"Garlic Rolls", quantity: "5", metric:"Dozen"},
                            {HeadId : id ,Description:"Malva Pudding", quantity: "1", metric:"Dozen"},
                            {HeadId : id ,Description:"Malva Pudding", quantity: "1", metric:"Dozen"},
                            {HeadId : id ,Description:"Beer", quantity: "4", metric:"Cases"},

                        ];
                        break;
                    case "large" :
                        checklist = [
                            {HeadId : id ,Description:"Porter House Steak", quantity: "20", metric:"Kg"},
                            {HeadId : id ,Description:"Green Salad", quantity: "10", metric:"Bags"},
                            {HeadId : id ,Description:"Chips", quantity: "10", metric:"Bags"},
                            {HeadId : id ,Description:"Chops", quantity: "10", metric:"Kg"},
                            {HeadId : id ,Description:"Dip", quantity: "10", metric:"Container"},
                            {HeadId : id ,Description:"Garlic Rolls", quantity: "10", metric:"Dozen"},
                            {HeadId : id ,Description:"Malva Pudding", quantity: "3", metric:"Containers"},
                            {HeadId : id ,Description:"Ice", quantity: "10", metric:"Bags"},
                            {HeadId : id ,Description:"Beer", quantity: "10", metric:"Cases"},

                        ];
                        break;

                }

                db.collection('braaiChecklist').insertMany(checklist,function(checkErr,checkRes){
                    if (checkErr) {
                        res.send({ 'error': 'An error has occurred, while adding the braai checklist record' });
                    } else {

                        console.log(checkRes.ops);

                        res.send(checkRes.ops);
                    }
                });
            }
         });

    });

};