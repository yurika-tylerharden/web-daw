import React, { useEffect, useRef, useState } from 'react';
import Multitrack from 'wavesurfer-multitrack';

const TestMultitrack = () => {
    const containerRef = useRef(null);
    const [multitrack, setMultitrack***REMOVED*** = useState(null);
    
    useEffect(() => {
        // Fetch the list of stems from the backend
        const fetchStems = async () => {
            try {
                const response = await fetch('http://localhost:5053/api/songs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const files = await response.json();
                console.log('Fetched stems:', files); // Debugging line

                // Map files to tracks
                const tracks = files.map((file, index) => ({
                    id: index,
                    url: `http://localhost:5053/api/songs/${file}`,
                    draggable: true,
                    volume: 1,
                    options: {
                        waveColor: 'hsl(200, 50%, 70%)',
                        progressColor: 'hsl(200, 50%, 50%)',
                    },
                }));

                // Initialize the multitrack mixer
                const mt = Multitrack.create(tracks, {
                    container: containerRef.current,
                    minPxPerSec: 20,
                    cursorWidth: 2,
                    cursorColor: '#D72F21',
                    trackBackground: '#2D2D2D',
                    trackBorderColor: '#7C7C7C',
                });

                setMultitrack(mt);
            } catch (error) {
                console.error('Error fetching stems:', error);
            }
        };

        fetchStems();

        // Cleanup on unmount
        return () => {
            if (multitrack) {
                multitrack.destroy();
            }
        };
    }, [***REMOVED***);

    const handlePlayPause = () => {
        if (multitrack) {
            if (multitrack.isPlaying()) {
                multitrack.pause();
            } else {
                multitrack.play();
            }
        }
    };

    const handleZoom = (value) => {
        if (multitrack) {
            multitrack.zoom(value);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white' }}>
            <h1>Test Multi-Track Mixer</h1>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={handlePlayPause}>Play / Pause</button>
                <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="20"
                    onChange={(e) => handleZoom(e.target.valueAsNumber)}
                    style={{ marginLeft: '10px', width: '300px' }}
                />
            </div>
            <div
                ref={containerRef}
                style={{
                    background: '#2D2D2D',
                    color: '#FFF',
                    borderRadius: '10px',
                    padding: '10px',
                    height: '500px',
                    overflowY: 'auto',
                }}
            ></div>
        </div>
    );
};

export default TestMultitrack;