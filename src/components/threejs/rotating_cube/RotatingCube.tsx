import {useContext, useEffect, useRef} from "react";
import {LinearSRGBColorSpace, Mesh, NoColorSpace, TextureLoader, Vector3} from "three";
import {useFrame, useLoader} from "@react-three/fiber";
import CubeContext from "@/components/threejs/rotating_cube/context/CubeContext";

export default function RotatingCube() {
    const cubeRef = useRef<Mesh>(null);
    const {setPosition} = useContext(CubeContext);

    const movement = useRef({ w: false, a: false, s: false, d: false });
    const [aoMap, diffuseMap, heightMap, metallicMap, normalMap, smoothMap ] = useLoader(TextureLoader, [
        '/textures/cube/tile_ao.bmp',
        '/textures/cube/tile_diffuse.bmp',
        '/textures/cube/tile_height.bmp',
        '/textures/cube/tile_metallic.bmp',
        '/textures/cube/tile_normal.bmp',
        '/textures/cube/tile_smoothness.bmp',
    ]);

    normalMap.colorSpace = NoColorSpace;
    diffuseMap.colorSpace = LinearSRGBColorSpace;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case "w": movement.current.w = true; break;
                case "a": movement.current.a = true; break;
                case "s": movement.current.s = true; break;
                case "d": movement.current.d = true; break;
                default: break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case "w": movement.current.w = false; break;
                case "a": movement.current.a = false; break;
                case "s": movement.current.s = false; break;
                case "d": movement.current.d = false; break;
                default: break;
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

    useFrame((_, delta) => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.005;
            cubeRef.current.rotation.y += 0.005;

            // Update position based on keys pressed
            const speed = 0.025;
            const direction = new Vector3();
            if (movement.current.w) direction.z -= speed;
            if (movement.current.s) direction.z += speed;
            if (movement.current.a) direction.x -= speed;
            if (movement.current.d) direction.x += speed;
            cubeRef.current.position.add(direction);

            setPosition(cubeRef.current.position.toArray());
        }
    });

    return (
        <mesh ref={cubeRef} position={[0, 1.5, 0]} receiveShadow castShadow>
            <boxGeometry args={[1, 1, 1]}/>
            <meshPhysicalMaterial
                map={diffuseMap}
                normalMap={normalMap}
                metalnessMap={metallicMap}
                roughnessMap={smoothMap}
                aoMap={aoMap}
            />
        </mesh>
    )
}