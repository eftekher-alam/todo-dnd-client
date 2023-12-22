import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/auth_provider/AuthProvider";

const MainCover = () => {
    const { user } = useContext(AuthContext);
    return (
        <div
            className="hero min-h-[85vh]"
            style={{ backgroundImage: 'url(https://i.ibb.co/tYGb037/todo-bannar.jpg)' }}
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="150"
            data-aos-offset="0">
            {/* <div className="hero-overlay bg-secondary bg-opacity-30"></div> */}
            <div className="hero-content text-center text-neutral-content">
                <div
                    className="max-w-md"
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="400"
                    data-aos-offset="0"
                >
                    <h1 className="mb-5 text-6xl tracking-widest text-neutral font-light">Task Master</h1>
                    <p className="mb-5 text-neutral tracking-widest font-light">The ultimate todo app designed to simplify your life.</p>
                    {
                        user ? <Link to={"/dashboard"} className="btn btn-outline tracking-widest font-light">{`Let’s Explore`}</Link>
                            : <Link to={"/login"} className="btn btn-outline tracking-widest font-light">{`Let’s Explore`}</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default MainCover;