import React from 'react';

export default function ApplicationLogo({ color = 'white' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" viewBox="0 0 24 24">
            <path stroke={color} strokeMiterlimit={10} d="M13.75 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3.5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5.25 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            <path stroke={color} strokeMiterlimit={10} d="M17.15 9.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm2.6-3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-12.95-3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-2.6-3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm11.7-6.8a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-7.8 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.95.8a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.85 13a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-7.8 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.95-.8a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" opacity=".4" />
            <path stroke={color} strokeMiterlimit={10} d="M8.5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.75 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2.45v0" opacity=".4" />
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.5 2.85v0m0 18.35v0m2.5-4.7v0M20 7v0M4 16.5v0M4 7v0m2.5-4.15v0m0 18.35v0" opacity=".4" />
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.5v0M1.55 12v0m20.95 0v0" opacity=".4" />
        </svg>
    );
}
