'use client';

import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import RotatingCube from "@/components/threejs/objects/RotatingCube";
import FloorPlane from "@/components/threejs/objects/FloorPlane";
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
            camera={{position: [2, 2, 2]}}
        >
            <ambientLight intensity={0.75}/>
            <spotLight
                position={[0, 2, 1]}
                angle={2}
                penumbra={1}
                intensity={5}
                castShadow
            />

            <RotatingCube/>

            <FloorPlane/>

            <OrbitControls/>
        </Canvas>
    )
}
