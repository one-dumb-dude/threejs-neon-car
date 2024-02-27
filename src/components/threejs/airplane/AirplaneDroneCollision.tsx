import {useState} from "react";
import {Box3} from "three";
import AirplaneModel from "@/components/threejs/airplane/AirplaneModel";
import DroneModel from "@/components/threejs/DroneModel";

export default function AirplaneDroneCollision() {
    const [boundingBoxAirplane, setBoundingBoxAirplane] = useState<Box3 | null>(null);
    const [boundingBoxDrone, setBoundingBoxDrone] = useState<Box3 | null>(null);

    return (
        <>
            <AirplaneModel />
            <DroneModel altitude={0} />
        </>
    )
}
