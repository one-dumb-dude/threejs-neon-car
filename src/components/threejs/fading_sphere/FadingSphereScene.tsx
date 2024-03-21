'use client';

import {Canvas} from "@react-three/fiber";
import FadingSphere from "@/components/threejs/fading_sphere/FadingSphere";

export default function FadingSphereScene() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FadingSphere />
        </Canvas>
    )
}
