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
    const [bandMembers, setBandMembers***REMOVED*** = useState([***REMOVED***);

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

        const fetchBandMembers = async () => {
            try {
                const response = await fetch('http://localhost:5053/api/members');
                const data = await response.json();
                setBandMembers(data);
            } catch (error) {
                console.error('Error fetching band members:', error);
            }
        };

        fetchSongs();
        fetchBandMembers();
    }, [***REMOVED***);

    const handleViewStems = (song) => {
        setSelectedSong(song);
        setCurrentTab('stems');
    };

    const handleUpdateMember = (id, instrument) => {
        setBandMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === id ? { ...member, member_instrument: instrument } : member
            )
        );
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
                    bandMembers={bandMembers}
                    onGroupChange={(stemId, stemGroup) =>
                        console.log(`Stem ${stemId} assigned to ${stemGroup}`)
                    }
                />
            )}
            {currentTab === 'band' && (
                <BandPage
                    bandMembers={bandMembers}
                    onUpdateMember={handleUpdateMember}
                />
            )}
            {currentTab === 'testing' && (
                <TestMultitrack />
            )}
        </div>
    );
};

export default App;