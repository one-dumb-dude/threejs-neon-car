import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useEffect} from "react";
import {Mesh} from "three";

export default function Car() {
    const gltf = useLoader(
        GLTFLoader,
        '/glbs/bmw_850i_e31.glb'
    );

    useEffect(() => {
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });

    }, [gltf]);

    return <primitive object={gltf.scene}></primitive>
}
