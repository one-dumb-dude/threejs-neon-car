import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useEffect, useRef} from "react";
import {AnimationMixer, Mesh} from "three";

export default function EveModel() {
    const eveGlb = useLoader(GLTFLoader, '/glbs/eve/eve_with_animations.glb');
    const mixerRef = useRef<AnimationMixer | null>(null);

    useEffect(() => {
        eveGlb.scene.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 2;
            }
        });

        if (eveGlb.animations.length > 0) {
            mixerRef.current = new AnimationMixer(eveGlb.scene);
            const action = mixerRef.current.clipAction(eveGlb.animations[4]);

            action.play();

        }
    }, [eveGlb]);

    useFrame((_, delta) => {
        mixerRef.current?.update(delta);
    });

    return(
        <primitive object={eveGlb.scene}></primitive>
    )
}
