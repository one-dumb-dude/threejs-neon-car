'use client';
import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import AirplaneModel from "@/components/threejs/airplane/AirplaneModel";
import PerspectiveCameraComp from "@/components/threejs/airplane/PerspectiveCameraComp";
import AirplaneContext from "@/components/threejs/airplane/contexts/AirplaneContext";
import {useState} from "react";

export default function AirplaneScene() {
    const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

    return (
        <AirplaneContext.Provider value={{position, setPosition}}>

            <Canvas>

                <Environment files="/hdris/rustig_koppie_puresky_1k.hdr" background/>

                <AirplaneModel/>

                <PerspectiveCameraComp/>

            </Canvas>

        </AirplaneContext.Provider>
    )
}
