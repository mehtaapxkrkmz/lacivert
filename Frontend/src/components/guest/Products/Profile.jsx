import React from 'react';
import DeleteAccountButton from '../../DeleteAccountButton';
import { useNavigate } from 'react-router-dom';

const Profile = ({ currentUser }) => {
  const navigate = useNavigate();
   
  if (!currentUser) {
    return <p>Lütfen giriş yapın.</p>;
  }

  const handleDeleted = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Merhaba, {currentUser.firstname}</h2>
      <DeleteAccountButton userId={currentUser.id} onDeleted={handleDeleted} />
    </div>
  );
};

export default Profile;