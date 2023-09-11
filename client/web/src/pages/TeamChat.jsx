import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar'; // For displaying avatars
import { useNavigate, useLocation } from 'react-router-dom';

const TeamChat = ({ 
  // Props from Conversation component
  connect, 
  selectedCharacter, 
  setSelectedCharacter, 
  isConnecting, 
  isConnected 
}) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [executives, setExecutives] = useState([]);

  // Fetch executive team members from the /characters API endpoint
  useEffect(() => {
    fetch('/characters')
      .then(response => response.json())
      .then(data => {
        // Assuming the API returns a list of characters and you can filter executive members by a certain role or tag
        const fetchedExecutives = data.filter(character => character.role === 'executive');
        setExecutives(fetchedExecutives);
      })
      .catch(error => {
        console.error("Error fetching executive team members:", error);
      });
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      try {
        connect();
      } catch (error) {
        console.error(error);
      }
    }

    const handleUnload = event => {
      event.preventDefault();
      navigate('/');
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [connect]);

  const initiateConversation = (executive) => {
    setSelectedCharacter(executive.name);
  };

  return (
    <div>
      <h2>Chat with our Executive Team</h2>
      <p>Click on any of our team members below to start a conversation.</p>
      
      <div className="team-members">
        {executives.map(executive => (
          <div key={executive.name} className="team-member" onClick={() => initiateConversation(executive)}>
            <Avatar src={executive.avatar} />
            <span>{executive.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamChat;
