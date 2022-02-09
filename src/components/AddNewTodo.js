import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context';
import Modal from './Modal';
import TodoForm from './TodoForm';
import firebase from '../firebase';
import { calendarItems } from '../constants';
import moment from 'moment';
import randomcolor from 'randomcolor';

function AddNewTodo() {
   const { projects, selectedProject } = useContext(TodoContext);

   const [showModal, setShowModal] = useState(false);
   const [text, setText] = useState('');
   const [day, setDay] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [todoProject, setTodoProject] = useState(selectedProject);


   function handleSubmit(e){
      e.preventDefault();

      if( text && !calendarItems.includes(todoProject)) {
         firebase
         .firestore()
         .collection('todos')
         .add(
            {
               text : text,
               date : moment(day).format('DD/MM/YYYY'),
               day : moment(day).format('d'),
               time : moment(time).format('hh:mm A'),
               checked : false,
               color: randomcolor({luminosity : 'dark'}),
               projectName : todoProject
            }
         )
         setShowModal(false);
         setText('');
         setDay(new Date());
         setTime(new Date());

      }
   }

   useEffect(() => {
      setTodoProject(selectedProject);
   }, [selectedProject]);

   return (
      <div className="add-new-todo">
         <div className="btn-container">
            <button onClick={() => { setShowModal(true) }}>
               + New Todo
            </button>
         </div>

         <Modal showModal={showModal} setShowModal={setShowModal}>
            <div className="form-container">
               <TodoForm 
                  handleSubmit={handleSubmit}
                  heading="Add New Todo!"
                  text={text}
                  setText={setText}
                  day={day}
                  setDay={setDay}
                  time={time}
                  setTime={setTime}
                  todoProject={todoProject}
                  setTodoProject={setTodoProject}
                  projects={projects}
                  showButton={true}
                  setShowModal={setShowModal}
               />
            </div>
         </Modal>
      </div>
   )
}

export default AddNewTodo;