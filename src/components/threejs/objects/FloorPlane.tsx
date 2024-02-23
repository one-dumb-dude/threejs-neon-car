import {useLoader} from "@react-three/fiber";
import {LinearSRGBColorSpace, NoColorSpace, RepeatWrapping, TextureLoader} from "three";

export default function FloorPlane() {
    const textures = useLoader(TextureLoader, [
        '/textures/plane/stone_ao.png',
        '/textures/plane/stone_diffuse.png',
        '/textures/plane/stone_height.png',
        '/textures/plane/stone_metallic.png',
        '/textures/plane/stone_normal.png',
        '/textures/plane/stone_smoothness.png',
    ]);

    // Set textures to repeat
    textures.forEach(texture => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(4, 4); // This makes the texture repeat 2 times on each axis
    });

    const [aoMap, diffuseMap, heightMap, metallicMap, normalMap, smoothMap ] = textures;

    normalMap.colorSpace = NoColorSpace;
    diffuseMap.colorSpace = LinearSRGBColorSpace;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow >
            <planeGeometry args={[10, 10]}/>
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
