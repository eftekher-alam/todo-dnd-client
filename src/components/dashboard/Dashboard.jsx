import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";
import CreateTask from "../create_task/CreateTask";
import ListTask from "../list_task/ListTask";
import useSecureAxios from "../../hooks/useSecureAxios";


const Dashboard = () => {
    const secureAxios = useSecureAxios()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        // setTasks(JSON.parse(localStorage.getItem('tasks')) || [])
        secureAxios.get("/todoList").then(res => console.log(res.data))
    }, [secureAxios])

    return (
        <DndProvider backend={HTML5Backend}>
            <Toaster toastOptions={{
                duration: 3000,
            }} />
            <div className='w-screen -h-screen flex flex-col items-center pt-3 gap-16 mt-12'>
                <div>
                    <h1 className="text-sm md:text-3xl tracking-wide md:tracking-widest lg:ml-8 uppercase">Task Master Dashboard</h1>
                    <p className='text-center text-slate-500'>Drag and drop tasks to change their status</p>
                </div>
                <CreateTask tasks={tasks} setTasks={setTasks} />
                {/* <ListTask tasks={tasks} setTasks={setTasks} /> */}
            </div>
            <a
                href="https://github.com/iamnullman/react-todo-list"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50 hover:text-indigo-500 transition-all duration-300"
            >
                <i className="fab fa-github fa-2x"></i>
            </a>
        </DndProvider>
    );
};

export default Dashboard;