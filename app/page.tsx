'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
    const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({});

    const navItems = {
        '/about': {
            name: 'about',
        }
    };

    const videoData = [
        { src: "/ElijahSegal.webm", title: "Elijah Segal", text: "Writer | Producer | Director | Editor" },
        { src: "/CameraObscura.webm", title: "Camera Obscura", text: "" },
        { src: "/FreeParking.webm", title: "Free Parking", text: "" },
        { src: "/PullingThrough.webm", title: "Pulling Through", text: "" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            videoRefs.current.forEach((videoRef) => {
                const scrollPosition = window.scrollY;
                if (videoRef) {
                    videoRef.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleVideoClick = (index: number) => {
        setFullscreenIndex(index);
        setVideoMuted((prev) => ({ ...prev, [index]: false }));

        if (videoRefs.current[index]) {
            videoRefs.current[index]!.muted = false;
            videoRefs.current[index]!.controls = true;
        }
    };

    const handleExpandClick = (event: React.MouseEvent, index: number) => {
        event.stopPropagation();
        setFullscreenIndex(index);
        setVideoMuted((prev) => ({ ...prev, [index]: false }));

        if (videoRefs.current[index]) {
            videoRefs.current[index]!.muted = false;
            videoRefs.current[index]!.controls = true;
        }
    };

    const handleExitFullscreen = () => {
        if (fullscreenIndex !== null && videoRefs.current[fullscreenIndex]) {
            videoRefs.current[fullscreenIndex]!.controls = false;
        }
        setFullscreenIndex(null);
    };

    const videoSections = videoData.map((video, index) => (
        <section key={index} className={`snap-center relative h-screen w-screen overflow-hidden flex items-center justify-center ${fullscreenIndex === index ? 'fixed top-0 left-0 z-50 h-full w-full' : ''}`}>
            <div className={`absolute inset-0 flex items-center justify-center ${fullscreenIndex === index ? 'bg-black' : ''}`}>
                <video
                    ref={el => videoRefs.current[index] = el}
                    className={`w-5/6 h-5/6 object-cover rounded-3xl cursor-pointer ${fullscreenIndex === index ? 'w-full h-full' : ''}`}
                    preload="auto"
                    autoPlay
                    loop
                    muted={videoMuted[index] ?? true}
                    controls={fullscreenIndex === index}
                    playsInline
                    onClick={() => handleVideoClick(index)}
                >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {fullscreenIndex !== index && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 z-10 pointer-events-none`}>
                    <h1 className="text-white text-[3em] sm:text-[4em] md:text-[5.5em] lg:text-[7em] xl:text-[9em]">{video.title}</h1>
                    <div className="text-center max-w-lg">
                        <p className="text-white text-xs md:text-xl">
                            {video.text}
                        </p>
                    </div>
                </div>
            )}
            <div className={`absolute bottom-4 right-4 z-20 ${fullscreenIndex === index ? 'hidden' : 'block'}`} onClick={(event) => handleExpandClick(event, index)}>
                <FontAwesomeIcon icon={faExpand} className="text-white text-3xl cursor-pointer" />
            </div>
            {fullscreenIndex === index && (
                <div className="absolute top-4 right-4 z-20" onClick={handleExitFullscreen}>
                    <button className="text-white text-3xl cursor-pointer">✕</button>
                </div>
            )}
        </section>
    ));

    return (
        <div className="relative snap-y snap-mandatory h-screen w-screen overflow-y-scroll">
            <div className="sticky top-5 right-10 z-30">
                <nav
                    className="flex flex-row items-start justify-items-stretch justify-end relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pr-10">
                        {Object.entries(navItems).map(([path, { name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
            <div className="absolute inset-0 z-0"></div>
            {videoSections}
        </div>
    );
}
