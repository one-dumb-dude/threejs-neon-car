import {Box3, Group, Mesh, Object3DEventMap} from "three";
import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {useEffect, useRef} from "react";

export default function DroneModel({altitude, onBoundingBoxChange}: { altitude: number, onBoundingBoxChange: any }) {

    const boundingBox = new Box3();

    const droneGlb = useLoader(GLTFLoader, 'glbs/airplane/ski-fi_drone_free.glb');
    const droneRef = useRef< Group<Object3DEventMap> | null>(null);

    const droneXVelocity = 0.02;
    const droneStartingXPosition = -10;
    const droneXPosition = useRef(droneStartingXPosition);

    useEffect(() => {
        // in order to have multiple instances of the drone, you need to clone the loaded GLTF.
        const clone = droneGlb.scene.clone();

        clone.scale.set(.2, .2, .2);
        clone.position.set(droneXPosition.current, 0, 0);

        clone.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 1;
            }
        });

        if (droneRef.current) {
            boundingBox.setFromObject(clone);
        }

        droneRef.current = clone;

    }, [boundingBox, droneGlb]);

    const frequency = 1.35;
    const amplitude = .25;

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();

        if (droneXPosition.current >= 5) {
            droneXPosition.current = droneStartingXPosition;
        }

        if (droneRef.current) {
            droneRef.current.position.x = droneXPosition.current += droneXVelocity;
            const boundingBox = new Box3().setFromObject(droneRef.current);
            onBoundingBoxChange(boundingBox);
        }

    });

    return (
        droneRef.current ? <primitive object={droneRef.current} /> : null
    )
}
