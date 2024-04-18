'use client';

import MainWrapper from "@/components/MainWrapper";
import OrbitControlsScene from "@/components/threejs/orbit_controls/OrbitControlsScene";


export default function Scene() {
    return (
        <MainWrapper>
            <OrbitControlsScene />
        </MainWrapper>
    );
}
