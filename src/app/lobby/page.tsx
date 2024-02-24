import Player from "@/modules/Player";
import ThreeJsScene from "@/components/ThreeJsScene.";
import {Suspense} from "react";

export default function Lobby() {
    const wizard = new Player('Henry', 100);

    return (
        <main className="h-screen">
            <div className="w-full h-full">
                <h2>Lobby</h2>
                <p>{wizard.greet()}</p>
                <Suspense fallback={<div>Esperate! chucha su madre...</div>}>
                    <ThreeJsScene/>
                </Suspense>
            </div>
        </main>
    )
}
