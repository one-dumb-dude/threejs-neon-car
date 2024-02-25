'use client';

import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import EveModel from "@/components/threejs/eve/EveModel";

export default function EveScene() {
    return (
        <Canvas>

            <Environment files="/hdris/empty_workshop_1k.hdr" background />

            <EveModel />

            <OrbitControls />
        </Canvas>
    )
}
