import { useRef, useState } from "react";

import PublicNavbar from "../Components/layout/PublicNavbar";
import Hero from "@/Components/home/Hero";
import Features from "@/Components/home/Features";
import PublicSidebar from "@/Components/layout/PublicSidebar";
import PublicFooter from "@/Components/home/PublicFooter";
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const featureSection = useRef(null);
    const scrollHandler = () => {
        featureSection.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <PublicNavbar scrollHandler={scrollHandler} setIsOpen={setIsOpen} />
            <PublicSidebar isOpen={isOpen} setIsOpen={setIsOpen} scrollHandler={scrollHandler} />
            <Hero />
            <div className="scroll-m-17" ref={featureSection}>
                <Features />
            </div>
            <PublicFooter scrollHandler={scrollHandler} />
        </>
    );
};

export default Home;
