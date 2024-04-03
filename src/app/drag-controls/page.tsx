'use client';

import MainWrapper from "@/components/MainWrapper";
import DragControlsScene from "@/components/threejs/drag_controls/DragControlsScene";

export default function Scene() {
    return (
        <MainWrapper>
            <DragControlsScene />
        </MainWrapper>
    )
}

