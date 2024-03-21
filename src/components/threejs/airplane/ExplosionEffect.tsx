import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Mesh, Vector3 } from "three";

type ExplosionEffectProps = {
    position: Vector3;
    onComplete: () => void;
};

export default function ExplosionEffect({ position, onComplete }: ExplosionEffectProps) {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    const startTime = useRef(0);

    useEffect(() => {
        startTime.current = performance.now();
    }, []);

    useFrame(() => {
        if (meshRef.current && materialRef.current) {
            const elapsedTime = (performance.now() - startTime.current) / 1000;
            const maxScale = 2; // Adjust the maximum scale of the explosion
            const scale = Math.min(elapsedTime * 4, maxScale); // Adjust the growth rate as needed

            meshRef.current.scale.set(scale, scale, scale);

            // Calculate the opacity based on the scale
            const opacity = 1 - (scale / maxScale);
            materialRef.current.opacity = opacity;

            if (opacity <= 0) {
                onComplete();
            }
        }
    });

    return (
        <Sphere ref={meshRef} position={position}>
            <meshStandardMaterial ref={materialRef} color="orange" transparent opacity={1} />
        </Sphere>
    );
}
