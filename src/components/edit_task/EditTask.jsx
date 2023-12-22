import { useEffect, useState } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
    const secureAxios = useSecureAxios();
    const [task, setTask] = useState({});
    const navigate = useNavigate();
    const { id } = useParams("id");

    useEffect(() => {
        window.scrollTo(1, 1);
        secureAxios.get(`/task/${id}`)
            .then(res => setTask(res.data))
    }, [id, secureAxios]);

    console.log(task);

    const handleUpdate = async (e) => {
        e.preventDefault()

        console.log("update Executed");
        const form = e.target;
        const name = form.name.value;
        const priority = form.priority.value;
        const desc = form.desc.value;
        const _id = form._id.value;
        const email = form.email.value;
        const status = form.status.value;

        const task = {
            name,
            desc,
            priority,
            _id,
            email,
            status
        }

        secureAxios.patch("/task", task).then(res => {
            if (res.data.success) {
                toast.success(`Task successfully updated`);
                navigate(`/dashboard`);
            }
        })

    }

    return (

        <div className="flex flex-col justify-center items-center mt-10">
            <form onSubmit={handleUpdate} className="w-10/12 lg:w-1/2">
                <h1 className="text-sm text-center pb-6 md:text-3xl tracking-wide md:tracking-widest uppercase">Edit Task</h1>
                <input type="text" name="_id" defaultValue={task._id} hidden />
                <input type="text" name="email" defaultValue={task.email} hidden />
                <input type="text" name="status" defaultValue={task.status} hidden />
                <div className="flex max-md:flex-col gap-4 justify-between">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Task Title</span>
                        </div>
                        <input type="text" name="name" defaultValue={task.name} placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Task Priority</span>
                        </div>
                        <select name="priority" className="select select-bordered select-sm w-full max-w-xs">
                            <option selected={task.priority == "High"} >High</option>
                            <option selected={task.priority == "Moderate"}>Moderate</option>
                            <option selected={task.priority == "Low"}>Low</option>
                        </select>
                    </label>
                </div>
                <div className="flex max-md:flex-col justify-between items-center">
                    <label className="form-control w-full max-md:pr-6 md:w-3/5 ">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <input type="text" name="desc" defaultValue={task.desc} placeholder="Type here" className="input input-sm input-bordered w-full" />
                    </label>

                    <button type="submit" className="btn btn-warning btn-sm btn-outline md:w-2/6 mt-9">Update</button>
                </div>
            </form >
            <Link to={"/dashboard"} className="btn btn-warning btn-sm btn-outline mt-9">Back to dashboard</Link>
        </div>


    );
};

export default EditTask;