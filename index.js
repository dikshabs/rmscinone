const express = require('express');
const app = express();
const mysql = require('mysql');
const  cors = require('cors');

app.use(cors());
app.use(express.json());
const db =  mysql.createConnection({
  host     : process.env.localhost,
  user     : process.env.diksha,
  password : process.env.amanni168375,
  database : process.env.employeesystem,
  
});
db.connect(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('getCustomer microservice is now connected with mysql database...')
})

app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const address = req.body.address;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query("INSERT INTO employees (name, age, address, position, salary) VALUES (?,?,?,?,?)", 
    [name, age, address, position, salary], 
    (err, result) => { 
        if (err) {
            console.log(err);
        }else{
            res.send("Value Inserted");
        }
    });
});


app.get('/employees', (req,res) => {
    db.query("SELECT * FROM employees", (err, result) => { 
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    }); 
});

app.put('/update',(req,res) => {
 const id = req.body.id;
  const salary = req.body.salary;
  db.query(
    "UPDATE employees SET salary = ? WHERE id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, ()=> {
    console.log("its working fynnn");
});
