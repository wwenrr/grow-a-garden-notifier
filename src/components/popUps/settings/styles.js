export default {
    settingsPopup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      background: 'rgba(30, 30, 30, 0.95)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '20px',
      width: '300px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      zIndex: 1000
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
    },
    toggleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      padding: '10px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px'
    },
    toggleLabel: {
      color: '#ffffff',
      fontSize: '1rem'
    },
    toggleGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    testButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '6px',
      padding: '4px 8px',
      color: '#ffffff',
      fontSize: '0.8rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)'
      }
    },
    toggle: {
      position: 'relative',
      display: 'inline-block',
      width: '50px',
      height: '26px'
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0,
      position: 'absolute'
    },
    toggleSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.1)',
      transition: '.4s',
      borderRadius: '34px'
    },
    toggleSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '20px',
      width: '20px',
      left: '3px',
      bottom: '3px',
      background: '#ffffff',
      transition: '.4s',
      borderRadius: '50%'
    },
    toggleInputChecked: {
      background: '#4CAF50'
    },
    toggleInputCheckedBefore: {
      transform: 'translateX(24px)'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 999
    }
};