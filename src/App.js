import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  const name = 'Baller'
  const [tasks, setTasks] = useState(
    []
  )

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    const data = await res.json()

    return data
  }

  const [showAddTask, setShowAddTask] = useState(false)

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'DELETE'
    })
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)

    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    }
    )

    const data = await res.json()

    setTasks(
      tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task)
    )
  }

  const addTask = async (task) => {
    //const id= Math.floor(Math.random()*10000)+1

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    console.log(data)

    setTasks([...tasks, data])
  }

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="container">
        <Header title='hello' toggleShowAdd={toggleShowAddTask}></Header>
        
        <Route path='/' exact render={(props) => (
          <div>
            {
              showAddTask ?
              <AddTask addTask={addTask}></AddTask>
              :
              <div></div>
            }
            {
              tasks.length > 0 ?
              <Tasks tasks = { tasks } onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
              :
              'No tasks'
            }
          </div>
          )}>
        </Route>
        <Route path='/about' component={About}></Route>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
