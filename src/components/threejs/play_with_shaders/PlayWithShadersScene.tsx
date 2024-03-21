'use client';

import {Canvas} from "@react-three/fiber";
import PlayWithShaders from "@/components/threejs/play_with_shaders/PlayWithShaders";

export default function PlayWithShadersScene() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <PlayWithShaders />
        </Canvas>
    )
}
