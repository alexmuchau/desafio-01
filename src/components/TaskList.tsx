import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { randomUUID } from 'crypto';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // let cont = 1

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // cont += 1
    if(newTaskTitle) {
      const id = Math.random();
      const newTask = {id: id, title: newTaskTitle, isComplete: false}
      
      // spread operator - pega todos os valores antigos
      setTasks(data => [...data, newTask])
      setNewTaskTitle('')
      console.log(tasks)
      
    } else if(!newTaskTitle){
      throw new Error("digite um todo");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // um if ternário aqui, se o value.id for === id então faça ..., o ":" significa o senão
    const task = tasks.map(value => value.id === id ? {
      ...value,
      isComplete: !value.isComplete
    } : value);
    
    setTasks(task)
    // setTasks()
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const task = tasks.filter(value => value.id !== id)
    setTasks(task)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}