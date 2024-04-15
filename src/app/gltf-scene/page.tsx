'use client';

import MainWrapper from "@/components/MainWrapper";
import GltfScene from "@/components/threejs/gltf_scene/GltfScene";

export default function Scene() {
    return (
        <MainWrapper>
            <GltfScene />
        </MainWrapper>
    );
}
