import React, { useRef, useEffect } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { Box3, Box3Helper, Mesh } from 'three';

// Extend will make Box3Helper available as a JSX element
extend({ Box3Helper });

const BoundingBoxHelper = ({ objectRef }: {objectRef: any }) => {
    const { scene } = useThree();
    const helperRef = useRef<any>(null);

    useEffect(() => {
        if (objectRef.current) {
            // Calculate the bounding box
            const box = new Box3().setFromObject(objectRef.current);

            // Update the helper to match the object's bounding box
            if (helperRef.current) {
                helperRef.current.box.copy(box);
            } else {
                // If the helper doesn't exist yet, create and add it to the scene
                const helper = new Box3Helper(box, 0xffff00); // Use yellow or any color
                helperRef.current = helper;
                scene.add(helper);
            }
        }

        // Cleanup function to remove the helper from the scene on component unmount
        return () => {
            if (helperRef.current) {
                scene.remove(helperRef.current);
            }
        };
    }, [objectRef, scene]);

    return null; // This component does not render anything itself
};

export default BoundingBoxHelper;
