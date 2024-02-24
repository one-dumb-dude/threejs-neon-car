import {useContext, useEffect, useRef} from "react";
import {Object3D, SpotLight} from "three";
import {useFrame} from "@react-three/fiber";
import CubeContext from "@/components/threejs/rotating_cube/context/CubeContext";

export default function SpotLightComp() {
    const spotlight1 = useRef<SpotLight>(null);
    const targetRef = useRef<Object3D>(null);
    const {position} = useContext(CubeContext);

    useFrame(()=> {
        if (spotlight1.current && targetRef.current) {
            targetRef.current.position.set(...position);
            spotlight1.current.target = targetRef.current;
        }
    });

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.position.set(0,0,0);
        }
    }, []);

    return (
        <>
            <spotLight
                ref={spotlight1}
                position={[0, 3, 0]}
                intensity={9}
                angle={Math.PI / 4}
                distance={100}
                penumbra={0.4}
                castShadow
                shadow-bias={0.02}
            />
            <object3D ref={targetRef} />
        </>

    )
}
