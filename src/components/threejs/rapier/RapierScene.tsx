import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Color, DoubleSide, Mesh, MeshPhysicalMaterial} from "three";
import {Suspense, useRef, useState} from "react";
import {Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";

function RapierContext() {
    const [hover, setHover] = useState(false);
    const cubeRigidBodyRef = useRef<RapierRigidBody | null>(null);
    const cubeMeshRef = useRef<Mesh | null>(null);
    const cubeMaterialRef = useRef<MeshPhysicalMaterial | null>(null);

    const moveCube = () => {
        if (cubeRigidBodyRef.current) {
            cubeRigidBodyRef.current.applyImpulse({x: 0.7, y: 2, z: 0}, true);
        }
    }

    useFrame(() => {
        const targetColor = hover ? new Color(0.55, 0.7, 0.23) : new Color(0.5, 0.25, 1);
        if (cubeMaterialRef.current) {
            cubeMaterialRef.current.color.lerp(targetColor, 0.1);
        }
    });

    return (
        <Suspense>
            <ambientLight intensity={0.2}/>
            <pointLight
                position={[-2, 2, -1]}
                castShadow
                color={[0.3, 0.9, 0.25]}
                intensity={10.0}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-radius={4}
            />
            <Physics>
                <RigidBody ref={cubeRigidBodyRef} position={[0, 3, 0]} colliders="cuboid">
                    <mesh
                        ref={cubeMeshRef}
                        receiveShadow
                        castShadow
                        onPointerEnter={() => setHover(true)}
                        onPointerLeave={() => setHover(false)}
                        onClick={moveCube}
                    >
                        <boxGeometry args={[1, 1, 1]}/>
                        <meshPhysicalMaterial ref={cubeMaterialRef}/>
                    </mesh>
                </RigidBody>

                <RigidBody colliders="hull" restitution={0.5} friction={1.5}>
                    <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[8, 8, 8]}/>
                        <meshPhysicalMaterial color={[0.2, 0.3, 0.4]} side={DoubleSide}/>
                    </mesh>
                </RigidBody>

            </Physics>
            <OrbitControls/>
        </Suspense>
    )
}

export default function RapierScene() {
    return (
        <Canvas camera={{position: [-3, 4, -3]}} shadows>
            <RapierContext/>
        </Canvas>
    )
}
