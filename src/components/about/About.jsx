
const About = () => {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
                Welcome to our Todo List website! We are passionate about helping you stay organized and manage your tasks effectively. Here's a glimpse of the key features we offer:
            </p>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Drag and Drop Tasks</h3>
                <p className="text-gray-700">
                    Easily prioritize and organize your tasks by dragging and dropping them into the desired order. Our intuitive interface makes task management a breeze.
                </p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Create Tasks</h3>
                <p className="text-gray-700">
                    Quickly add new tasks to your todo list. Whether it's a work assignment, a personal goal, or a reminder, our platform ensures efficient task creation.
                </p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Edit Tasks</h3>
                <p className="text-gray-700">
                    Need to make changes to a task? No problem! Edit task details, update due dates, or modify any information easily through our user-friendly interface.
                </p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Delete Tasks</h3>
                <p className="text-gray-700">
                    Completed a task or want to remove it for any reason? Delete tasks effortlessly, keeping your todo list streamlined and clutter-free.
                </p>
            </div>
            <p className="text-gray-700">
                Thank you for choosing our Todo List platform. We are dedicated to providing a seamless and enjoyable task management experience. Stay organized, stay productive!
            </p>
        </div>
    );
};

export default About;