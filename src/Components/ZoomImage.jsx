'use client';

import React, { useRef, useState, useEffect } from 'react';

const ZoomImage = ({ src, alt, renderRightSideContent }) => {
    const imgRef = useRef(null);
    const zoomRef = useRef(null);
    const lensRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({});
    const [lensStyle, setLensStyle] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    const zoomFactor = 2; // Adjust the zoom level here

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
        };

        // Initial check on mount
        handleResize();

        // Listen for resize events
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e) => {
        if (isMobile || !imgRef.current || !zoomRef.current || !lensRef.current) {
            return;
        }

        const img = imgRef.current;
        const zoom = zoomRef.current;
        const lens = lensRef.current;
        const bounds = img.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;

        // Keep the lens within the image bounds
        const lensWidth = lens.offsetWidth;
        const lensHeight = lens.offsetHeight;
        x = Math.max(0, Math.min(x - lensWidth / 2, bounds.width - lensWidth));
        y = Math.max(0, Math.min(y - lensHeight / 2, bounds.height - lensHeight));

        setLensStyle({
            left: `${x}px`,
            top: `${y}px`,
            opacity: 1,
        });

        const percentX = (x / bounds.width) * 100;
        const percentY = (y / bounds.height) * 100;

        setZoomStyle({
            backgroundImage: `url(${src})`,
            backgroundPosition: `${percentX}% ${percentY}%`,
            backgroundSize: `${bounds.width * zoomFactor}px ${bounds.height * zoomFactor}px`,
            opacity: 1,
        });
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsHovering(true);
            // Initialize lens size based on zoom factor (you might need to adjust this)
            if (imgRef.current && lensRef.current && zoomRef.current) {
                const bounds = imgRef.current.getBoundingClientRect();
                setLensStyle({
                    width: `${bounds.width / zoomFactor}px`,
                    height: `${bounds.height / zoomFactor}px`,
                    opacity: 0.5, // Make it visible on hover
                });
                setZoomStyle({ opacity: 0 }); // Initially hide zoom
            }
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsHovering(false);
            setLensStyle({ opacity: 0 });
            setZoomStyle({ opacity: 0 });
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            
            <div className="relative">
                <div
                    className="relative w-[350px] h-[350px] overflow-hidden rounded-lg border cursor-zoom-in"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    ref={imgRef}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-contain"
                    />
                    {isHovering && (
                        <div
                            ref={lensRef}
                            className="absolute border border-gray-300 bg-transparent opacity-0 transition-opacity duration-200"
                            style={lensStyle}
                        />
                    )}
                </div>

                
                {!isMobile && isHovering && (
                    <div
                        ref={zoomRef}
                        className="absolute top-0 left-[370px] w-[450px] h-[450px] border rounded-lg bg-no-repeat bg-contain shadow-md transition-opacity duration-200 opacity-100 z-40"
                        style={zoomStyle}
                    />
                )}
            </div>

            
            <div className="flex-grow flex flex-col justify-start">
                {renderRightSideContent && renderRightSideContent()}
            </div>
        </div>
    );
};

export default ZoomImage;