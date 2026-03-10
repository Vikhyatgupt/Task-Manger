import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios' ;
import './show.css'

function ShowAll() {
    const navigate = useNavigate();
    const [Tasks , setTasks] = useState([])
    const [id , setid] = useState("") ;
     
     const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/getall')
      setTasks(res.data)
    } catch (err) {
      console.error('Fetch error: ', err)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handelSearch = async(id) => {
        try{
          alert(id);
            navigate(`/delete/${id}`);
        }catch(err){
          alert(err);
        }
    }

    return (
        <div className="page-container">
            <h1 className="title">
                Task List
            </h1>
            
            <div className="search-container">
            <input placeholder="Search by Id" 
                onChange={(e) => setid(e.target.value)} />
            <button onClick={() => handelSearch(id)}>Search</button> 
            <button onClick={() => navigate("/add")}>ADD</button>
            </div> 

            <div className="card-container">

             {Tasks.map((T) => (
          <div className="task-card" key={T.id}>

            <p><strong>ID:</strong> {T.id}</p>
            <p><strong>Task:</strong> {T.task}</p>
            <p><strong>Start Date:</strong> {T.startDate}</p>
            <p><strong>End Date:</strong> {T.endDate}</p>
            <p><strong>Status:</strong> {T.status}</p>

            <button className="select-btn" onClick={() => navigate(`//delete/${T.id}`)}>Select</button>

          </div>
        ))}
        </div>
            
        </div>
    )
}

export default ShowAll ;