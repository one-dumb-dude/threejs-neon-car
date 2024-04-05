'use client';

import MainWrapper from "@/components/MainWrapper";
import PointerLockScene from "@/components/threejs/pointerLock/PointerLockScene";

export default function Scene() {
    return (
        <MainWrapper>
            <PointerLockScene />
        </MainWrapper>
    );
}
