import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3, TubeGeometry, MeshBasicMaterial } from 'three';

const SmoothCurve = () => {
    const [points, setPoints] = useState([
        new Vector3(-1, 0, 0),
        new Vector3(-0.5, 0.5, 0), // This point will be animated
        new Vector3(0.5, -0.5, 0),
        new Vector3(1, 0, 0),
    ]);

    // Function to update the y position of the second point
    const animatePoint = () => {
        setPoints((prevPoints) => {
            const newPoints = [...prevPoints];
            const time = Date.now() * 0.001;
            newPoints[1].y = 0.5 + Math.sin(time) * 0.5; // Sin wave animation
            return newPoints;
        });
    };

    useEffect(() => {
        const interval = setInterval(animatePoint, 0); // Update every 100 ms
        return () => clearInterval(interval);
    }, []);

    const curve = new CatmullRomCurve3(points);
    const tubeGeometry = new TubeGeometry(curve, 64, 0.01, 8, false);

    return (
        <mesh geometry={tubeGeometry}>
            <meshBasicMaterial color="red" />
        </mesh>
    );
};


export default SmoothCurve;
