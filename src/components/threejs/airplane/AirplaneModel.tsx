import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useContext, useEffect, useRef} from "react";
import {Mesh} from "three";
import AirplaneContext from "@/components/threejs/airplane/contexts/AirplaneContext";

export default function AirplaneModel() {
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
                    movement.current.w = true;
                    break;
                case 's':
                    movement.current.s = true;
                    break;
                default:
                    break;
            }
        }

        const keyup = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    movement.current.w = false;
                    break;
                case 's':
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
    const pitchAmplitude = 0.2; // Controls the amount of pitch change, adjust as needed
    const idlePitchAmplitude = 0.1; // Controls the amount of pitch change, adjust as needed

    let altitude = useRef(0);
    const movementSpeed = 0.005;


    useFrame(({clock}, delta) => {
        const elapsedTime = clock.getElapsedTime();

        // airplaneGlb.scene.position.y = Math.sin(elapsedTime * frequency) * amplitude;

        if (movement.current.w) {
            altitude.current += movementSpeed;
            airplaneGlb.scene.rotation.z = -pitchAmplitude;
        }

        if (movement.current.s) {
            altitude.current -= movementSpeed;
            airplaneGlb.scene.rotation.z = pitchAmplitude;
        }

        // if (!movement.current.w && !movement.current.s) {
        //     airplaneGlb.scene.position.y = altitude + Math.sin(elapsedTime * frequency) * amplitude;
        //     // To rotate the airplane, take the cosine (the derivative of sine) to get the slope
        //     // Apply the rotation to the airplane
        //     airplaneGlb.scene.rotation.z = Math.cos(elapsedTime * frequency) * -idlePitchAmplitude;
        // }


        console.log(altitude.current)

        airplaneGlb.scene.position.y = altitude.current;

        if (setPosition) {
            setPosition(airplaneGlb.scene.position.toArray())
        }

    });

    return (
        <primitive object={airplaneGlb.scene}></primitive>
    )
}
