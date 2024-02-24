import {OrbitControls} from "@react-three/drei";
import {useContext, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import CubeContext from "@/components/threejs/rotating_cube/context/CubeContext";

export default function OrbitControlsComp() {

    const orbitRef = useRef<any>(null);
    const {position} = useContext(CubeContext);

    useFrame(() => {
        if (orbitRef.current) {
            orbitRef.current.target.set(...position)
            orbitRef.current.update();
        }
    });

    return(
        <OrbitControls ref={orbitRef}/>
    )
}
