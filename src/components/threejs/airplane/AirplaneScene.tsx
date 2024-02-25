'use client';
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import AirplaneModel from "@/components/threejs/airplane/AirplaneModel";

export default function AirplaneScene() {

    return (
        <Canvas>

            <Environment files="/hdris/rustig_koppie_puresky_1k.hdr" background />

            <AirplaneModel />

            <OrbitControls />
        </Canvas>
    )
}
