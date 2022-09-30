import React from 'react';

export default function Search({ color = '#292D32' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24">
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5h6m-6 3h3" opacity=".4" />
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.5c0 5.25-4.25 9.5-9.5 9.5S2 16.75 2 11.5 6.25 2 11.5 2" />
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m22 22-2-2" opacity=".4" />
        </svg>
    );
}
