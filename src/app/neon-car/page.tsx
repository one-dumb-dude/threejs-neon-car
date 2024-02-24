import NeonCarScene from "@/components/threejs/neon_car/NeonCarScene";
import {Suspense} from "react";

export default function Lobby() {

    return (
        <main className="h-screen">
            <div className="w-full h-full">
                <Suspense fallback={<div>Esperate! chucha su madre...</div>}>
                    <NeonCarScene/>
                </Suspense>
            </div>
        </main>
    )
}
