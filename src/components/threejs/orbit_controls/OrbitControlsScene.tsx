import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useEffect, useRef} from "react";

function OrbitControlsContext() {
    const orbitControlRef = useRef<any | null>(null);

    useEffect(() => {
        if (orbitControlRef.current) {
            orbitControlRef.current.target.set(0, 0, 0);
        }
    }, []);

    useFrame(() => {
        if (orbitControlRef.current) {
            orbitControlRef.current.update();
        }
    })

    return (
        <>
            <ambientLight intensity={0.3}/>
            <pointLight position={[1, 1, 1]} intensity={2.0}/>
            <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshPhysicalMaterial color={[0.3, 0.1, 0.8]}/>
            </mesh>
            <OrbitControls
                ref={orbitControlRef}
                autoRotate={true}
                autoRotateSpeed={2.0}
                // enableDamping
                // dampingFactor={0.05}
                // screenSpacePanning={false}
                // minAzimuthAngle={Math.PI / 4}
                // maxAzimuthAngle={Math.PI / 4}
                // minPolarAngle={0}
                // maxPolarAngle={Math.PI}
                // minDistance={3}
                // maxDistance={10}
                // enablePan={true}
                // enableRotate={true}
                // enableZoom={true}
            />
        </>
    )

}

export default function OrbitControlsScene() {
    return (
        <Canvas camera={{fov: 45, position: [1, 1.5, 1]}}>
            <OrbitControlsContext/>
        </Canvas>
    )
}
