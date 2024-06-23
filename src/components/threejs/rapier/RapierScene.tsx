import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Color, DoubleSide, Mesh, MeshPhysicalMaterial, Vector3} from "three";
import {Suspense, useEffect, useRef, useState} from "react";
import {Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";

function RapierContext() {
    const hoverRef = useRef<Boolean>(false);

    const moveCubeRigidBodyRef = useRef<RapierRigidBody>(null);
    const moveCubeMeshRef = useRef<Mesh>(null);

    const cubeRigidBodyRef = useRef<RapierRigidBody>(null);
    const cubeMeshRef = useRef<Mesh>(null);
    const cubeMaterialRef = useRef<MeshPhysicalMaterial>(null);
    const cubeCollisionRef = useRef<Boolean>(false);

    const movement = useRef({w: false, a: false, s: false, d: false});

    const moveCube = () => {
        if (cubeRigidBodyRef.current) {
            cubeRigidBodyRef.current.applyImpulse({x: 0.7, y: 2, z: 0}, false);
        }
    }

    let defaultPosition = new Vector3(3, 0.26, 0);

    const cubeColor = () => {
        if (hoverRef.current) {
            return new Color(0.55, 0.7, 0.23)
        } else if (cubeCollisionRef.current) {
            return new Color(0.85, 0.1, 0.1);
        } else {
            return new Color(0.5, 0.25, 1);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case "w":
                    movement.current.w = true;
                    break;
                case "a":
                    movement.current.a = true;
                    break;
                case "s":
                    movement.current.s = true;
                    break;
                case "d":
                    movement.current.d = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case "w":
                    movement.current.w = false;
                    break;
                case "a":
                    movement.current.a = false;
                    break;
                case "s":
                    movement.current.s = false;
                    break;
                case "d":
                    movement.current.d = false;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Cleanup the event listeners on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const speed = 0.01;
    const direction = new Vector3(2, 0.5, 2);

    useFrame(() => {

        // if (moveCubeRigidBodyRef.current) {
        //     defaultPosition.x -= 0.005;
        //     moveCubeRigidBodyRef.current.setNextKinematicTranslation(defaultPosition);
        // }


        const targetColor = cubeColor();

        if (cubeMaterialRef.current) {
            cubeMaterialRef.current.color.lerp(targetColor, 0.1);
        }

        if (moveCubeRigidBodyRef.current) {
            if (movement.current.w) direction.z -= speed;
            if (movement.current.s) direction.z += speed;
            if (movement.current.a) direction.x -= speed;
            if (movement.current.d) direction.x += speed;
            moveCubeRigidBodyRef.current.setNextKinematicTranslation(direction);
        }
    });

    return (
        <Suspense>
            <ambientLight intensity={0.2}/>
            <pointLight
                position={[2, 2, 1]}
                castShadow
                color={[0.3, 0.9, 0.25]}
                intensity={10.0}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-radius={4}
            />
            <Physics>

                <RigidBody
                    ref={moveCubeRigidBodyRef}
                    type="kinematicPosition"
                    colliders="cuboid"
                    onCollisionEnter={({other}) => {
                        if (other.rigidBodyObject?.name === "cubeRigid") cubeCollisionRef.current = true
                    }}
                    onCollisionExit={({other}) => {
                        if (other.rigidBodyObject?.name === "cubeRigid") cubeCollisionRef.current = false
                    }}
                >
                    <mesh
                        ref={moveCubeMeshRef}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[0.5, 0.5, 0.5]}/>
                        <meshPhysicalMaterial color={[1.0, 0.5, 0.35]}/>
                    </mesh>
                </RigidBody>

                <RigidBody
                    ref={cubeRigidBodyRef}
                    name="cubeRigid"
                    position={[0, 1, 0]}
                    colliders="cuboid"
                >
                    <mesh
                        ref={cubeMeshRef}
                        receiveShadow
                        castShadow
                        onPointerEnter={() => hoverRef.current = true}
                        onPointerLeave={() => hoverRef.current = false}
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
        <Canvas camera={{position: [3, 4, 3]}} shadows>
            <RapierContext/>
        </Canvas>
    )
}
