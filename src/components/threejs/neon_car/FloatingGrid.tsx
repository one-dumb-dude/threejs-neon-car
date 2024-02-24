import {useFrame, useLoader} from "@react-three/fiber";
import {RepeatWrapping, TextureLoader} from "three";
import {useEffect} from "react";

export default function FloatingGrid() {
    const diffuse = useLoader(TextureLoader, 'textures/ground/grid-texture.png');

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30, 30);
    }, [diffuse]);

    useFrame((state, delta) => {
        const t = -state.clock.getElapsedTime() * 0.68;
        diffuse.offset.set(0, t);
    });

    return (
        <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.25, 0]}>
            <planeGeometry args={[35, 35]} />
            <meshBasicMaterial
                color={[1,1,1]}
                opacity={0.15}
                map={diffuse}
                alphaMap={diffuse}
                transparent
            />
        </mesh>
    )
}
