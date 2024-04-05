import React, {useEffect, useRef} from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import {Mesh, MeshStandardMaterial} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import {OrbitControls} from "@react-three/drei";


function ObjectLoaderContent() {
    const ref = useRef<Mesh | null>(null);

    // Objs have .mtl (material) files associated with them.
    // You have to load the materials and then load them to the obj
    // if you investigate the obj & mtl files you can see obj links to the mtl file
    const mtl = useLoader(MTLLoader, '/objs/monkey/monkey2.mtl');
    const obj = useLoader(OBJLoader, '/objs/monkey/monkey2.obj', (obj) => {
        mtl.preload();
        obj.setMaterials(mtl);
    });

    return (
        <>
            <ambientLight/>
            <pointLight position={[1, 2, 1]} intensity={5.0}/>

            <mesh ref={ref}>
                <boxGeometry args={[1, 1, 1]}/>
                <meshPhysicalMaterial color={[0.5, 0.8, 0.3]} opacity={1.0} transparent/>
            </mesh>

            <primitive object={obj} />

            <OrbitControls />
        </>
    );
}

export default function ObjectLoaderScene() {
    return (
        <Canvas shadows>
            <ObjectLoaderContent/>
        </Canvas>
    );
}
