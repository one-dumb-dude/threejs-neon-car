'use client';

import MainWrapper from "@/components/MainWrapper";
import RotatingCubeScene from "@/components/threejs/rotating_cube/RotatingCubeScene";

export default function Scene() {
    return (
        <MainWrapper>
            <RotatingCubeScene />
        </MainWrapper>
    );
}
