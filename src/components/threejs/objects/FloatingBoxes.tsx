import {useRef, useState} from "react";
import {Mesh, Color, Vector3} from "three";
import {useFrame} from "@react-three/fiber";

function Box({color}: { color: Color }) {
    const boxRef = useRef<Mesh>(null);
    let time = 0;
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
    const [xRotationSpeed] = useState<number>(Math.random());
    const [yRotationSpeed] = useState<number>(Math.random());
    const [position, setPosition] = useState<Vector3>(getInitialPosition)

    function getInitialPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        return v;
    }

    function resetPosition() {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10);
        if (v.x < 0) v.x -= 1.75;
        if (v.x > 0) v.x += 1.75;

        setPosition(v);
    }

    // @ts-ignore
    useFrame((_, delta) => {
        if (position && boxRef.current) {
            time += delta * 1.2;
            const newZ = position.z - time;

            if (newZ < -10) {
                resetPosition();
                time = 0;
            }

            boxRef.current.position.set(position.x, position.y, newZ);
            boxRef.current.rotation.x += delta * xRotationSpeed;
            boxRef.current.rotation.y += delta * yRotationSpeed;
        }
    }, [xRotationSpeed, yRotationSpeed, position]);

    return (
        <mesh ref={boxRef} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

export default function FloatingBoxes() {
    const boxes = new Array(100).fill(null);

    return (
        <>
            {
                boxes.map((box, index) => <Box
                    key={index}
                    color={index % 2 === 0 ? new Color(0.75, 0.1, 0.1) : new Color(0.55, 0.15, 0.4)}
                />)
            }
        </>
    )
}
