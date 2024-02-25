import {PerspectiveCamera} from "@react-three/drei";
import {useContext, useEffect, useRef} from "react";
import {Vector3} from "three";
import {useFrame} from "@react-three/fiber";
import AirplaneContext from "@/components/threejs/airplane/contexts/AirplaneContext";

export default function PerspectiveCameraComp() {
    const cameraRef = useRef<any>(null);
    const {position} = useContext(AirplaneContext);

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.lookAt(new Vector3(0, 0, 0));
            cameraRef.current.zoom = 2;
        }
    }, [cameraRef]);

    useFrame(({clock}) => {
        if (cameraRef.current) {
            const elapsedTime = clock.getElapsedTime();
            // cameraRef.current.position.x = Math.sin(elapsedTime) * 10;
            // cameraRef.current.position.z = Math.cos(elapsedTime) * 10;
            // cameraRef.current.lookAt(...position);
            // cameraRef.current.zoom = ((Math.sin(elapsedTime) + 2) * (7 - 1) / 2) + 1;
            cameraRef.current.updateProjectionMatrix();
        }
    })
    return (
        <PerspectiveCamera ref={cameraRef} makeDefault fov={75} position={[2.5, 0, -2]}/>
    )
}
