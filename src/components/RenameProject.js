import React, { useState, useContext } from 'react';
import ProjectForm from './ProjectForm';
import firebase from '../firebase';
import { TodoContext } from '../context';

function RenameProject({project, setShowModal}) {
   const [newProjName, setNewProjName] = useState(project.name);

   const { selectedProject, setSelectedProject } = useContext(TodoContext);
   
   const renameProject = (project, newProjectName) => {
      const projectRef = firebase.firestore().collection('projects');
      const todosRef = firebase.firestore().collection('todos');

      const { name: oldProjectName } = project;

      projectRef
      .where('name', '==', newProjectName)
      .get()
      .then( querySnapshot => {
         if(!querySnapshot.empty){
            alert('Project with the same name already exists!');
         } else {
            projectRef
            .doc(project.id)
            .update({
               name: newProjectName
            })
            .then( () => {
               todosRef
               .where('projectName', '==', oldProjectName)
               .get()
               .then( querySnapshot => {
                  querySnapshot.forEach( doc => {
                     doc.ref.update({
                        projectName: newProjectName
                     })
                  })
               })
               .then( () => {
                  if(selectedProject === oldProjectName){
                     setSelectedProject(newProjectName);
                  }
               })
            })
         }
      })
   }

   function handleSubmit(e) {
      e.preventDefault();

      renameProject(project, newProjName);

      setShowModal(false);
   }

   return (
      <div className="RenameProject">
         <ProjectForm 
               handleSubmit={handleSubmit}
               heading="Edit Project Name!"
               value={newProjName}
               setValue={setNewProjName}
               setShowModal={setShowModal}
               confirmButtonText="Confirm"
            />
      </div>
   )
}

export default RenameProject;