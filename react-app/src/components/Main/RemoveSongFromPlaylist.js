import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { thunkRemoveFromPlaylist } from '../../store/playlists'

export default function RemoveSongFromPlaylist({songId, playlistId}) {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(true)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(false)
    }

    async function removeSong(e) {
        e.stopPropagation()
        await dispatch(thunkRemoveFromPlaylist(playlistId, songId))
    }
    return (
        <>
        { isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h1>Confirm Delete</h1>
                    <p>Are you sure you want to remove this song from the playlist?</p>
                    <div className="modalButtons">
                        <button className="deleteButton" onClick={removeSong}>
                            Yes (Remove Song)
                        </button>
                        <button className="keepButton" onClick={closeModal}>
                            No (Keep Song)
                        </button>
                    </div>
                </div>
            </div>
        )}
        <button onClick={openModal} className='remove-song-button'>
            <i className="fa-solid fa-minus"/>
            <span className='remove-song-text'>Remove Song</span>
        </button>
        </>
    )
}
