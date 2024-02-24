'use client';
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import FloorPlane from "@/components/threejs/rotating_cube/FloorPlane";
import RotatingCube from "@/components/threejs/rotating_cube/RotatingCube";
import SpotLightComp from "@/components/threejs/rotating_cube/SpotLightComp";
import CubeContext from "@/components/threejs/rotating_cube/context/CubeContext";
import {useState} from "react";
import OrbitControlsComp from "@/components/threejs/rotating_cube/OrbitControlsComp";


export default function RotatingCubeScene() {
    const [position, setPosition] = useState<[number, number, number]>([0, 1.5, 0]);

    return (
        <CubeContext.Provider value={{position, setPosition}}>
            <Canvas>
                <ambientLight intensity={0.2}/>
                <SpotLightComp/>
                <RotatingCube/>
                <FloorPlane/>
                <OrbitControlsComp />
            </Canvas>
        </CubeContext.Provider>
    )
}
