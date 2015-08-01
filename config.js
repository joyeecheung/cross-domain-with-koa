module.exports = {
  mockdata: function(id) {
    id: id,
    title: "Consectetur adipisicing elit"
    content: "Lorem ipsum dolor sit amet"
  },
  port: 3000,
  cors: {
    origin: "http://foo.com",  // Access-Control-Allow-Origin
    methods: ["GET", "POST"],  // Access-Control-Allow-Methods
  }
}
