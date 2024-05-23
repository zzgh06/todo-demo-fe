import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from './utils/api'

function App() {
  const [taskList, setTaskList] = useState([])
  const [taskValue, SetTaskValue] = useState('');

  const getTask = async () => {
    const response = await api.get('/tasks');
    // console.log('Task : ', response.data.data)
    setTaskList(response.data.data)
  }

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task:taskValue,
        isComplete:false,
      });
      if (response.status === 200) {
        SetTaskValue('')
        getTask()
      } else {
        throw new Error('No tasks added')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const toggleComplete = async (id) => {
    try {
      const task = taskList.find(item => item._id === id);
      const response = await api.put(`/tasks/${id}`,{
        isComplete: !task.isComplete
      })
      if (response.status === 200) {
        getTask()
      } else {
        throw new Error('Task has not been modified')
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200){
        getTask()
      } else {
        throw new Error('Task not deleted')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getTask()
  }, [])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={taskValue}
            onChange={(e)=>{SetTaskValue(e.target.value)}}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard 
        taskList={taskList}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </Container>
  );
}

export default App;
