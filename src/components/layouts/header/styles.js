export default {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '15px 20px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      top: '15px',
      zIndex: 100,
      transition: 'all 0.3s ease'
    },
    logo: {
      height: '36px',
      width: 'auto',
      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    settingButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '8px',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
        transform: 'scale(1.05)'
      }
    },
    storeIcon: {
      width: '20px',
      height: '20px'
    }
};