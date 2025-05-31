export default {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 999
    },
    settingsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    settingsTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#ffffff'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: '1.2rem',
      padding: '5px'
    }
};