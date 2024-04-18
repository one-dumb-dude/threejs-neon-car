import {Canvas, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useCallback, useRef} from "react";
import {Mesh, MeshStandardMaterial, Raycaster, Vector2} from "three";

const randomRGBValue = () => Math.floor(Math.random() * 255);

function RayCasterContent() {
    const meshRef = useRef<any>(null);
    const {camera, gl} = useThree();

    const onClick = useCallback((event: any) => {
        const raycaster = new Raycaster();
        const mouse = new Vector2();

        // Convert the mouse position to normalized device coordinates (-1 to +1) for both components
        mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(meshRef.current);

        if (intersects.length > 0) {
            ((intersects[0].object as Mesh).material as MeshStandardMaterial).color.set(`rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`);
        }
    }, [camera, gl]);

    return (
        <>
            <ambientLight intensity={1.0} />
            <mesh
                ref={meshRef}
                onClick={onClick}  // Using onClick event provided by r3f
                position={[0, 0, 0]}
            >
                <boxGeometry args={[1, 1, 1]}/>
                <meshStandardMaterial color="royalblue"/>
            </mesh>

            <OrbitControls />
        </>
    );
}


export default function RayCasterScene() {
    return (
        <Canvas>
            <RayCasterContent/>
        </Canvas>
    )
}
