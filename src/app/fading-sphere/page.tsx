'use client';

import MainWrapper from "@/components/MainWrapper";
import FadingSphereScene from "@/components/threejs/fading_sphere/FadingSphereScene";

export default function Scene() {
    return (
        <MainWrapper>
            <FadingSphereScene />
        </MainWrapper>
    );
}
