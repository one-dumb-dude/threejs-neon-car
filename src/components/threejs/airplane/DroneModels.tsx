import DroneModel from "@/components/threejs/DroneModel";

export default function DroneModels() {
    return (
        <>
            <DroneModel key="drone1" altitude={1} />
            <DroneModel key="drone2" altitude={-1} />
            <DroneModel key="drone3" altitude={-2} />
        </>
    );
}
