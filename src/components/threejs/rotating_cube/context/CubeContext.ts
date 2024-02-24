import {createContext} from 'react';

type CubeContextType = {
    position: [number, number, number],
    setPosition: (position: [number, number, number]) => void;
}

const CubeContext = createContext<CubeContextType>({
    position: [0, 0, 0],
    setPosition: () => {}
});

export default CubeContext;
