import {useState} from "react";
import {Box3} from "three";
import AirplaneModel from "@/components/threejs/airplane/AirplaneModel";
import DroneModel from "@/components/threejs/DroneModel";
import {useFrame} from "@react-three/fiber";

export default function AirplaneDroneCollision() {
    const [boundingBoxAirplane, setBoundingBoxAirplane] = useState<Box3 | null>(null);
    const [boundingBoxDrone, setBoundingBoxDrone] = useState<Box3 | null>(null);

    useFrame(() => {
        if (boundingBoxAirplane && boundingBoxDrone) {
            const intersections = boundingBoxAirplane.intersectsBox(boundingBoxDrone);
            console.log(intersections && 'Intersected')
        }
    })

    return (
        <>
            <AirplaneModel onBoundingBoxChange={setBoundingBoxAirplane}/>
            <DroneModel onBoundingBoxChange={setBoundingBoxDrone} altitude={0} />
        </>
    )
}
