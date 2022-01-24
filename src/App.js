
import './App.css';
import { useState } from "react"; 
import Axios from 'axios'

function App() {

  const[name, setName] = useState("");
  const[age, setAge] = useState(0);
  const[address, setAddress] = useState("");
  const[position, setPosition] = useState("");
  const[salary, setSalary] = useState(0);


  const [employeeList, setEmployeeList] = useState([]);

  const [newSalary, setNewSalary] = useState(0)

  
  const addEmployee =() => {
      console.log(name);
      Axios.post("http://localhost:3001/create", {
        name:name,
        age:age, 
        address:address,
        position:position,
        salary:salary,
      }).then(() => {
        console.log("success");
        setEmployeeList([...employeeList, {
        name:name,
        age:age, 
        address:address,
        position:position,
        salary:salary,
      },
      ]);
      });
  };

  const updateEmployeeSalary = (id) => {
    Axios.put("http://localhost:3001/update", { salary: newSalary, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  address: val.address,
                  age: val.age,
                  position: val.position,
                  salary: newSalary,
                }
              : val;
          })
        );
      }
    );
  };

  const getEmployees = () => {
      Axios.get("http://localhost:3001/employees").then((response) => {
       setEmployeeList(response.data);
      });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
      <label>Name:</label>
      <input type="text" onChange={(event) => {setName(event.target.value);}}></input>
      <label>Age:</label>
      <input type="number" onChange={(event) => {setAge(event.target.value);}}></input>
      <label>Address:</label>
      <input type="text" onChange={(event) => {setAddress(event.target.value);}}></input>
      <label>Position:</label>
      <input type="text" onChange={(event) => {setPosition(event.target.value);}}></input>
      <label>Salary(per year):</label>
      <input type="number" onChange={(event) => {setSalary(event.target.value);}}></input>
      <button onClick={addEmployee}>Add Employee</button>
      </div>
      
      <div className="employees">
      <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val,key) => {
          return (
          <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Address: {val.address}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Salary: {val.salary}</h3>
                </div>
                <div>
                <input type="text" placeholder="new salary" onChange={(event) => {
                    setNewSalary(event.target.value);
                  }}/>
                <button onClick={() => {
                    updateEmployeeSalary(val.id);
                  }}>Update</button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>  
                </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}

export default App;
