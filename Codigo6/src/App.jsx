import { useState, useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import './App.css'

function App() {
    const [snowflakes, setSnowflakes] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(50)
    const playerRef = useRef(null)

    useEffect(() => {
        const flakes = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 5 + Math.random() * 10,
            animationDelay: Math.random() * 5,
            fontSize: 10 + Math.random() * 20
        }))
        setSnowflakes(flakes)
    }, [])

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: 'lJawRaON8h0'
        },
    }

    const onReady = (event) => {
        playerRef.current = event.target
        event.target.setVolume(volume)
    }

    const togglePlay = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo()
            } else {
                playerRef.current.playVideo()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value)
        setVolume(newVolume)
        if (playerRef.current) {
            playerRef.current.setVolume(newVolume)
        }
    }

    const handleStop = () => {
        if (playerRef.current) {
            playerRef.current.stopVideo()
            setIsPlaying(false)
        }
    }

    return (
        <div className="app">
            <div className="snowflakes">
                {snowflakes.map(flake => (
                    <div
                        key={flake.id}
                        className="snowflake"
                        style={{
                            left: `${flake.left}%`,
                            animationDuration: `${flake.animationDuration}s`,
                            animationDelay: `${flake.animationDelay}s`,
                            fontSize: `${flake.fontSize}px`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            <div className="content">
                <h1 className="title">¡Feliz Navidad!</h1>

                <div className="tree">
                    <img src="/arbol.png" alt="Árbol de Navidad" className="tree-image" />
                </div>

                <div className="music-player">
                    <h3 className="player-title">
                        <svg className="music-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                        Reproductor Navideño
                    </h3>

                    <div className="controls">
                        <button
                            className="control-btn play-pause"
                            onClick={togglePlay}
                            title={isPlaying ? 'Pausar' : 'Reproducir'}
                        >
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        <button
                            className="control-btn stop"
                            onClick={handleStop}
                            title="Detener"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h12v12H6z" />
                            </svg>
                        </button>
                    </div>

                    <div className="volume-control">
                        <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volume-slider"
                        />
                        <span className="volume-value">{volume}%</span>
                    </div>

                    <p className="song-info">
                        {isPlaying ? (
                            <>
                                <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                </svg>
                                Reproduciendo...
                            </>
                        ) : (
                            <>
                                <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                                Pausado
                            </>
                        )}
                    </p>
                </div>
            </div>

            <YouTube
                videoId="lJawRaON8h0"
                opts={opts}
                onReady={onReady}
            />
        </div>
    )
}

export default App
