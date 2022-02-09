import React from 'react';
import { Bell, Clock, CalendarDay, Palette, X } from 'react-bootstrap-icons';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function TodoForm({
   handleSubmit,
   heading=false,
   text, setText,
   day, setDay, 
   time, setTime,
   todoProject, setTodoProject,
   projects,
   showButton = false,
   setShowModal = false
}) {

   return (

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <form onSubmit={handleSubmit} className="todo-form">
            <div className="text">
               {
                  heading &&
                  <h3>{heading}</h3>
               }
               <input 
                  type="text" 
                  value={text}   
                  onChange={e => setText(e.target.value)}
                  placeholder='Todo...'
                  autoFocus
               />
            </div>

            <div className="remind">
               <Bell />
               <p>Remind me!</p>
            </div>

            <div className="pick-day">
               <div className="title">
                  <CalendarDay />
                  <p>Choose a day</p>
               </div>
               <DatePicker value={day} onChange={day => setDay(day)} />
            </div>

            <div className="pick-time">
               <div className="title">
                  <Clock />
                  <p>Choose a time</p>
               </div>
               <TimePicker value={time} onChange={time => setTime(time)} />
            </div>

            <div className="pick-project">
               <div className="title">
                  <Palette />
                  <p>Choose a project</p>
               </div>

               <div className="projects">
                  {
                     projects.length > 0 ?
                     
                     projects.map( project =>
                        <div 
                           className={`project ${todoProject === project.name ? "active" : ""}`}
                           onClick={() => setTodoProject(project.name)}
                           key={project.id}
                        >
                           {project.name}
                        </div>
                     )
                     :
                     <div style={{color: '#ed0000', paddingBottom: '1rem'}}>
                        Please add a project before proceeding
                     </div>
                  }
               </div>
            </div>

            {
               showButton &&
               <div>
                  <div className="cancel" onClick={() => setShowModal(false)}>
                     <X size="40" />
                  </div>
               
                  <div className="confirm">
                  <button>+ Add Todo</button>
                  </div>
               </div>
            }
         </form>
      </MuiPickersUtilsProvider> 
   )
}

export default TodoForm;