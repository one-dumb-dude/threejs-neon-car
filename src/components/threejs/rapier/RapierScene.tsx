import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Color, DoubleSide, Mesh, MeshPhysicalMaterial, Vector3} from "three";
import {Suspense, useEffect, useRef} from "react";
import {Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";

function RapierContext() {
    const hoverRef = useRef<Boolean>(false);

    const moveCubeRigidBodyRef = useRef<RapierRigidBody>(null);
    const moveCubeMeshRef = useRef<Mesh>(null);

    const cubeRigidBodyRef = useRef<RapierRigidBody>(null);
    const cubeMeshRef = useRef<Mesh>(null);
    const cubeMaterialRef = useRef<MeshPhysicalMaterial>(null);
    const cubeCollisionRef = useRef<Boolean>(false);

    const movement = useRef({w: false, a: false, s: false, d: false, shift: false});
    const gamepadRef = useRef<Gamepad | null>(null);

    const speed = 0.0125;
    const direction = new Vector3(2, 0.5, 2);

    const {camera} = useThree();
    const cameraOffset = new Vector3(2, 2, 3);

    const moveCube = () => {
        if (cubeRigidBodyRef.current) {
            cubeRigidBodyRef.current.applyImpulse({x: 0.7, y: 2, z: 0}, true);
        }
    }

    const cubeColor = () => {
        if (hoverRef.current) {
            return new Color(0.55, 0.7, 0.23)
        } else if (cubeCollisionRef.current) {
            return new Color(0.85, 0.1, 0.1);
        } else {
            return new Color(0.5, 0.25, 1);
        }
    }

    const handleGamepadConnected = (event: GamepadEvent) => {
        console.log("A gamepad connected:", event.gamepad);
        gamepadRef.current = event.gamepad;
    };

    const handleGamepadDisconnected = (event: GamepadEvent) => {
        console.log("A gamepad disconnected:", event.gamepad);
        gamepadRef.current = null;
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case "w":
                case "arrowup":
                    movement.current.w = true;
                    break;
                case "a":
                case "arrowleft":
                    movement.current.a = true;
                    break;
                case "s":
                case "arrowdown":
                    movement.current.s = true;
                    break;
                case "d":
                case "arrowright":
                    movement.current.d = true;
                    break;
                case "shift":
                    movement.current.shift = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case "w":
                case "arrowup":
                    movement.current.w = false;
                    break;
                case "a":
                case "arrowleft":
                    movement.current.a = false;
                    break;
                case "s":
                case "arrowdown":
                    movement.current.s = false;
                    break;
                case "d":
                case "arrowright":
                    movement.current.d = false;
                    break;
                case "shift":
                    movement.current.shift = false;
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("gamepadconnected", handleGamepadConnected);
        window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

        // Cleanup the event listeners on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("gamepadconnected", handleGamepadConnected);
            window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
        };
    }, []);


    useFrame(() => {

        const targetColor = cubeColor();

        if (cubeMaterialRef.current) {
            cubeMaterialRef.current.color.lerp(targetColor, 0.1);
        }

        const currentSpeed = movement.current.shift ? speed * 2 : speed; // Double speed when Shift is pressed

        if (moveCubeRigidBodyRef.current) {

            if (movement.current.w) direction.z -= currentSpeed;
            if (movement.current.s) direction.z += currentSpeed;
            if (movement.current.a) direction.x -= currentSpeed;
            if (movement.current.d) direction.x += currentSpeed;

            // you might be constantly setting the position unnecessarily
            moveCubeRigidBodyRef.current.setNextKinematicTranslation(direction);

            const cubePosition = new Vector3(direction.x, direction.y, direction.z);
            const desiredCameraPosition = cubePosition.clone().add(cameraOffset);
            camera.position.lerp(desiredCameraPosition, 0.1);
            camera.lookAt(cubePosition);
        }

        // Gamepad input
        if (gamepadRef.current) {
            // We need to get the fresh state of the gamepad
            const gamepads = navigator.getGamepads();
            const gamepadIndex = Array.from(gamepads).findIndex(gp => gp && gp.id === gamepadRef.current!.id);

            if (gamepadIndex !== -1) {
                const gamepad = gamepads[gamepadIndex];
                if (gamepad) {
                    // Left stick (horizontal movement)
                    const leftStickX = gamepad.axes[0];
                    const leftStickY = gamepad.axes[1];

                    // Right stick (vertical movement)
                    const rightStickY = gamepad.axes[3]; // Use axis 3 for vertical movement

                    // Apply dead zone
                    const deadZone = 0.1;
                    if (Math.abs(leftStickX) > deadZone) {
                        direction.x += leftStickX * currentSpeed;
                    }
                    if (Math.abs(leftStickY) > deadZone) {
                        direction.z += leftStickY * currentSpeed;
                    }
                    if (Math.abs(rightStickY) > deadZone) {
                        direction.y -= rightStickY * currentSpeed; // Invert if needed
                    }

                    movement.current.shift = gamepad.buttons[0].pressed;

                }
            }
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
