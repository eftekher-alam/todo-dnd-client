import { useEffect } from "react";
import MainCover from "../main_cover/MainCover";


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <MainCover></MainCover>
        </div>
    );
};

export default Home;