import {Canvas, useFrame} from "@react-three/fiber";
import {PerspectiveCamera, PointerLockControls, PointerLockControlsProps, useHelper} from "@react-three/drei";
import {DirectionalLight, DirectionalLightHelper, DoubleSide, Vector3} from "three";
import {Environment} from '@react-three/drei'
import {RefObject, useEffect, useRef} from "react";

const getRandomNumber = (min: number, max: number) => {
    const longRandomNumber = Math.random() * (max - min) + min;
    return parseFloat(longRandomNumber.toFixed(2));
}

function BoxMesh({color = [1, 0, 0], position = [0, 0, 0], scale = [1, 1, 1]}) {
    return (
        <mesh
            position={[position[0], position[1], position[2]]}
            scale={[scale[0], scale[1], scale[2]]}
            receiveShadow
            castShadow
        >
            <boxGeometry args={[1, 1, 1]}/>
            <meshPhysicalMaterial color={[color[0], color[1], color[2]]}/>
        </mesh>
    )
}

function FloorMesh() {
    return (
        <mesh rotation-x={Math.PI / 2} receiveShadow>
            <planeGeometry args={[100, 100, 50, 50]}/>
            <meshPhysicalMaterial color={[1.0, 0, 0]} side={DoubleSide}/>
        </mesh>
    )
}

function PointerLockContent() {
    const controlsRef = useRef<PointerLockControlsProps | null>(null);
    const directionalLightRef = useRef<DirectionalLight | null>(null)
    const moveForward = useRef(false);
    const moveBackward = useRef(false);
    const moveLeft = useRef(false);
    const moveRight = useRef(false);

    useEffect(() => {
        if (directionalLightRef.current) {
            const directionalLight = directionalLightRef.current;
            const expanse = 50;

            directionalLight.shadow.camera.top = expanse;
            directionalLight.shadow.camera.bottom = -expanse;
            directionalLight.shadow.camera.left = -expanse;
            directionalLight.shadow.camera.right = expanse;
            directionalLight.shadow.camera.near = 1;
            directionalLight.shadow.camera.far = 40;
            directionalLight.shadow.mapSize.width = 1024 * 2;
            directionalLight.shadow.mapSize.height = 1024 * 2;
            directionalLight?.lookAt(new Vector3(0, 0, 0));
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyW':
                    moveForward.current = true;
                    break;
                case 'KeyS':
                    moveBackward.current = true;
                    break;
                case 'KeyA':
                    moveLeft.current = true;
                    break;
                case 'KeyD':
                    moveRight.current = true;
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyW':
                    moveForward.current = false;
                    break;
                case 'KeyS':
                    moveBackward.current = false;
                    break;
                case 'KeyA':
                    moveLeft.current = false;
                    break;
                case 'KeyD':
                    moveRight.current = false;
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame((state, delta) => {
        const controls = controlsRef.current;
        const camera = state.camera;

        if (controls && controls.isLocked) {
            const speed = 5; // Adjust the speed as needed
            const direction = new Vector3();

            if (moveForward.current) {
                direction.add(camera.getWorldDirection(new Vector3()).multiplyScalar(speed * delta));
            }

            if (moveBackward.current) {
                direction.add(camera.getWorldDirection(new Vector3()).multiplyScalar(-speed * delta));
            }

            if (moveLeft.current) {
                direction.add(camera.getWorldDirection(new Vector3()).cross(camera.up).multiplyScalar(-speed * delta));
            }

            if (moveRight.current) {
                direction.add(camera.getWorldDirection(new Vector3()).cross(camera.up).multiplyScalar(speed * delta));
            }

            camera.position.add(direction);
        }
    });

    const emptyArray = new Array(150).fill(null);


    const boxes = emptyArray.map((_, index) => {
        const furthestDistance = 40;

        const color = [
            getRandomNumber(0, 1),
            getRandomNumber(0, 1),
            getRandomNumber(0, 1)
        ];

        const position = [
            getRandomNumber(-furthestDistance, furthestDistance),
            getRandomNumber(0, 10),
            getRandomNumber(-furthestDistance, furthestDistance)
        ];

        const scale = [
            getRandomNumber(1, 3),
            getRandomNumber(1, 5),
            getRandomNumber(1, 2)
        ]

        return (
            <BoxMesh key={index} color={[...color]} position={[...position]} scale={[...scale]}/>
        )
    });

    useHelper(directionalLightRef as any, DirectionalLightHelper, 1);

    return (
        <>
            <Environment files="/hdris/kloofendal_48d_partly_cloudy_puresky_2k.hdr" background/>
            <PerspectiveCamera makeDefault position={[2, 3, 3]}/>
            <hemisphereLight
                position={[0, 50, 0]}
                color={[0.6, 0.75, 0.5]}
                groundColor={[0.01, 0.5, 0.5]}
            />
            <directionalLight
                ref={directionalLightRef}
                position={[5, 30, 5]}
                intensity={0.75}
                castShadow
            />
            {boxes}
            <FloorMesh/>
            <PointerLockControls ref={controlsRef as RefObject<any>}/>
        </>
    )
}

export default function PointerLockScene() {
    return (
        <Canvas shadows>
            <PointerLockContent/>
        </Canvas>
    )
}
