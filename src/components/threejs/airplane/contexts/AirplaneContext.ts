import {createContext} from "react";

type AirplaneContextType = {
    position: [number, number, number],
    setPosition: (position: [number, number, number]) => void
}

const AirplaneContext = createContext<AirplaneContextType>({
    position: [0, 0, 0],
    setPosition: () => {}
});

export default AirplaneContext;
