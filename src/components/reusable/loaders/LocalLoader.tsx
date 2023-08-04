import React from 'react';
import './loaderStyles.css';

export const LOCAL_LOADER_SIZES = {XS: '0.2', S: '0.4', M: '0.8', L: '1.2'}

const LocalLoader: React.FC<{ size: string }> = ({size}) => {
    return (
        <div className="lds-roller" style={{scale: size}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LocalLoader;