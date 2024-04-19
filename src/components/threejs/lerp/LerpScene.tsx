import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useCallback, useRef} from "react";
import {Color, DoubleSide, MathUtils, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Raycaster, Vector2, Vector3} from "three";

function LerpContext() {

    const cubeRef = useRef<Mesh | null>(null);
    const cubeMesh = cubeRef.current as Mesh;

    const {camera, gl} = useThree();

    const toggleLerpPosition = useRef<boolean>(false)

    const moveCube = useCallback((event: any) => {
        const raycaster = new Raycaster();
        const mouse = new Vector2();

        mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(cubeMesh);

        if (intersects.length > 0) {
            toggleLerpPosition.current = !toggleLerpPosition.current;
        }
    }, [camera, gl, cubeMesh]);

    useFrame((_, delta) => {
        if (cubeMesh) {
            const cubeMaterial = cubeMesh.material as MeshPhysicalMaterial;

            if (toggleLerpPosition.current) {
                cubeMesh.position.y = MathUtils.lerp(cubeMesh.position.y, 2, 0.01);
                cubeMesh.scale.lerp(new Vector3(1.75, 1.75, 1.75), 0.01);
                cubeMaterial.color.lerp(new Color(0xff0000), 0.04);
                cubeMaterial.reflectivity = MathUtils.lerp(cubeMaterial.reflectivity, 1.5, 0.01);
                cubeMaterial.sheen = MathUtils.lerp(cubeMaterial.sheen, 1.5, 0.01);
                cubeMaterial.sheenColor.lerp(new Color(0x3d07f0), 0.01);
            } else {
                cubeMesh.position.y = MathUtils.lerp(cubeMesh.position.y, 1, 0.01);
                cubeMesh.scale.lerp(new Vector3(1, 1, 1), 0.01);
                cubeMaterial.color.lerp(new Color(0x00ff00), 0.02);
                cubeMaterial.reflectivity = MathUtils.lerp(cubeMaterial.reflectivity, 1.0, 0.01);
                cubeMaterial.sheen = MathUtils.lerp(cubeMaterial.sheen, 1.0, 0.01)
                cubeMaterial.sheenColor.lerp(new Color(0xb9f007), 0.01);
            }

            cubeMesh.rotation.y += 0.01;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5}/>
            <spotLight position={[1, 3.5, 1]} intensity={9.0} penumbra={0.15} castShadow />

            <mesh ref={cubeRef} onClick={moveCube} position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1, 1, 1]}/>
                <meshPhysicalMaterial color={[0.7, 0.2, 0.4]}/>
            </mesh>

            <mesh receiveShadow rotation={[Math.PI / -2, 0, 0]}>
                <planeGeometry args={[20, 20, 20]}/>
                <meshPhysicalMaterial color={[0.7, 0.2, 0.4]} side={DoubleSide}/>
            </mesh>
            <OrbitControls/>
        </>
    )
}

export default function LerpScene() {
    return (
        <>
            <Canvas camera={{ position: [3, 4, 3] }} shadows>
                <LerpContext/>
            </Canvas>
        </>

    )
}
