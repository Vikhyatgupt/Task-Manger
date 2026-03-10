import { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";

function Delete(){
    const navigate = useNavigate();
    const [Tasks , setTasks] = useState({});
    const {id} = useParams() ;

    const fetchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/getid/${id}`)
      setTasks(res.data)
    } catch (err) {
      console.error('Fetch error: ', err)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [id])
     

    const handleDelete = async(id) => {
        try{
            await axios.delete(`http://localhost:8080/delete/${id}`)
            navigate('/showAll')
        } catch (err){
            console.error('Delete error : ' ,err)
        }
    }

     return(
        <div >
            <h1>Task Manger</h1>

             <div className="card-container">

              
          <div className="task-card" >

            <p><strong>ID:</strong> {Tasks.id}</p>
            <p><strong>Task:</strong> {Tasks.task}</p>
            <p><strong>Start Date:</strong> {Tasks.startDate}</p>
            <p><strong>End Date:</strong> {Tasks.endDate}</p>
            <p><strong>Status:</strong> {Tasks.status}</p>

            <button className="select-btn" onClick={() =>  handleDelete(Tasks.id)}>Delete</button>

          </div>
        
        </div>

        </div>
     )
     
     
    }
    
    export default Delete ;
     