import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateUserName } from '../../redux/userSlice'; 
import { useNavigate } from 'react-router-dom';
import './user.scss';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, firstName, lastName, token, isAuthenticated } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editableUserName, setEditableUserName] = useState(userName);

  useEffect(() => {
    setEditableUserName(userName);
  }, [userName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditableUserName(userName);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    if (editableUserName.trim() !== userName) {
      dispatch(updateUserName({ newUserName: editableUserName, token }));
    }
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="error-container">
        <h2>Accès non autorisé</h2>
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      </div>
    );
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>Welcome back<br />{userName}!</h1>
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
          </>
        ) : (
          <div className="edit-name-container">
            <h1>Edit user info</h1>
            <form className="edit-name-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-wrapper">
                <label htmlFor="userName">User Name</label>
                <input 
                  type="text" 
                  id="userName" 
                  value={editableUserName}
                  onChange={(e) => setEditableUserName(e.target.value)}
                />
              </div>
              
              <div className="input-wrapper">
                <label htmlFor="firstName">First name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  value={firstName || ''}
                  disabled
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="lastName">Last name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  value={lastName || ''}
                  disabled
                />
              </div>
              
              <div className="edit-buttons">
                <button type="button" className="save-button" onClick={handleSaveClick}>Save</button>
                <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default User;
