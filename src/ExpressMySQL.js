/**
 * Student model - id (integer)
 *                  firstName (text)
 *                  lastName (text)
 *                  gender (character) [M / F] ** only!
 *                  totalMarks (integer)
 *
 *
 * ----------- Write CRUD operations on Students data in models/students.js -----------
 *
 * ----------- All the requests for /students should be handled in routes/students.js -----------
 *
 *
 * ================== APIs To be implemented ==================
 *
 * 1. GET /students
 *
 * Retrieve all the students from the database.
 *
 * Sample response: [{
 *      id: 10,
 *      firstName: "user1",
 *      lastName: "user1",
 *      gender: "M",
 *      totalMarks: 35
 * }, {
 *      id: 11,
 *      firstName: "user2",
 *      lastName: "user2",
 *      gender: "M",
 *      totalMarks: 45
 * }, {
 *      id: 12,
 *      firstName: "user3",
 *      lastName: "user3",
 *      gender: "F",
 *      totalMarks: 45
 * }]
 *
 *
 * 2. GET /students?(filters...)
 *
 * Sample request: GET /students?gender=M - Retrieves all the Male students
 *
 * Sample response: [{
 *      id: 10,
 *      firstName: "user1",
 *      lastName: "user1",
 *      gender: "M",
 *      totalMarks: 35
 * }, {
 *      id: 11,
 *      firstName: "user2",
 *      lastName: "user2",
 *      gender: "M",
 *      totalMarks: 45
 * }]
 *
 * 3. GET /students/:id
 *
 * Sample request: GET /students/10 - Retrieve student with id 10.
 *
 * Sample response :  {
 *      id: 10,
 *      firstName: "user1",
 *      lastName: "user1",
 *      gender: "M",
 *      totalMarks: 35
 * }
 *
 * 4. POST /students - Create a student record.
 *
 * Sample request body - {
 *      id: 10,
 *      firstName: "user1",
 *      lastName: "user1",
 *      gender: "M",
 *      totalMarks: 35
 * }
 *
 * 5. PUT /students/:id
 *
 * Sample request: PUT /students/10 - Updates student with id 10.
 *
 * Sample request body - {
 *      id: 10,
 *      firstName: "user1",
 *      lastName: "user1",
 *      gender: "M",
 *      totalMarks: 35
 * }
 *
 * 6. DELETE /students/:id
 *
 * Sample request: DELETE /students/10 - Deletes student with id 10.
 *
 * Error cases:
 *
 * 1. For GET, PUT and DELETE operations /students/:id , If the student is not available with given id, return 404. (Not found)
 *
 * 2. For GET /students/?filters, if an invalid filter is send, return 400 (Bad request)
 *
 * 3. For POST /students, if duplicate id found, return 400 (Bad request).
 *
 * Success http responses:
 *
 * 1. GET operations
 *      a. Return 200 if Operation succeeds.
 *      b. Return 400 in case of invalid requests.
 *
 * 2. POST operations
 *      a. Return 202 (Created) if operation suceeds.
 *      b. Return 400 in case of invalid request.
 *
 * 3. PUT Operations
 *      a. Return 204 (No Content) if operation succeeds.
 *      b. Return 400 in case of invalid request.
 *      c. Return 404 in case of Not found.
 *
 * 4. DELETE Operations
 *      a. Return 204 (No Content) if operation succeeds.
 *      b. Return 400 in case of invalid request.
 *      c. Return 404 in case of Not found.
 *
 */

var express = require('express');
var app = express();

//adding the student's route!
var students = require('../routes/students');
app.use("/students",students);

var server = app.listen(3001, function () {
    var port = server.address().port;

    console.log("Example app listening at port %s", port);
});