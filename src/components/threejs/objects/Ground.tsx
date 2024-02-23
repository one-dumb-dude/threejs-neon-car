import {useLoader} from "@react-three/fiber";
import {LinearSRGBColorSpace, NoColorSpace, RepeatWrapping, TextureLoader} from "three";
import {MeshReflectorMaterial} from "@react-three/drei";

export default function Ground() {
    const textures = useLoader(TextureLoader, [
        '/textures/ground/terrain-normal.jpg',
        '/textures/ground/terrain-roughness.jpg',
    ]);

    // Set textures to repeat
    textures.forEach(texture => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(4, 4); // This makes the texture repeat 2 times on each axis
    });

    const [normal, rough] = textures;

    normal.colorSpace = NoColorSpace;
    rough.colorSpace = LinearSRGBColorSpace;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} castShadow receiveShadow >
            <planeGeometry args={[30, 30]}/>
            <MeshReflectorMaterial
                envMapIntensity={0}
                normalMap={normal}
                roughnessMap={rough}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[10000, 4000]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                reflectorOffset={0.2}
            />
        </mesh>
    )
}
