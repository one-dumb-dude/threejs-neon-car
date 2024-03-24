import {Canvas, useLoader} from '@react-three/fiber';
import {Stats, OrbitControls, PerspectiveCamera, useHelper} from '@react-three/drei';
import {folder, useControls} from 'leva';
import {useEffect, useRef} from "react";
import {BoxHelper, DoubleSide, Group, Mesh, SpotLight, SpotLightHelper, TextureLoader} from "three";
import gridTexture from '/public/textures/texture-uv-grid.png';

function SceneContent() {
    const boxRef = useRef<Mesh | null>(null);
    const groupRef = useRef<Group | null>(null);
    const spotlightRef = useRef<SpotLight | null>(null);

    const texture = useLoader(TextureLoader, gridTexture.src);

    const {
        boxPositionX,
        boxPositionY,
        boxPositionZ,
        boxRotationX,
        boxRotationY,
        boxRotationZ,
        groupPositionX,
        groupPositionY,
        groupPositionZ,
        groupRotationX,
        groupRotationY,
        groupRotationZ,
        spotLightPositionX,
        spotLightPositionY,
        spotLightPositionZ,
        spotLightIntensity,
        spotLightDistance,
        spotLightAngle,
        spotLightPenumbra
    } = useControls({
        box: folder({
            position: folder({
                boxPositionX: {value: 0, min: -2, max: 2, step: 0.005},
                boxPositionY: {value: 0, min: -2, max: 2, step: 0.005},
                boxPositionZ: {value: 0, min: -2, max: 2, step: 0.005},
            }),
            rotation: folder({
                boxRotationX: {value: 0, min: 0, max: Math.PI * 2, step: 0.01},
                boxRotationY: {value: 0, min: 0, max: Math.PI * 2, step: 0.01},
                boxRotationZ: {value: 0, min: 0, max: Math.PI * 2, step: 0.01},
            })
        }),
        group: folder({
            position: folder({
                groupPositionX: {value: 0, min: -2, max: 2, step: 0.01},
                groupPositionY: {value: 0, min: -2, max: 2, step: 0.01},
                groupPositionZ: {value: 0, min: -2, max: 2, step: 0.01},
            }),
            rotation: folder({
                groupRotationX: {value: -Math.PI / 2, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01},
                groupRotationY: {value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01},
                groupRotationZ: {value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: 0.01}
            })
        }),
        spotLight: folder({
            Light: folder({
                spotLightIntensity: {value: 1, min: 0, max: 5, step: 0.01},
                spotLightDistance: {value: 3, min: 0, max: 5, step: 0.01},
                spotLightAngle: {value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.01 },
                spotLightPenumbra: { value: 1, min: 0, max: 1, step: 0.01}
            }),
            position: folder({
                spotLightPositionX: {value: 0, min: -2, max: 2, step: 0.01},
                spotLightPositionY: {value: 1, min: -2, max: 2, step: 0.01},
                spotLightPositionZ: {value: 1, min: -2, max: 2, step: 0.01}
            })
        })
    });

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.position.x = boxPositionX;
            boxRef.current.position.y = boxPositionY;
            boxRef.current.position.z = boxPositionZ;
            boxRef.current.rotation.x = boxRotationX;
            boxRef.current.rotation.y = boxRotationY;
            boxRef.current.rotation.z = boxRotationZ;
        }
    }, [boxPositionX, boxPositionY, boxPositionZ, boxRotationX, boxRotationY, boxRotationZ]);

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.position.x = groupPositionX;
            groupRef.current.position.y = groupPositionY;
            groupRef.current.position.z = groupPositionZ;
            groupRef.current.rotation.x = groupRotationX;
            groupRef.current.rotation.y = groupRotationY;
            groupRef.current.rotation.z = groupRotationZ;
        }
    }, [groupPositionX, groupPositionY, groupPositionZ, groupRotationX, groupRotationY, groupRotationZ]);

    useEffect(() => {
        if (spotlightRef.current) {
            spotlightRef.current.position.x = spotLightPositionX;
            spotlightRef.current.position.y = spotLightPositionY;
            spotlightRef.current.position.z = spotLightPositionZ;
            spotlightRef.current.intensity = spotLightIntensity;
            spotlightRef.current.distance = spotLightDistance;
            spotlightRef.current.angle = spotLightAngle;
            spotlightRef.current.penumbra = spotLightPenumbra;
        }
    }, [
        spotLightPositionX,
        spotLightPositionY,
        spotLightPositionZ,
        spotLightIntensity,
        spotLightDistance,
        spotLightAngle,
        spotLightPenumbra
    ]);

    useHelper(boxRef as any, BoxHelper, "#b919d0");
    useHelper(spotlightRef as any, SpotLightHelper, "#ce2626");

    return (
        <>
            <PerspectiveCamera makeDefault position={[2, 3, 3]}/>
            <ambientLight intensity={0.2}/>
            <spotLight ref={spotlightRef} intensity={spotLightIntensity} castShadow/>

            <group ref={groupRef}>
                <mesh ref={boxRef} receiveShadow castShadow>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshPhysicalMaterial color={[1, 1, 1]} map={texture as any}/>
                </mesh>

                <mesh position={[0, 0, -0.5]} receiveShadow>
                    <planeGeometry args={[4, 4, 4]}/>
                    <meshPhysicalMaterial color={[0.2, 0.3, 0.4]} side={DoubleSide}/>
                </mesh>
            </group>

            <OrbitControls target={[0, 0, 0]}/>
            <Stats/>
            <axesHelper/>
            <gridHelper args={[5, 10]}/>
        </>
    )
}

export default function ThreejsPlaygroundScene() {
    return (
        <Canvas shadows>
            <SceneContent/>
        </Canvas>
    );
}
