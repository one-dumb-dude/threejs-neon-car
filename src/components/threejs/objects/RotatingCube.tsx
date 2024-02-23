import {useRef} from "react";
import {Mesh, TextureLoader} from "three";
import {useFrame, useLoader} from "@react-three/fiber";

export default function RotatingCube() {
    const cubeRef = useRef<Mesh>(null);
    const [aoMap, diffuseMap, heightMap, metallicMap, normalMap, smoothMap ] = useLoader(TextureLoader, [
        '/textures/cube/tile_ao.bmp',
        '/textures/cube/tile_diffuse.bmp',
        '/textures/cube/tile_height.bmp',
        '/textures/cube/tile_metallic.bmp',
        '/textures/cube/tile_normal.bmp',
        '/textures/cube/tile_smoothness.bmp',
    ])

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.01;
            cubeRef.current.rotation.y += 0.01;
        }
    })

    return (
        <mesh ref={cubeRef} receiveShadow castShadow>
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
