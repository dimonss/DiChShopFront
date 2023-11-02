import React from 'react';
import './loaderStyles.css';

export const LOCAL_LOADER_SIZES = { XS: '0.2', S: '0.4', M: '0.8', L: '1.2' };

const LocalLoader: React.FC<{ size: string; color?: string }> = ({ size, color = '#FFF' }) => {
    return (
        // @ts-ignore
        <div className="lds-roller" style={{ scale: size, '--color': color }}>
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <div key={index} />
                ))}
        </div>
    );
};

export default LocalLoader;
