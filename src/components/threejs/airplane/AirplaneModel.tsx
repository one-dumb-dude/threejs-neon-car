import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useContext, useEffect} from "react";
import {Mesh} from "three";
import AirplaneContext from "@/components/threejs/airplane/contexts/AirplaneContext";

export default function AirplaneModel() {
    const airplaneGlb = useLoader(GLTFLoader, '/glbs/airplane/airplane-no-wheels.glb');
    const {setPosition} = useContext(AirplaneContext);

    useEffect(() => {
        airplaneGlb.scene.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 2;
            }
        })
    }, [airplaneGlb]);

    const amplitude = 1;
    const frequency = 0.4;

    useFrame(({clock}, delta) => {
        const elapsedTime = clock.getElapsedTime();

        airplaneGlb.scene.position.y = Math.sin(elapsedTime * frequency) * amplitude;

        // To rotate the airplane, take the cosine (the derivative of sine) to get the slope
        const pitchAmplitude = 0.6; // Controls the amount of pitch change, adjust as needed

        // Apply the rotation to the airplane
        airplaneGlb.scene.rotation.z = Math.cos(elapsedTime * frequency) * -pitchAmplitude;

        if (setPosition) {
            setPosition(airplaneGlb.scene.position.toArray())
        }
    });

    return(
        <primitive object={airplaneGlb.scene}></primitive>
    )
}
