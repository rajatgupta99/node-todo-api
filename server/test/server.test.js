const expect = require('expect');
const request = require('supertest');
const {ObjectID}  = require('mongodb');

const {app} = require('./../server');
const {Todo}  = require('./../model/todo');

//Executes before executing describe block
// beforeEach((done) =>  {
//     Todo.deleteMany({}).then(() =>  {
//       done();
//     })
// });

describe('POST /todos', ()  =>  {
    it('should created a new todo', (done)  =>  {
        var text = 'This is my test note';
        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) =>  {
              expect(res.body).toBeA('object').toInclude({text: text});
          })
        .end((err, res) =>  {
          if(err){
            return done(err);
          }

          Todo.find({text}).then((todos)  =>  {
            // expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((err)  =>  {
              done(err);
          });

        });
    });

    it('should not create Todo', (done) =>  {
        var text = '';

        request(app)
          .post('/todos')
          .send({text})
          .expect(400)
          .end((err, resp) =>  {
              if(err){
                return done(err);
              }

              Todo.find({text}).then((todos)  =>  {
                  expect(todos.length).toBe(0);
                  done();
              }).catch((err)  =>  {
                  done(err);
              })
          })
    })
});

describe('GET /todos', () =>  {
    it('should get all todos', (done) =>  {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((resp)  =>  {
          expect(resp).toIncludeKey('text');
        })
        .end(done);
    })
});

describe('GET /todos/id', ()  =>  {
  var id = '5c555903f70e1f771c969234';
  describe('#validID', () =>  {
    it('should return data', (done) =>  {
      request(app)
      .get(`/todos/${id}`)
      .expect(200)
      .expect((output)  =>  {
        expect(output).toIncludeKey('text');
      })
      .end(done);
    })
  });

  var idErr = new ObjectID().toHexString();
  describe('#noData', () =>  {
    it('should return 404 if todo not found', (done) =>  {
      request(app)
      .get(`/todos/${idErr}`)
      .expect(404)
      .end(done);
    })
  });

  var idInvalid = '6bd';
  describe('#invalidID', () =>  {
    it('should return 404 if invalid ID', (done) =>  {
      request(app)
      .get(`/todos/${idInvalid}`)
      .expect(404)
      .end(done);
    })
  });
});


describe('DELETE /todos/:id', ()  =>  {
    var deleteId = '5c555903f70e1f771c969234';
    describe('#validID',  ()  =>  {
      it('should delete the todo with id',  (done)  =>  {
        request(app)
        .delete(`/todos/${deleteId}`)
        .expect(200)
        .expect((output)  =>  {
          expect(output).toIncludeKey('text');
        })
        .end(done);
      });
    });

    var deleteIdNoData = '5c5545c3a146fb7c80c86725';
    describe('#noData', ()  =>  {
      it('should 404 if id not found',  (done)  =>  {
        request(app)
        .delete(`/todos/${deleteIdNoData}`)
        .expect(404)
        .end(done);
      });
    });

    var deleteIdInvalid = '338';
    describe('#invalidID', () =>  {
      it('should 404 if invalid ID',  (done)  =>  {
        request(app)
        .delete(`/todos/${deleteIdInvalid}`)
        .expect(404)
        .end(done);
      });
    });
});

describe('PUT /todos/:id', () =>  {
  var updateID = '5c55598f2fff0522ec4d4185';
  var body = {
    'text': 'This is updated record',
    'completed': true
  }
  describe('#validID', () =>{
    it('should update the record successfully', (done)  =>  {
        request(app)
        .put(`/todos/${updateID}`)
        .send({body})
        .expect(200)
        .expect((output)  =>  {
          expect(output).toIncludeKey('text');
        })
        .end(done);
    });
  });
  
});
