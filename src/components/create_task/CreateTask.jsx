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
        desc: '',
        status: 'todo',
    })
    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const priority = form.priority.value;
        const desc = form.desc.value;

        if (!name && !desc)
            return toast('Task name is required', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })


        if (tasks.find((t) => t.name === task.name))
            return toast('Task already exists', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        if (name.length < 3)
            return toast('Task name must be at least 3 characters', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        if (name.length > 20)
            return toast('Task name must be less than 20 characters', { icon: <i className="fa-solid fa-bomb text-red-900 font-bold" />, className: "font-bold" })

        task.name = name;
        task.desc = desc;
        task.priority = priority;
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

        form.reset();
        setTask({
            name: '',
            id: '',
            status: 'todo',
        })

    }
    return (

        <form onSubmit={handleSubmit} className="w-10/12 lg:w-1/2">
            <div className="flex gap-4 justify-between">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Task Title</span>
                    </div>
                    <input type="text" name="name" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Task Priority</span>
                    </div>
                    <select name="priority" className="select select-bordered select-sm w-full max-w-xs">
                        <option>High</option>
                        <option>Moderate</option>
                        <option selected>Low</option>
                    </select>
                </label>
            </div>
            <div className="flex justify-between items-center">
                <label className="form-control w-3/5">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <input type="text" name="desc" placeholder="Type here" className="input input-sm input-bordered w-full" />
                </label>

                <button className="btn btn-sm btn-outline w-2/6 mt-9">Create</button>
            </div>
        </form >
    )
}