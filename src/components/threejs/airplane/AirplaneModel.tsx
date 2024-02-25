import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useEffect} from "react";
import {Mesh} from "three";

export default function AirplaneModel() {
    const airplaneGlb = useLoader(GLTFLoader, '/glbs/airplane/low-poly-airplane.glb');

    useEffect(() => {
        airplaneGlb.scene.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 2;
            }
        })
    }, [airplaneGlb]);

    return(
        <primitive object={airplaneGlb.scene}></primitive>
    )
}
