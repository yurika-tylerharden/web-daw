import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import SongsPage from './pages/SongsPage';
import StemsPage from './pages/StemsPage';
import BandPage from './pages/BandPage';
import TestMultitrack from './pages/TestMultitrack';

const App = () => {
    const [currentTab, setCurrentTab***REMOVED*** = useState('songs');
    const [songs, setSongs***REMOVED*** = useState([***REMOVED***);
    const [loading, setLoading***REMOVED*** = useState(true);
    const [selectedSong, setSelectedSong***REMOVED*** = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('http://localhost:5053/api/songs');
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [***REMOVED***);

    const handleViewStems = (song) => {
        setSelectedSong(song);
        setCurrentTab('stems');
    };

    return (
        <div className="app">
            <Toolbar onTabChange={setCurrentTab} />
            {currentTab === 'songs' && (
                loading ? (
                    <p>Loading songs...</p>
                ) : (
                    <SongsPage
                        songs={songs}
                        onSelectSong={setSelectedSong}
                        onViewStems={handleViewStems}
                    />
                )
            )}
            {currentTab === 'stems' && selectedSong && (
                <StemsPage
                    stems={selectedSong.stems}
                    songName={selectedSong.name}
                    bpm={selectedSong.bpm}
                    onGroupChange={(stemId, group) =>
                        console.log(`Stem ${stemId} assigned to ${group}`)
                    }
                />
            )}
            {currentTab === 'band' && (
                <BandPage
                    bandMembers={[***REMOVED***} // Pass actual band members data here
                    onUpdateMember={(id, instrument) =>
                        console.log(`Member ${id} assigned to ${instrument}`)
                    }
                />
            )}
            {currentTab === 'testing' && (
                <TestMultitrack />
            )}
        </div>
    );
};

export default App;