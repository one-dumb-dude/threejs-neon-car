import {useRef} from "react";
import {Color, Mesh, MeshStandardMaterial} from "three";
import {useFrame} from "@react-three/fiber";

export default function Rings() {
    const itemsRef = useRef<(Mesh | null)[]>([]);
    const rings = new Array(14).fill(null);

    useFrame((state) => {
        itemsRef.current.forEach((mesh, index) => {
            if (mesh) {
                const elapsed = state.clock.getElapsedTime();
                // to make rings stand still, use below
                // const z = (index - 7) * 3.5;
                // to animate rings, use below:
                const z = (index - 7) * 3.5 + (( elapsed * 0.4) % 3.5) * 2;
                mesh.position.set(0, 0, -z);

                const dist = 1 - Math.abs(z) * 0.04;
                mesh.scale.set(dist, dist, dist);

                const material = mesh.material as MeshStandardMaterial;

                const colorScale = (dist > 2) ? 1 - (Math.min(dist, 12) - 2) / 10 : 0.5;

                if (index % 2 === 1) {
                    material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
                } else {
                    material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale);
                }
            }

        });
    });

    return (
        <>
            {
                rings.map((_, i) => (
                    <mesh
                        castShadow
                        receiveShadow
                        position={[0, 0, 0]}
                        key={i}
                        ref={(el) => (itemsRef.current[i] = el)}
                    >
                        <torusGeometry args={[3.35, 0.05, 16, 100]}/>
                        <meshStandardMaterial emissive={[30, 30, 30]} color={[0, 0, 0]}/>
                    </mesh>
                ))
            }
        </>
    );
}
