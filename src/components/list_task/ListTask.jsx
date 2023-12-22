import { useContext, useEffect } from "react"
import { useState } from "react"
import { useDrag, useDrop } from 'react-dnd'
import { FaRegTrashAlt } from "react-icons/fa";
import useSecureAxios from "../../hooks/useSecureAxios";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { AuthContext } from "../../providers/auth_provider/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ListTask({ tasks, setTasks }) {
    const [todos, setTodos] = useState(tasks.filter((t) => t.status == 'todo'))
    const [inProgress, setInProgress] = useState(tasks.filter((t) => t.status == 'progress'))
    const [done, setDone] = useState(tasks.filter((t) => t.status == 'done'))

    useEffect(() => {
        setTodos(tasks.filter((t) => t.status == 'todo'))
        setInProgress(tasks.filter((t) => t.status == 'progress'))
        setDone(tasks.filter((t) => t.status == 'done'))
    }, [tasks])

    const statuses = ['todo', 'progress', 'done']
    return (
        <div className="flex gap-16 md:gap-8 flex-wrap justify-center">
            {statuses.map((status, index) => (
                <Section status={status} key={index} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} done={done} />
            ))}
        </div>
    )
}

function Section({ status, tasks, setTasks, todos, inProgress, done }) {
    const secureAxios = useSecureAxios()
    const text = (status === 'todo') ? 'To Do' : (status === 'progress') ? 'In Progress' : 'Done'
    const bg = (status === 'todo') ? 'bg-red-500' : (status === 'progress') ? 'bg-yellow-500' : 'bg-green-500'
    const tasksToMap = (status === 'todo') ? todos : (status === 'progress') ? inProgress : done
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => {
            setTasks((prev) => {
                const list = prev.map((task) => {
                    if (task._id === item._id) {
                        const changedTask = { ...task, status };
                        secureAxios.patch("/task", changedTask).then(res => {
                            if (res.data.success) {
                                toast.success(`Task successfully moved to ${status}`)
                            }
                        })
                        return changedTask;
                    }
                    return task
                })
                return list
            })
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    return (
        <div ref={drop} className={"w-64 rounded-md mt-2 " + (isOver ? 'bg-slate-200' : "")}>
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {tasksToMap.map((task, index) => (
                <Task task={task} tasks={tasks} setTasks={setTasks} key={index} />
            ))}
        </div>
    )
}

function Header({ text, bg, count }) {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}{" "}
            <div className="ml-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-black">
                {count}
            </div>
        </div>
    )
}

function Task({ task, tasks, setTasks }) {
    const secureAxios = useSecureAxios()
    const navigate = useNavigate();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { _id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handlerDelete = async (taskId) => {
        await secureAxios.delete(`/task/${taskId}`).then(
            res => {
                if (res.data.success) {
                    toast.success('Task deleted successfully');
                }
                else {
                    toast.error("Failed to delete");
                    return;
                }
            }
        );

        const newTasks = await tasks.filter((t) => t._id !== taskId);
        setTasks(newTasks);
    }


    return (
        <div ref={drag} className={
            `relative flex items-center  p-4 mt-8 shadow-md rounded-lg cursor-grab
            ${(task.priority === "High") ? "bg-red-200" : (task.priority === "Moderate") ? "bg-yellow-200" : "bg-green-200"}
             ${isDragging ? 'opacity-50' : 'opacity-100'}`
        }>
            <div className="flex items-center justify-between w-full">
                <div>
                    <p className="font-bold">{task.name}</p>
                    <p className={`text-sm`}>Priority : <span className={` font-semibold ${(task.priority === "High") ? "text-red-500" : (task.priority === "Moderate") ? "text-yellow-500" : "text-green-500"}`}>{task.priority}</span></p>
                    <p className="text-sm">{task.desc}</p>
                </div>
                <div className="flex gap-2">
                    <FaRegTrashAlt className="ml-auto text-red-500 cursor-pointer text-xl" onClick={async () => handlerDelete(task._id)}></FaRegTrashAlt>
                    <FaRegEdit className="ml-auto text-blue-500 cursor-pointer text-xl" onClick={() => {
                        navigate(`/edit-task/${task?._id}`);
                    }} />
                </div>
            </div>


        </div>
    )
}