'use client';

import MainWrapper from "@/components/MainWrapper";
import ObjectLoaderScene from "@/components/threejs/loaders/object/ObjLoaderScene";

export default function Scene() {
    return (
        <MainWrapper>
            <ObjectLoaderScene />
        </MainWrapper>
    )
}

