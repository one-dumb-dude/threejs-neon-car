import { useRef, useState } from "react";
import { Box3, Vector3 } from "three";
import AirplaneModel from "@/components/threejs/airplane/AirplaneModel";
import DroneModel from "@/components/threejs/DroneModel";
import { useFrame } from "@react-three/fiber";
import ExplosionEffect from "./ExplosionEffect"; // Import the ExplosionEffect component

export default function AirplaneDroneCollision() {
    const [boundingBoxAirplane, setBoundingBoxAirplane] = useState<Box3 | null>(null);
    const [boundingBoxDrone, setBoundingBoxDrone] = useState<Box3 | null>(null);
    const [explosionPosition, setExplosionPosition] = useState<Vector3 | null>(null);

    const lastPrintRef = useRef(0);

    useFrame((state) => {
        const currentTime = state.clock.elapsedTime;

        if (boundingBoxAirplane && boundingBoxDrone) {
            const intersections = boundingBoxAirplane.intersectsBox(boundingBoxDrone);
            if (intersections && currentTime - lastPrintRef.current >= 2) {
                console.log("Intersected");
                const newExplosionPosition = new Vector3();
                boundingBoxDrone.getCenter(newExplosionPosition);
                setExplosionPosition(newExplosionPosition);

                // Update the last print time
                lastPrintRef.current = currentTime;
            }
        }
    });

    const handleExplosionComplete = () => {
        setExplosionPosition(null);
    };

    return (
        <>
            <AirplaneModel onBoundingBoxChange={setBoundingBoxAirplane} />
            <DroneModel onBoundingBoxChange={setBoundingBoxDrone} altitude={0} />
            {explosionPosition && (
                <ExplosionEffect
                    position={explosionPosition}
                    onComplete={handleExplosionComplete}
                />
            )}
        </>
    );
}
