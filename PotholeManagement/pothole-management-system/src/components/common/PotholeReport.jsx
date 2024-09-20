import React from 'react';
import RightBar from "./RightBar";
import LeftBar from './LeftBar';

export default function PotholeReport() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 p-2 lg:p-6 bg-gray-50 min-h-screen">
            {/* left Content */}
            <LeftBar />
            {/* Right Sidebar */}
            <RightBar />
        </div>
    );
}
