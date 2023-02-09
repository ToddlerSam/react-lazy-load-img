import { useEffect, useState, useRef } from "react";
import "./LazyImg.css";

const initObserver = (ref, setImage) => {

    // creating new instance of intersection observer
    const observer = new IntersectionObserver((enteries, observer)=>{
        enteries.forEach((entry)=>{
            //if element is currently in view then set showImage to true
            if(entry.isIntersecting){
                // timeout is not necessary, it was just added to make visualization slower for showcasing purpose
                setTimeout(()=>{
                    setImage(true);
                    observer.disconnect();
                }, 1000);
            }
        })
    });
    observer.observe(ref);
}

export const LazyImg = ({ info, styles }) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(()=>{
        initObserver(imageRef.current, setImageLoaded);
    },[]);

    if(imageLoaded){
        return <img className={`${styles}`} src={info.url} alt={info.alt}></img>
    }

    return <div ref={imageRef} className="backdrop"></div>;
}
