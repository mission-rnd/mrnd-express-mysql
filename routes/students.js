/* This exercise is basically similar in content as the one written with http module.
   But here you will implement the same using express and as a different route.
   Once done, Compare both the works and try to understand the importance of express when writing high functional servers.
 */

/*
* OVERVIEW: In this activity, you will implement a route to manage students. The rest service will store/retrieve students
* in memory. The rest service will implement the following operations:

    GET /students/id  This will read the specified contact from in memory data structure and return it in the response.
    Format for the Response body is:
    {"firstName":"Bill","lastName":"Gates","phone":"32003200"}

    POST /students  This will accept a JSON payload, create the contact in memory data structure and return id in the response.
    Format of JSON request body is: {"firstName":"Bill","lastName":"Gates","phone":"32003200"}
    Format of the JSON response is: {id:<id-of-new-contact}

    PUT /students/id  This will update the specified students details with the details in the JSON payload.
    Only fields that are specified in the request body need to be updated. Other fields of that contact should
    remain unchanged.
    Format of JSON request body is: {"firstName":"Bill","lastName":"Gates","phone":"32003200"}
    Format of the JSON response is: {id:<id-of-updated-contact>}

* ERROR CASES: Handle all error cases including:
    *		Any Url other than urls shown above should return 404
    *		Return bad request if any query string parameters are passed.
*		Return 404 if a non-existent contact id is passed.
*/

var express = require('express');
var router = express.Router();

var sqlHelper = require('./SQLHelper');

var validFilters = ["id", "firstName", "lastName", "gender", "totalMarks"];

router.get('/', function(req, res, next) {
    var filters = null;
    var whereClause = [];
    if(Object.keys(req.query).length > 0) {
        console.log("query params are ", req.query);
        for (var key in req.query) {
            if(validFilters.indexOf(key) == -1) {
                //invalid filter
                res.sendStatus(400);
                return;
            }
            var wc = {};
            wc.column = key;
            wc.value = req.query[key];
            whereClause.push(wc);
        }
        filters = {};
        filters.whereClause = whereClause;
    }
    sqlHelper.getAllByFilter(null, "Students", filters, function(err, result) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.get('/:id', function(req, res){
    if(isNaN(req.params.id)) {
        res.sendStatus(404);
        return;
    }
    console.log("params are ", req.params);
    var whereClause = [{
        column : "id",
        value : parseInt(req.params.id)
    }];
    var filters = {};
    filters.whereClause = whereClause;
    sqlHelper.getAllByFilter(null, "Students", filters, function(err, result) {
        if(err) {
            res.status(400).json(err);
        } else {
            if(result.length == 1) {
                res.status(200).json(result[0]);
            } else {
                res.sendStatus(404);
            }
        }
    });
});

router.post('/',function (req,res) {
    var student = req.body;
    for(var key in student) {
        if(validFilters.indexOf(key) == -1) {
            res.sendStatus(400);
            return;
        }
    }

    if(typeof(student["totalMarks"]) !== "number") {
        res.sendStatus(400);
        return;
    }

    if(student["gender"] != "M" && student["gender"] != "F") {
        res.sendStatus(400);
        return;
    }

    sqlHelper.createRecordHelper(null, "Students", student, function(err, result) {
        if(err) {
            res.status(400).json(err);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id',function (req,res) {
    if(isNaN(req.params.id)) {
        res.sendStatus(404);
        return;
    }

    var student = req.body;

    if(student.hasOwnProperty("totalMarks") && typeof(student["totalMarks"]) !== "number") {
        res.sendStatus(400);
        return;
    }

    if(student.hasOwnProperty("gender") && student["gender"] != "M" && student["gender"] != "F") {
        res.sendStatus(400);
        return;
    }

    if(Object.keys(req.body).length > 0) {
        var whereClause = [{
            column: "id",
            value : req.params.id
        }];

        var filters = {};
        filters.whereClause = whereClause;

        for(var key in student) {
            if(validFilters.indexOf(key) == -1) {
                res.sendStatus(400);
                return;
            }

            if(student[key] == null || student[key] == undefined) {
                delete student[key];
            }
        }

        delete student["id"];

        if(Object.keys(student).length == 0) {
            res.sendStatus(204);
            return;
        }

        sqlHelper.updateRecordHelper(null, "Students", filters, student, function(err, result) {
            if(err) {
                res.status(400).json(err);
            } else {
                if(result.affectedRows == 0) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(204);
                }
            }
        });
    } else {
        res.sendStatus(400);
    }
});

router.delete('/:id', function(req, res) {
    if(isNaN(req.params.id)) {
        res.sendStatus(404);
        return;
    }
    var whereClause = [{
        column : "id",
        value : req.params.id
    }
    ];
    var filters = {};
    filters.whereClause = whereClause;

    sqlHelper.deleteRecordHelper(null, "Students", filters, function(err, result) {
        if(err) {
            res.status(400).json(err);
        } else {
            if(result.affectedRows == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        }
    });
});

module.exports = router;