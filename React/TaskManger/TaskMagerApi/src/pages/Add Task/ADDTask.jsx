import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import './ADD.css' ;
import axios from 'axios' ;

function AddTask() {
    const navigate = useNavigate();
    const [Tasks , setTasks] = useState([])
    const [form , setForm] = useState({
        task: '',
        startDate : '',
        endDate : '' ,
        status : ''
    })

    const handleSubmit = async(e) => {
       e.preventDefault()
        
        try{
            const res = await axios.post('http://localhost:8080/add' , form);
            alert(res);
            
            setForm({
                task: '',
                startDate : '',
                endDate : '' ,
                status : ''
            })
        } catch(err){
            console.error('Submit error : ', err)
        }

    }
    

    return (
        <div className="card" >
            <h1>Task Manger</h1>

            <form className="form-container" onSubmit={handleSubmit}>

                <input placeholder="Task"
                 value={form.task} 
                 onChange={(e) => setForm({...form , task : e.target.value})
                 } />

                <input placeholder="startDate" 
                value={form.startDate} 
                onChange={(e) => setForm({...form , startDate : e.target.value})
                } /> 

                <input placeholder="endDate" 
                value={form.endDate} 
                onChange={(e) => setForm({...form , endDate : e.target.value})
                } /> 

                <input placeholder="status" 
                value={form.status} 
                onChange={(e) => setForm({...form , status : e.target.value})
                } />
                <div className="btn-row">

                <button className="btn" type="submit">
                {'Add'}
                </button>
                <button className="btn" type="button" onClick={() => navigate("/showall")}>
                {'Show All'}
                </button>
                </div>

            </form>
        </div>
    )
}

export default AddTask 