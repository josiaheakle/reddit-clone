import { useState, useEffect } from 'react';

class DimensionHandler {

    static getWindowDimensions() : { width: number; height: number; } {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

}


function useWindowDimensions() : { width: number; height: number; } {
    const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number; }>(DimensionHandler.getWindowDimensions());
    
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(DimensionHandler.getWindowDimensions());
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowDimensions;
}

export { useWindowDimensions };