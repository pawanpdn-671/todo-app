import React, { useState, useContext, useEffect } from 'react';
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import moment from 'moment';
import firebase from '../firebase';

function EditTodo() {

   const [text, setText] = useState('');
   const [day, setDay] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [todoProject, setTodoProject] = useState('');

   const { selectedTodo, projects } = useContext(TodoContext);

   useEffect(() => {
      if(selectedTodo) {

         setText(selectedTodo.text);
         setDay(moment(selectedTodo.date, 'DD/MM/YYYY'));
         setTime(moment(selectedTodo.time, 'hh:mm A'));
         setTodoProject(selectedTodo.projectName)
      }
      
   }, [selectedTodo]);


   useEffect(() => {

      if(selectedTodo){
         firebase
         .firestore()
         .collection('todos')
         .doc(selectedTodo.id)
         .update({
            text,
            date : moment(day).format('DD/MM/YYYY'),
            day : moment(day).format('d'),
            time : moment(time).format('hh:mm A'),
            projectName : todoProject
         })
      }

   }, [text, day, time, todoProject]);


   return (
      <div>
         {
            selectedTodo &&
            <div className="EditTodo">
               <div className="header">
                  Edit Todo
               </div>

               <div className="container">
                  <TodoForm 
                        text={text}
                        setText={setText}
                        day={day}
                        setDay={setDay}
                        time={time}
                        setTime={setTime}
                        todoProject={todoProject}
                        setTodoProject={setTodoProject}
                        projects={projects}
                     />
               </div>
            </div>
         }
      </div>
   )
}

export default EditTodo;