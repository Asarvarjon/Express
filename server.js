 
const express = require("express")
const Joi = require("joi")


// create server
const server = express()

//common middlewears
server.use(express.json())

server.use(
    express.urlencoded({
        extended: true,
    })
);

// response for home page
server.get("/", (request, response) => {
    response.send("Hello world")
})

// array as a database
let users = [{
        name: "Sarvar",
        username: "s_amriev"
    },
    {
        name: "Sherali",
        username: "sheralis"
    },
    {
        name: "John",
        username: "john_doe"
    },
    {
        name: "Alex",
        username: "a_morgan"
    }
]


// Creating new user 

server.post("/users", (request, response) => {
    const book = {
        name: request.body.name,
        username: request.body.username
    }

    users.push(book)
    console.log(book);
    response.status(201)
    response.send(`Yangi element qo'shildi: ${book}`)
})

server.get("/users", (request, response) => {
    response.send(users)
})

server.delete("/users/:name", (request, response) => {
   const item = users.find(x => x.name == request.params.name)

   if(!item) {
     response.status(404)
     response.send("Can't delete") 
        }
        
     let itemIndex = users.indexOf(item)
     users.splice(itemIndex, 1)
     response.send(item)   
})


server.put("/users/:name", (request, response) => {
    const item = users.find(x => x.name == request.params.name)
    console.log(item);

      if(!item) {
            response.status(404)
            response.send("Cannot delete") 
      }

      item.name = request.body.name
      response.status(200)
      response.send(item)
})



const port = 3030
server.listen(port, () => {
    console.log(`Server is on at http://localhost:${port}`);
})