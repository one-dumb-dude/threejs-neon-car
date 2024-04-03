// To start over, copy all of FadingSphere.tsx and paste it here!
import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {ShaderMaterial} from 'three';

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float opacity;

  void main() {
    gl_FragColor = vec4(0.0, 0.7, 1.0, opacity); // Blue color with varying opacity
  }
`;

export default function PlayWithShaders() {
    const materialRef = useRef<ShaderMaterial>(null);

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        const opacity = Math.max(1.0 - elapsedTime / 5, 0); // Fades over 5 seconds

        if (materialRef.current) {
            materialRef.current.uniforms.opacity.value = opacity;
        }
    });

    return (
        <>
            <mesh>
                <sphereGeometry args={[1, 32, 32]}/>
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        opacity: {value: 1.0}
                    }}
                    transparent
                />
            </mesh>
        </>
    );
}

