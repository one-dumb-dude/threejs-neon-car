'use client';

import MainWrapper from "@/components/MainWrapper";
import TensorFlow2 from "@/components/tensorflow/tensorflow_2";
// import TensorFlowPlayground from "@/components/tensorflow/tensorflow";

export default function Scene() {
    return (
        <MainWrapper>
            <TensorFlow2 />
        </MainWrapper>
    );
}
