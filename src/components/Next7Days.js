import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Todo from './Todo';

function Next7Days({ todos }) {
   const [weekTodos, setWeekTodos] = useState([]);

   useEffect(() => {
      const days = ['0', '1', '2', '3', '4', '5', '6'];

      const sortTodosByDay = days.map(day => {
         return {
            todos : todos.filter( todo => todo.day === day),
            number : day
         }
      })

      const today = parseInt(moment().format('d'));
      const arrangeDays = sortTodosByDay.slice(today).concat(sortTodosByDay.slice(0, today));

      setWeekTodos(arrangeDays);

   }, [todos]);

   return (
      <div className="NextDays">
         {
            weekTodos.map( day => 
               <div key={day.number}>
                  <div className="day">
                     <div className="name">
                        { moment(day.number, 'd').format('dddd') }
                        { day.number === moment().format('d') && ' (Today)'}
                     </div>

                     <div className="total-todos">
                        ({ day.todos.length })
                     </div>
                  </div>

                  <div className="todos">
                     {
                        day.todos.map( todo => 
                           <Todo key={todo.id} todo={todo} />
                        )
                     }
                  </div>
               </div>

            )
         }
      </div>
   )
}

export default Next7Days;