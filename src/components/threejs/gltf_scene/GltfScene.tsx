import {Canvas, useLoader} from "@react-three/fiber";
import React, {Suspense, useRef} from "react";
import {OrbitControls, useHelper} from "@react-three/drei";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {ACESFilmicToneMapping, Material, Mesh, MeshStandardMaterial, PointLight, PointLightHelper, SpotLight} from "three";
import {EffectComposer, Bloom} from '@react-three/postprocessing';
import {BlendFunction} from "postprocessing";

function GltfSceneContent() {
    const roadGlb = useLoader(GLTFLoader, '/glbs/road/town.glb');

    const lightRedRef = useRef<PointLight>(null!);
    const lightBlueRef = useRef<PointLight>(null!);

    useHelper(lightRedRef, PointLightHelper, 1, 'red');
    useHelper(lightBlueRef, PointLightHelper, 1, 'blue');

    roadGlb.scene.traverse(child => {
        if ((child as SpotLight).isLight) {
            const light = child as SpotLight;
            light.intensity = 50.0;
            light.penumbra = Math.PI / 2;
            console.log(light)
        }
        if ((child as Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (((child as Mesh).material as Material).name === 'Material.003') {
                const meshStandardMaterial = (child as Mesh).material as MeshStandardMaterial;
                meshStandardMaterial.emissive.set(0xff2211);
                meshStandardMaterial.emissiveIntensity = 1.20;
            }
        }
    });

    return (
        <>
            <pointLight
                ref={lightRedRef}
                position={[3, 4, 2]}
                castShadow
                color={[1.0, 0.2, 0.2]}
                intensity={20.0}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
                shadow-radius={4}
            />
            <pointLight
                ref={lightBlueRef}
                position={[-3, 4, -3]}
                castShadow
                color={[0.3, 0.9, 0.25]}
                intensity={20.0}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
                shadow-radius={4}
            />

            <Suspense fallback={null}>
                <primitive object={roadGlb.scene} position={[0, 0, 0]}/>
            </Suspense>

            <EffectComposer>
                <Bloom
                    blendFunction={BlendFunction.ADD}
                    intensity={1.3} // The bloom intensity
                    width={300} // render width
                    height={300} // render height
                    kernelSize={5} // blur kernel size
                    luminanceThreshold={0.15} // Luminance threshold. Raise this value to mask out darker elements
                    luminanceSmoothing={0.025} // smoothness of "luminance threshold", range is 0 to 1.
                />
            </EffectComposer>

            <OrbitControls/>
        </>
    )
}

export default function GltfScene() {
    return (
        <Canvas
            onCreated={({gl}) => {
                gl.toneMapping = ACESFilmicToneMapping;
                gl.toneMappingExposure = 5.0;
            }}
            shadows
        >
            <GltfSceneContent/>
        </Canvas>
    );
}
