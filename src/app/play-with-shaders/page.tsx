'use client';

import MainWrapper from "@/components/MainWrapper";
import PlayWithShadersScene from "@/components/threejs/play_with_shaders/PlayWithShadersScene";

export default function Scene() {
    return (
        <MainWrapper>
            <PlayWithShadersScene />
        </MainWrapper>
    );
}
