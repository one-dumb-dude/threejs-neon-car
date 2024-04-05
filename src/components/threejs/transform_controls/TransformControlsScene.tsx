import React, {useEffect, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {TransformControls, Html} from '@react-three/drei';
import {Mesh} from 'three';


function TransformControlsContent() {
    const meshRef = useRef<Mesh | null>(null);
    const transformRef = useRef<any | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (transformRef.current) {
                switch (event.key) {
                    case 'r':
                        transformRef.current.setMode('rotate');
                        break;
                    case 's':
                        transformRef.current.setMode('scale');
                        break;
                    case 'g':
                        transformRef.current.setMode('translate');
                        break;
                    default:
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <ambientLight intensity={0.4}/>

            <pointLight position={[1, 1.5, 1]} intensity={5.0} />

            <TransformControls ref={transformRef} mode="scale" >
                <mesh ref={meshRef}>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshStandardMaterial color={[0.1, 0.32, 0.7]} />
                </mesh>
            </TransformControls>

            <Html position={[-1, 3, 0]}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 'max-content', textAlign: 'center', padding: '10px', color: 'white', fontFamily: 'Arial' }}>
                    G: Move R: Rotate    S: Scale
                </div>
            </Html>
        </>
    );
}

export default function TransformControlsScene() {
    return (
        <Canvas shadows>
            <TransformControlsContent/>
        </Canvas>
    );
}
