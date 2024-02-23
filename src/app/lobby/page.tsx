import Player from "@/modules/Player";
import ThreeJsScene from "@/components/ThreeJsScene.";

export default function Lobby() {
    const wizard = new Player('Henry', 100);

    return (
        <main className="w-screen h-screen">
            <div className="w-full h-full">
                <h2>Lobby</h2>
                <p>{wizard.greet()}</p>
                <ThreeJsScene/>
            </div>
        </main>
    )
}
