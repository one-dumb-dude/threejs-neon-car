import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera, PointerLockControls} from "@react-three/drei";
import {DoubleSide} from "three";

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
            <meshPhysicalMaterial color={[color[0], color[1], color[2]]} wireframe/>
        </mesh>
    )
}

function FloorMesh() {
    return (
        <mesh rotation-x={Math.PI / 2}>
            <planeGeometry args={[100, 100, 50, 50]}/>
            <meshPhysicalMaterial color={[1.0, 0, 0]} side={DoubleSide} wireframe/>
        </mesh>
    )
}

function PointerLockContent() {

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
            getRandomNumber(0, 3),
            getRandomNumber(0, 5),
            getRandomNumber(0, 2)
        ]

        return (
            <BoxMesh key={index} color={[...color]} position={[...position]} scale={[...scale]}/>
        )
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[2, 3, 3]}/>
            <pointLight position={[2, 2, 2]} intensity={1}/>
            <ambientLight intensity={1}/>
            {boxes}
            <BoxMesh position={[1, 0, 1.5]}/>
            <FloorMesh/>
            <PointerLockControls/>
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
