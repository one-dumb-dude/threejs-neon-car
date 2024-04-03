import React, {useEffect, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {DragControls} from '@react-three/drei';
import {Mesh, MeshBasicMaterial} from 'three';


function DragControlsContent() {
    const ref = useRef<Mesh | null>(null);

    return (
        <>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>

            <DragControls
                onHover={(hovering) => {
                    console.log('ghost');
                    if (ref.current) {
                        const material = ref.current.material as MeshBasicMaterial;
                        material.opacity = hovering ? 0.4 : 1.0;
                    }
                }}

                onDragStart={(origin) => {
                    console.log(origin)
                }}
                onDragEnd={() => {
                    console.log('end');
                }}
            >
                <mesh ref={ref}>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshBasicMaterial color={[0.5, 0.8, 0.3]} opacity={1.0} transparent/>
                </mesh>
            </DragControls>
        </>
    );
}

export default function DragControlsScene() {
    return (
        <Canvas shadows>
        <DragControlsContent/>
        </Canvas>
    );
}
