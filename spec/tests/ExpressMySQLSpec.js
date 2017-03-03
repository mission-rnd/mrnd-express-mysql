function Student(id, firstName, lastName, gender, totalMarks) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.totalMarks = totalMarks;
}

var request = require('request');

var base_url = "http://localhost:3001";
var students_url = base_url + "/students";

describe("Student CRUD", function() {
    var idCreated;

    it("should get 404", function(done) {
        var self = this;
        request.get({
                url: base_url + "/badurl",
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(404);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should get empty set of students ", function(done) {
        var self = this;
        request.get({
                url: students_url + "?id=500",
                json: true
            },
            function(error, response, body) {
                try {

                    expect(response.statusCode).toBe(200);
                    expect(body.length).toBe(0);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should create student", function(done) {
        var self = this;
        var student = new Student(1, "TestUser1", "TestU1", "M", 70);
        request.post({
                url: students_url,
                body: student,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(201);
                    idCreated = 1;
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should create duplicate student", function(done) {
        var student = new Student(1, "TestUser1", "TestU1", "M", 70);
        var self = this;
        request.post({
                url: students_url,
                body: student,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(400);
                    console.log("error duplicate ", body);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should create student 2", function(done) {
        var student = new Student(2, "TestUser2", "TestU2", "M", 80);
        var self = this;
        request.post({
                url: students_url,
                body: student,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(201);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should create student 3", function(done) {
        var student = new Student(3, "TestUser3", "TestU3", "F", 67);
        var self = this;
        request.post({
                url: students_url,
                body: student,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(201);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should get all the set of students ", function(done) {
        var self = this;
        request.get({
                url: students_url,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(200);
                    expect(body.length).toBe(3);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should get all the set of male students ", function(done) {
        var self = this;
        request.get({
                url: students_url + "/?gender=M",
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(200);
                    expect(body.length).toBe(2);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should get all the set of students with invalid filters", function(done) {
        var self = this;
        request.get({
                url: students_url + "/?invalid=M",
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(400);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should retrieve student 1", function(done) {
        var self = this;
        request.get({
                url: students_url + "/" + idCreated,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(200);
                    expect(body.firstName).toBe("TestUser1");
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should update student 1", function(done) {
        var self = this;
        var updatedStudent = {};
        updatedStudent.lastName = "TestUserLast";

        request.put({
                url: students_url + "/" + idCreated,
                body: updatedStudent,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(204);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should update student 1 with invalid totalMarks", function(done) {
        var self = this;
        var updatedStudent = {};
        updatedStudent.lastName = "TestUserLast";
        updatedStudent.totalMarks = "24";

        request.put({
                url: students_url + "/" + idCreated,
                body: updatedStudent,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(400);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should ignore null values in update operation of student 1", function(done) {
        var self = this;
        var updatedStudent = {};
        updatedStudent.firstName = null;

        request.put({
                url: students_url + "/" + idCreated,
                body: updatedStudent,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(204);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should retrieve updated student with id 1", function(done) {
        var self = this;
        request.get({
                url: students_url + "/" + idCreated,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(200);
                    expect(body.lastName).toBe("TestUserLast");
                    expect(body.firstName).toBe("TestUser1");
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should not modify id in update operation ", function(done) {
        var self = this;
        var updatedStudent = {};
        updatedStudent.lastName = "TestUserUpdated";
        updatedStudent.id = 13;

        request.put({
                url: students_url + "/" + idCreated,
                body: updatedStudent,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(204);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should retrieve updated student with id 1 again", function(done) {
        var self = this;
        request.get({
                url: students_url + "/" + idCreated,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(200);
                    expect(body.lastName).toBe("TestUserUpdated");
                    expect(body.id).toBe(1);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should delete the student id 1", function(done) {
        var self = this;
        request.del({
            url: students_url + "/" + idCreated,
            json: true
        }, function(err, response, body) {
            try {
                expect(response.statusCode).toBe(204);
                done();
            } catch (e) {
                self.fail(Error(e));
                done();
            }
        });
    });

    it("should delete the student id 2", function(done) {
        var self = this;
        request.del({
            url: students_url + "/2",
            json: true
        }, function(err, response, body) {
            try {
                expect(response.statusCode).toBe(204);
                done();
            } catch (e) {
                self.fail(Error(e));
                done();
            }
        });
    });

    it("should delete the student id 3", function(done) {
        var self = this;
        request.del({
            url: students_url + "/3",
            json: true
        }, function(err, response, body) {
            try {
                expect(response.statusCode).toBe(204);
                done();
            } catch (e) {
                self.fail(Error(e));
                done();
            }
        });
    });

    it("should update student 1 after deletion", function(done) {
        var self = this;
        var updatedStudent = {};
        updatedStudent.lastName = "TestUserLast";

        request.put({
                url: students_url + "/" + idCreated,
                body: updatedStudent,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(404);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should throw 404 for update operation without passing id", function(done) {
        var self = this;
        var updatedStudent = {};
        updatedStudent.lastName = "TestUserLast";

        request.put({
                url: students_url + "/",
                body: updatedStudent,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(404);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should throw 404 for delete operation without passing id", function(done) {
        var self = this;
        request.del({
            url: students_url + "/",
            json: true
        }, function(err, response, body) {
            try {
                expect(response.statusCode).toBe(404);
                done();
            } catch (e) {
                self.fail(Error(e));
                done();
            }
        });
    });


    it("should throw 404 if specified record is not found", function(done) {
        var self = this;
        request.del({
            url: students_url + "/" + idCreated,
            json: true
        }, function(err, response, body) {
            try {
                expect(response.statusCode).toBe(404);
                done();
            } catch (e) {
                self.fail(Error(e));
                done();
            }
        });
    });

    it("should create student with invalid totalMarks ", function(done) {
        var self = this;
        var student = new Student(4, "TestUser1", "TestU1", "M", "80");
        request.post({
                url: students_url,
                body: student,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(400);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

    it("should create student with invalid gender ", function(done) {
        var self = this;
        var student = new Student(4, "TestUser1", "TestU1", "G", 80);
        request.post({
                url: students_url,
                body: student,
                json: true
            },
            function(error, response, body) {
                try {
                    expect(response.statusCode).toBe(400);
                    done();
                } catch (e) {
                    self.fail(Error(e));
                    done();
                }
            });
    });

});