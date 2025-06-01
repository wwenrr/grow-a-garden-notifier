export default {
    appContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: '#ffffff',
      padding: '15px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh'
    },
    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: '5px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      borderTopColor: '#ffffff',
      animation: 'spin 1s linear infinite'
    },
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }
  };