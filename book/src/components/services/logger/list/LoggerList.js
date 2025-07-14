import React, { useEffect, useState } from 'react';
import { useTransactionContext } from '../../../context/TransactionContext';
import { useUserContext } from '../../../context/UserContext';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4500';

function LoggerList() {
  const [videos, setVideos] = useState([]);
  const { trans, setTrans } = useTransactionContext()
  const userCtx = useUserContext()

  // Fetch all uploaded video metadata
  useEffect(() => {
    let userId = userCtx.user.id
    fetch(`${apiUrl}/${apiKey}/logger/videos/getAll/${userId}`)
      .then(res => res.json())
      .then(setVideos)
      .catch(err => console.error('Error fetching videos:', err));
  }, [trans]);

  // Delete video by ID
  const deleteVideo = async (id) => {
    try {
      await fetch(`${apiUrl}/${apiKey}/logger/videos/delete/${id}`, {
        method: 'DELETE',
      });
      setVideos(prev => prev.filter(video => video._id !== id));
      setTrans((prev)=>prev+1)
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Open video in new browser tab
  const openInNewTab = (id) => {
    const videoUrl = `${apiUrl}/${apiKey}/logger/videos/getSelected/${id}`;
    window.open(videoUrl, '_blank');
  };

  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '2rem' }}>
      {/* Video List */}
      <div style={{ width: '100%' }}>
        <h2 style={{ marginBottom: '1rem' }}> Saved Logs</h2>
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          videos.map(video => (
            <div
              key={video._id}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 0 6px rgba(0,0,0,0.1)',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{video.fileName}</div>
              <small>{new Date(video.createdAt).toLocaleString()}</small>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                <button onClick={() => openInNewTab(video._id)}>Open</button>
                <button
                  onClick={() => deleteVideo(video._id)}
                  style={{ backgroundColor: '#f44336', color: '#fff' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LoggerList;
