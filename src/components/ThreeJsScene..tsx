'use client';

import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
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
        >
            <ambientLight intensity={0.75}/>
            <spotLight
                position={[0, 2, 1]}
                angle={2}
                penumbra={2}
                intensity={5}
                castShadow
            />

            <RotatingCube/>

            <FloorPlane/>

            <OrbitControls />

            <PerspectiveCamera makeDefault fov={75} position={[2, 1, 2]}/>
        </Canvas>
    )
}
