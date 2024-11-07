import React from 'react';
import {Outlet } from 'react-router-dom';
import '../css/core-style.css'

import StrideHeader from './StrideHeader';
import StrideFooter from './StrideFooter';

function StrideLayout() {
    return (
        <><div className="main-content-wrapper d-flex clearfix">
            <StrideHeader />
            <Outlet /> {/* Aquí se mostrará el contenido dinámico de cada página */}
        </div>
        
        <StrideFooter /></>
        
    );
}

export default StrideLayout;