import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addJob, deleteJob, changeStatus,filterData } from './redux/reducers/todoList';
import './App.css';

export default function App() {
  const [job, setJob] = useState({
    name: '',
    id: '',
    status: false
  });

  const [switchOn, setSwitchOn] = useState(false);

  const handleChange = (event) => {
    setJob({
      name: event.target.value,
      id: '',
      status: false,
    });
  };

  const getJobs = useSelector((state) => {
    return state.todoList;
  });
  
  const dispatch = useDispatch();

  const addTodo = () => {
    dispatch(addJob(job));
    setJob({
      name: '',
      id: '',
      status: false
    });
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(addJob(job));
      setJob({
        name: '',
        id: '',
        status: false
      });
    }
  };
  const handleCheckboxChange = (id ) => {
    dispatch(changeStatus(id));
    
  };
  const filterJob = ()=>{
    dispatch(filterData())
  }
 
  useEffect(() => {
    const todoList = document.querySelector('.box3');
    if (switchOn) {
      todoList.classList.add('crossed-out');
    } else {
      todoList.classList.remove('crossed-out');
    }
  }, [switchOn]);



  return (
    <div className='box1'>
      <div className='box2'>
        <h1 className='font-mono'>Todo List</h1>
        <p className='box9'>Get things done, one item at a time</p>
        <p>__________________________________</p>
      </div>

      <ul className='box3'>
        {getJobs.map((item, index) => {
          return (
            <li key={index} style={{ listStyleType: 'none' }}>
              <span style={{ textDecoration: item.status ? 'line-through' : '' }}>
                {item.name}
              </span>
              <div className='box5'>
                <input
                  checked={item.status}
                  className='box7'
                  type='checkbox'
                  onChange={() => {
                  handleCheckboxChange(item.id);
                    
                  }}
                />
                <span
                  className='material-symbols-outlined box6'
                  onClick={() => dispatch(deleteJob(index))}
                >
                  delete
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className='box8'>
        <p>Move done items at the end?</p>
      <div className='switch'>
        <input
          type='checkbox'
          id='toggleSwitch'
          checked={switchOn}
          onChange={() => {setSwitchOn(!switchOn);
            filterJob();
          }}
         
        />
        <label htmlFor='toggleSwitch'></label>
      </div>
      </div>
      <h3>Add to the todo list</h3>
      <div>
        <input
          type='text'
          value={job.name}
          onChange={handleChange}
          className='box4'
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>ADD ITEM</button>
      </div>
    </div>
  );
}
