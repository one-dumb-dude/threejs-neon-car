import MainWrapper from "@/components/MainWrapper";
import AirplaneScene from "@/components/threejs/airplane/AirplaneScene";
import {OrbitControls} from "@react-three/drei";

export default function Page() {
    return(
        <MainWrapper>
            <AirplaneScene />
        </MainWrapper>
    )
}
