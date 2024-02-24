'use client';

import {Canvas} from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import Ground from "@/components/threejs/objects/Ground";
import Car from "@/components/threejs/objects/Car";
import {Color, PCFSoftShadowMap, Vector2} from "three";
import Rings from "@/components/threejs/objects/Rings";
import FloatingBoxes from "@/components/threejs/objects/FloatingBoxes";
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer} from "@react-three/postprocessing";
import {BlendFunction} from 'postprocessing';
import FloatingGrid from "@/components/threejs/objects/FloatingGrid";

export default function ThreeJsScene() {

    return (
        <Canvas
            style={{
                width: '100%',
                height: '100%'
            }}
            onCreated={({gl}) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = PCFSoftShadowMap; // Consider using soft shadows for better lighting
            }}
        >
            <color attach="background" args={[0, 0, 0]}/>

            <ambientLight intensity={0.05}/>

            <directionalLight
                color={new Color(1, 0.25, 0.7)} // Color in RGB
                intensity={0.3} // Intensity, similar to SpotLight for demonstration
                position={[0.1, 3, 2]} // Position, but keep in mind the light direction matters more
                castShadow // Enables shadow casting
                shadow-bias={-0.0001} // Shadow bias to reduce shadow artifacts
            />

            <directionalLight
                color={new Color(0.14, 0.5, 1)} // Using THREE.Color to set RGB values
                intensity={0.3} // Keeping the intensity as in the SpotLight for demonstration
                position={[-0.1, 3, 3]} // Position of the light, but direction matters more for DirectionalLight
                castShadow // Enable shadow casting
                shadow-bias={-0.0001} // Adjust shadow bias to reduce shadow artifacts
            />


            <CubeCamera resolution={256} frames={Infinity}>
                {
                    (texture) =>
                        <>
                            <Environment map={texture}/>
                            <Car/>
                        </>
                }
            </CubeCamera>

            <Rings/>

            <FloatingBoxes/>

            <FloatingGrid />

            <Ground/>

            <OrbitControls target={[0, 0, 0]}/>

            <PerspectiveCamera makeDefault fov={75} position={[3, 1, -0.5]}/>

            <EffectComposer>
                <DepthOfField
                    focusDistance={0.0035}
                    focalLength={0.01}
                    bokehScale={1}
                    height={480}
                />
                <Bloom
                    blendFunction={BlendFunction.ADD}
                    intensity={1.3} // The bloom intensity
                    width={300} // render width
                    height={300} // render height
                    kernelSize={5} // blur kernel size
                    luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements
                    luminanceSmoothing={0.025} // smoothness of luminance threshold, range is 0 to 1.
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={new Vector2(0.0005, 0.0012)}
                    radialModulation={false}
                    modulationOffset={0}
                />
            </EffectComposer>
        </Canvas>
    )
}
