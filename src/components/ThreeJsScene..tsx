'use client';

import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import RotatingCube from "@/components/threejs/objects/RotatingCube";
import Ground from "@/components/threejs/objects/Ground";
import Car from "@/components/threejs/objects/Car";
import {PCFSoftShadowMap} from "three";

export default function ThreeJsScene() {

    return (
        <Canvas
            style={{
                width: '100%',
                height: '100%'
            }}
            onCreated={({gl}) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = PCFSoftShadowMap; // Consider using soft shadows for better lighting
            }}
        >
            <ambientLight intensity={0.55}/>
            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={60.5}
                angle={0.6}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />

            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={90}
                angle={0.6}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />

            <Car />

            <Ground/>

            <OrbitControls target={[0, -0.5, 0]}/>

            <PerspectiveCamera makeDefault fov={75} position={[-4, 1, 1]}/>
        </Canvas>
    )
}
