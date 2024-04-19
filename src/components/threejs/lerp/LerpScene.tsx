import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useCallback, useRef} from "react";
import {Color, MathUtils, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Raycaster, Vector2} from "three";

function LerpContext() {

    const cubeRef = useRef<Mesh | null>(null);
    const cubeMesh = cubeRef.current as Mesh;

    const {camera, gl} = useThree();

    const toggleLerpPosition = useRef<boolean>(false)

    function getRandomThreeColor() {
        // Generates a random float between 0 and 1 for each color component
        const red = Math.random();
        const green = Math.random();
        const blue = Math.random();

        // Create a new THREE.Color and set its RGB values
        const color = new Color();
        color.setRGB(red, green, blue);

        return color;
    }

    const moveCube = useCallback((event: any) => {
        const raycaster = new Raycaster();
        const mouse = new Vector2();

        mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(cubeMesh);

        if (intersects.length > 0) {
            // ((intersects[0].object as Mesh).material as MeshStandardMaterial).color.set(`rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`);
            toggleLerpPosition.current = !toggleLerpPosition.current;
        }
    }, [camera, gl, cubeMesh]);

    useFrame((_, delta) => {
        if (cubeRef.current) {
            const cubeMaterial = cubeMesh.material as MeshPhysicalMaterial;

            if(toggleLerpPosition.current) {
                cubeMesh.position.y = MathUtils.lerp(cubeMesh.position.y, -2, 0.01);
                cubeMaterial.color.lerp(new Color(0xff0000), 0.02);
            } else {
                cubeMesh.position.y = MathUtils.lerp(cubeMesh.position.y, 2, 0.01);
                cubeMaterial.color.lerp(new Color(0x00ff00), 0.02);
            }
        }
    });

    return (
        <>
            <ambientLight intensity={0.5}/>
            <pointLight position={[1, 1, 1]} intensity={3.0}/>
            <mesh ref={cubeRef} onClick={moveCube} position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]}/>
                <meshPhysicalMaterial color={[0.7, 0.2, 0.4]}/>
            </mesh>
            <OrbitControls/>
        </>
    )
}

export default function LerpScene() {
    return (
        <>
            <Canvas>
                <LerpContext/>
            </Canvas>
        </>

    )
}
