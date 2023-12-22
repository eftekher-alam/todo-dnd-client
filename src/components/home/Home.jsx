import { useEffect } from "react";
import MainCover from "../main_cover/MainCover";
import Testimonials from "../testimonials/Testimonials";


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <MainCover></MainCover>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;