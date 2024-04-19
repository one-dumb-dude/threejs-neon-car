import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useContext, useEffect, useRef} from "react";
import {Box3, Group, MathUtils, Mesh, Object3D, Object3DEventMap} from "three";
import AirplaneContext from "@/components/threejs/airplane/contexts/AirplaneContext";

export default function AirplaneModel({onBoundingBoxChange}: { onBoundingBoxChange: any }) {
    const airplaneRef = useRef<Object3D>(null);
    const airplaneGlb = useLoader(GLTFLoader, '/glbs/airplane/airplane-no-wheels.glb');
    const {setPosition} = useContext(AirplaneContext);

    const movement = useRef({w: false, s: false});

    useEffect(() => {
        airplaneGlb.scene.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 2;
            }
        });

        const keydown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    movement.current.w = true;
                    break;
                case 's':
                case 'arrowdown':
                    movement.current.s = true;
                    break;
                default:
                    break;
            }
        }

        const keyup = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    movement.current.w = false;
                    break;
                case 's':
                case 'arrowdown':
                    movement.current.s = false;
                    break;
                default:
                    break;
            }
        }
        window.addEventListener('keydown', keydown);
        window.addEventListener('keyup', keyup);

        return () => {
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('keyup', keyup);
        }
    }, [airplaneGlb]);

    const amplitude = 0.075;
    const frequency = .25;
    const movingPitchAmplitude = 0.3; // Controls the amount of pitch change, adjust as needed
    const idlePitchAmplitude = 0.1; // Controls the amount of pitch change, adjust as needed

    let altitude = useRef(0);
    const movementSpeed = 0.005;


    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        let newYPosition: number;
        let newZPosition: number;

        if (movement.current.w) {
            altitude.current += movementSpeed;
            newYPosition = altitude.current;
            newZPosition = MathUtils.lerp(0, -movingPitchAmplitude, 1);
        } else if (movement.current.s) {
            altitude.current -= movementSpeed;
            newYPosition = altitude.current;
            newZPosition = movingPitchAmplitude;
        } else {
            newYPosition = altitude.current + Math.sin(elapsedTime * frequency) * amplitude;
            // To rotate the airplane, take the cosine (the derivative of sine) to get the slope
            newZPosition = Math.cos(elapsedTime * frequency) * -idlePitchAmplitude;
        }

        airplaneGlb.scene.position.y = newYPosition;
        airplaneGlb.scene.rotation.z = newZPosition;

        if (setPosition) {
            setPosition(airplaneGlb.scene.position.toArray())
        }

        if (airplaneRef.current) {
            const boundingBox = new Box3().setFromObject(airplaneRef.current);
            onBoundingBoxChange(boundingBox);
        }
    });

    return (
        <primitive object={airplaneGlb.scene} ref={airplaneRef}></primitive>
    )
}
