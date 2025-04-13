

const PopupForm = ({ handleClick }) => {
    return (
      <form onSubmit={handleClick} style={{ width: '300px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="cameraName"
            placeholder="Nom de la caméra"
            required
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              width: '100%',
            }}
          />
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Supprimer
          </button>
        </div>
      </form>
    );
  };
  
  export default PopupForm;
  