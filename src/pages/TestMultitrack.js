// import React, { useEffect, useRef, useState } from 'react';
// import Multitrack from 'wavesurfer-multitrack';

// const TestMultitrack = () => {
//     const containerRef = useRef(null);
//     const [multitrack, setMultitrack] = useState(null);
    
//     useEffect(() => {
//         // Fetch the list of stems from the backend
//         const fetchStems = async () => {
//             try {
//                 const response = await fetch('http://localhost:5053/api/songs');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const files = await response.json();
//                 console.log('Fetched stems:', files); // Debugging line

//                 // Map files to tracks
//                 // const tracks = files.map((file, index) => ({
//                 //     id: index,
//                 //     url: `http://localhost:5053/api/songs/${file}`,
//                 //     draggable: true,
//                 //     volume: 1,
//                 //     options: {
//                 //         waveColor: 'hsl(200, 50%, 70%)',
//                 //         progressColor: 'hsl(200, 50%, 50%)',
//                 //     },
//                 // }));

//                 // Initialize the multitrack mixer
//                 const mt = Multitrack.create([
//                     {
//                         id: 0,
//                       },
//                       {
//                         id: 1,
//                         draggable: false,
//                         startPosition: 14, // start time relative to the entire multitrack
//                         url: 'backend/data/stems/AROUND_110_ BASS GTR CRUNCH.wav',
//                         envelope: [
//                           { time: 2, volume: 0.5 },
//                           { time: 10, volume: 0.8 },
//                           { time: 255, volume: 0.8 },
//                           { time: 264, volume: 0 },
//                         ],
//                         volume: 0.95,
//                         options: {
//                           waveColor: 'hsl(46, 87%, 49%)',
//                           progressColor: 'hsl(46, 87%, 20%)',
//                         },
//                         intro: {
//                           endTime: 16,
//                           label: 'Intro',
//                           color: '#FFE56E',
//                         },
//                         markers: [
//                           {
//                             time: 21,
//                             label: 'M1',
//                             color: 'hsla(600, 100%, 30%, 0.5)',
//                           },
//                           {
//                             time: 22.7,
//                             label: 'M2',
//                             color: 'hsla(400, 100%, 30%, 0.5)',
//                           },
//                           {
//                             time: 24,
//                             label: 'M3',
//                             color: 'hsla(200, 50%, 70%, 0.5)',
//                           },
//                           {
//                             time: 27,
//                             label: 'M4',
//                             color: 'hsla(200, 50%, 70%, 0.5)',
//                           },
//                         ],
//                         // peaks: [ [ 0, 0, 2.567, -2.454, 10.5645 ] ], // optional pre-generated peaks
//                       },
//                       {
//                         id: 2,
//                         draggable: true,
//                         startPosition: 1,
//                         startCue: 2.1,
//                         endCue: 20,
//                         fadeInEnd: 8,
//                         fadeOutStart: 14,
//                         envelope: true,
//                         volume: 0.8,
//                         options: {
//                           waveColor: 'hsl(161, 87%, 49%)',
//                           progressColor: 'hsl(161, 87%, 20%)',
//                         },
//                         url: 'backend/data/stems/AROUND_110_ BASS GTR CRUNCH.wav',
//                       },
//                       {
//                         id: 3,
//                         draggable: true,
//                         startPosition: 290,
//                         volume: 0.8,
//                         options: {
//                           waveColor: 'hsl(161, 87%, 49%)',
//                           progressColor: 'hsl(161, 87%, 20%)',
//                         },
//                         url: 'backend/data/stems/AROUND_110_ BASS GTR CRUNCH.wav',
//                       },
//                 ], {
//                     container: containerRef.current, // required!
//                     minPxPerSec: 20, // zoom level
//                     cursorWidth: 2,
//                     cursorColor: '#D72F21',
//                     trackBackground: '#2D2D2D',
//                     trackBorderColor: '#7C7C7C',
//                   });

//                 setMultitrack(mt);
//             } catch (error) {
//                 console.error('Error fetching stems:', error);
//             }
//         };

//         fetchStems();

//         // Cleanup on unmount
//         return () => {
//             if (multitrack) {
//                 multitrack.destroy();
//             }
//         };
//     }, []);

//     const handlePlayPause = () => {
//         if (multitrack) {
//             if (multitrack.isPlaying()) {
//                 multitrack.pause();
//             } else {
//                 multitrack.play();
//             }
//         }
//     };

//     const handleZoom = (value) => {
//         if (multitrack) {
//             multitrack.zoom(value);
//         }
//     };

//     return (
//         <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white' }}>
//             <h1>Test Multi-Track Mixer</h1>
//             <div style={{ marginBottom: '20px' }}>
//                 <button onClick={handlePlayPause}>Play / Pause</button>
//                 <input
//                     type="range"
//                     min="10"
//                     max="100"
//                     defaultValue="20"
//                     onChange={(e) => handleZoom(e.target.valueAsNumber)}
//                     style={{ marginLeft: '10px', width: '300px' }}
//                 />
//             </div>
//             <div
//                 ref={containerRef}
//                 style={{
//                     background: '#2D2D2D',
//                     color: '#FFF',
//                     borderRadius: '10px',
//                     padding: '10px',
//                     height: '500px',
//                     overflowY: 'auto',
//                 }}
//             ></div>
//         </div>
//     );
// };

// export default TestMultitrack;