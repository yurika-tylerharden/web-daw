import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioFile }) => {
    const waveformRef = useRef(null);
    const waveSurferRef = useRef(null);

    useEffect(() => {
        // Initialize WaveSurfer
        if (!waveformRef.current) return;

        waveSurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#ddd',
            progressColor: '#ff5500',
            height: 50,
        });

        waveSurferRef.current.load(audioFile);

        return () => {
            // Cleanup WaveSurfer instance
            if (waveSurferRef.current) {
                waveSurferRef.current.destroy();
                waveSurferRef.current = null;
            }
        };
    }, [audioFile]);

    return <div ref={waveformRef} style={{ width: '100%' }} />;
};

export default Waveform;
