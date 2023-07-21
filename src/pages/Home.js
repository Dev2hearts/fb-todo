import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es";
import KakaoMap from "../components/KakaoMap";

const Home = () => {
    // html 태그를 참조해서 활용하고 싶을 때
    const h1 = useRef(null);
    // useRef를 통해서  참조한 html 태그는 .current 로 접근
    useEffect(() => {
        anime({
            targets: h1.current,
            // translateX:250,
            // rotate: "1turn",
            // backgroundColor: "#FFF",
            // duration: 800,
        });
    }, []);
    return (
        <>
            <div>
                <h1 ref={h1}>Home</h1>
            </div>
            <div>
                <KakaoMap />
            </div>
        </>
    );
};
export default Home;
