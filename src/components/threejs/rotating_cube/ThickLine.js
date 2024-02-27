import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line2, LineGeometry, LineMaterial } from "three-stdlib";
import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

export default function ThickLineWithDots() {
    // Generate initial points for the line
    const points = useMemo(() => {
        const pts = [];
        const segments = 100; // Number of segments for the sine wave
        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * 4 - 2; // Scale x to go from -2 to 2
            const y = Math.sin(x * Math.PI) * 1; // Amplitude of 1
            pts.push([x, y, 0]);
        }
        return pts;
    }, []);

    const lineGeometry = useMemo(() => {
        const geometry = new LineGeometry();
        geometry.setPositions(points.flat());
        return geometry;
    }, [points]);

    const lineMaterial = useMemo(() => new LineMaterial({
        color: 0xff0000, // Red color
        linewidth: 0.01, // Line width
    }), []);

    const line = useRef();
    useFrame((state, delta) => {
        // This will update on every frame, you can add animations here
        const time = state.clock.getElapsedTime();
        const newPoints = [];
        points.forEach((point, index) => {
            const x = point[0];
            const y = Math.sin(x * Math.PI + time) * 1; // Sine wave logic
            newPoints.push(x, y, 0);
        });
        line.current.geometry.setPositions(newPoints.flat());
        line.current.geometry.attributes.position.needsUpdate = true; // Important for updating the geometry
    });

    return (
        <>
            <primitive ref={line} object={new Line2(lineGeometry, lineMaterial)} />
            {points.map((point, idx) => (
                <mesh
                    key={idx}
                    position={[point[0], point[1], point[2]]}
                    scale={[0.05, 0.05, 0.05]} // Size of the dots
                >
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial color="green" />
                </mesh>
            ))}
        </>
    );
}
