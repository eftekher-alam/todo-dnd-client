import { useContext, useState } from "react"
import toast from 'react-hot-toast';
import { AuthContext } from "../../providers/auth_provider/AuthProvider";
import useSecureAxios from "../../hooks/useSecureAxios";

// eslint-disable-next-line react/prop-types
export default function CreateTask({ tasks, setTasks }) {
    const secureAxios = useSecureAxios()
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState({
        name: '',
        status: 'todo',
    })
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!task.name)
            return toast('Task name is required', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })


        if (tasks.find((t) => t.name === task.name))
            return toast('Task already exists', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        if (task.name.length < 3)
            return toast('Task name must be at least 3 characters', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        if (task.name.length > 20)
            return toast('Task name must be less than 20 characters', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        task.email = user.email;

        await secureAxios.post("/task", task).then(res => {
            if (res.success) {
                toast.success('Task created successfully', { icon: <i className="fa-solid fa-party-horn text-green-900 font-bold" />, className: "font-bold" })
            }
        })

        await secureAxios.get(`/tasks?email=${user.email}`).then(res => {
            console.log("after add new", res.data);
            setTasks(res.data);
        })


        setTask({
            name: '',
            status: 'todo',
        })

    }
    return (

        <form onSubmit={handleSubmit}>
            <input
                onChange={(e) => {
                    setTask({ ...task, name: e.target.value })
                }}
                type="text"
                value={task.name}
                className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
            />
            <button className="bg-indigo-500 rounded-md px-4 h-12 text-white">Create</button>
        </form>
    )
}