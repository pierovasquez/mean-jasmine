const express = require('express');
const logger = require('morgan');
const http = require('http');
const PinsRouter = require('./routes/pins');
const Pins = require('./models/Pins');
const request = require('request');
const axios = require('axios');
requestPromise = require('request-promise-native');
const app = express();


app.use(logger('dev'))
app.use(express.json());
app.use('/api', PinsRouter.router);
app.use('port', 3000);


describe('Testing Router', () => {
  let server;

  beforeAll(() => {
    // Creating a server based on our express app
    server = http.createServer(app);
    server.listen(3000)
  })

  afterAll(() => {
    // We should close the server connection otherwise we could have problems with the net.
    server.close();
  })

  describe('GET', () => {
    // GET 200
    it('200 and find pin', (done) => {
      const data = [{
        id: 1
      }];
      spyOn(Pins, 'find').and.callFake((callBack) => {
        callBack(false, data);
      })

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{
          id: 1
        }])
        done();
      })

    })

    // GET 500
    it('500', (done) => {
      const data = [{
        id: 1
      }];
      spyOn(Pins, 'find').and.callFake((callBack) => {
        callBack(true, data);
      })

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    })


    // Get 200 FindById
    it("200 and findById pin", done => {
      const data = {
        id: 1
      };
      /* Dentro del Objeto Pins queremos espiar el metodo findById y ejecutamos nuestro propio metodo */
      spyOn(Pins, "findById").and.callFake((id, callBack) => {
        data.param = id;
        callBack(false, data);
      });

      request.get("http://localhost:3000/api/21312", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBe(null);
        expect(JSON.parse(response.body)).toEqual({
          id: 1,
          param: "21312"
        });
        expect(JSON.parse(response.body).id).toEqual(1);
        expect(JSON.parse(body).param).toEqual("21312");
        done();
      });
    });

    //GET 500 FindById
    it("500", done => {
      const data = [{
        id: 1
      }];
      /* Dentro del Objeto Pins queremos espiar el metodo find y ejecutamos nuestro propio metodo */
      spyOn(Pins, "findById").and.callFake((id, callBack) => {
        callBack(true, data);
      });

      request.get("http://localhost:3000/api/21312", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  })

  describe('POST', () => {
    it('200', done => {
      const post = [{
        title: 'Piero',
        author: 'Piero',
        description: 'Piero rules',
        percentage: 0,
        tags: [],
        assets: [{
          title: 'Piero',
          description: 'description',
          readed: false,
          url: 'http://piero.com'
        }]
      }]
      spyOn(Pins, 'create').and.callFake((pin, callBack) => {
        callBack(false, {});
      })

      spyOn(requestPromise, 'get').and.returnValue(
        Promise.resolve('<title>Piero</title><meta name="description" content="Piero rules">')
      )

      const assets = [{
        url: 'http://piero.com'
      }]
      axios.post('http://localhost:3000/api', {
        title: 'title',
        author: 'author',
        description: 'description',
        assets
      }).then(res => {
        expect(res.status).toBe(200);
        done();
      })
    })

    it('200 PDF', done => {
      spyOn(Pins, 'create').and.callFake((pins, callBack) => {
        callBack(false, {})
      })

      const assets = [{
        url: 'http://piero.pdf'
      }]

      axios.post('http://localhost:3000/api', {
        title: 'title',
        author: 'author',
        description: 'description',
        assets
      }).then(res => {
        expect(res.status).toBe(200);
        done();
      })
    })

    it('500 PDF', done => {
      spyOn(Pins, 'create').and.callFake((pins, callBack) => {
        callBack(false, {});
      });

      spyOn(requestPromise, "get").and.returnValue(

      );

      const assets = [{
        url: 'http://piero.com'
      }];

      axios.post('http://localhost:3000/api', {
          title: 'title',
          author: 'author',
          description: 'description',
          assets
        })
        .catch(error => {
          expect(error.response.status).toBe(500);
          done()
        })

    })
  })
})
