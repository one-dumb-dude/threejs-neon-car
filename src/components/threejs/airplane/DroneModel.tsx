import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useEffect} from "react";
import {Mesh} from "three";

export default function DroneModel() {

    const droneGlb = useLoader(GLTFLoader, 'glbs/airplane/ski-fi_drone_free.glb');

    useEffect(() => {
        droneGlb.scene.scale.set(.2, .2, .2);

        droneGlb.scene.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 1;
            }
        })
    }, [droneGlb]);

    const frequency = 1.35;
    const amplitude = .15;

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        droneGlb.scene.position.y = Math.sin(elapsedTime * frequency) * amplitude;
    })

    return(
        <primitive object={droneGlb.scene}></primitive>
    )
}
