'use client';

import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import EveModel from "@/components/threejs/eve/EveModel";
import {SRGBColorSpace} from "three";

export default function EveScene() {
    return (
        <Canvas shadows>

            <Environment files="/hdris/empty_workshop_1k.hdr" background/>

            <EveModel/>

            <OrbitControls target={[0, 1.15, 0]}/>
        </Canvas>
    )
}
