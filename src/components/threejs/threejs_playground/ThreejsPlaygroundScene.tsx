import {Canvas, useThree} from '@react-three/fiber';
import {Stats, OrbitControls, PerspectiveCamera, useHelper} from '@react-three/drei';
import {folder, useControls} from 'leva';
import {useEffect, useRef} from "react";
import {BoxHelper, DoubleSide, Group, Mesh, SpotLight, SpotLightHelper} from "three";


function SceneContent() {
    const boxRef = useRef<Mesh>(null);
    const groupRef = useRef<Group>(null);
    const spotlightRef = useRef<SpotLight>(null);

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
        groupRotationZ
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

    useHelper(boxRef, BoxHelper, "#b919d0")
    useHelper(spotlightRef, SpotLightHelper, "#ce2626")

    return (
        <>
            <PerspectiveCamera makeDefault position={[2, 3, 3]}/>
            <ambientLight intensity={0.2}/>
            <spotLight ref={spotlightRef} position={[0, 1, 1]} castShadow/>

            <group ref={groupRef}>
                <mesh ref={boxRef} receiveShadow castShadow>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshPhysicalMaterial color={[1, 1, 1]}/>
                </mesh>

                <mesh position={[0, 0, -0.5]} receiveShadow>
                    <planeGeometry args={[4, 4, 4]} />
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
        <>
            <Canvas shadows>
                <SceneContent/>
            </Canvas>
        </>
    );
}
