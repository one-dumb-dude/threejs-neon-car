'use client';

import MainWrapper from "@/components/MainWrapper";
import TransformControlsScene from "@/components/threejs/transform_controls/TransformControlsScene";

export default function Scene() {
    return (
        <MainWrapper>
            <TransformControlsScene />
        </MainWrapper>
    )
}

