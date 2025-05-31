export const styles = {
    appContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#ffffff',
        padding: '15px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    glassCard: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '15px',
        margin: '8px 0',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 15px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
    },
    logo: {
        height: '32px',
        width: 'auto'
    },
    weatherInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '15px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '15px'
    },
    weatherIcon: {
        fontSize: '2.5rem',
        marginRight: '12px'
    },
    container: {
        marginBottom: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
    },
    containerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 15px',
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    containerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: 0,
        color: '#ffffff',
        fontSize: '1.2rem'
    },
    containerIcon: {
        width: '24px',
        height: '24px',
        transition: 'transform 0.3s ease'
    },
    containerContent: {
        padding: '15px'
    },
    storeSection: {
        marginBottom: '15px'
    },
    storeHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '8px'
    },
    storeIcon: {
        width: '20px',
        height: '20px'
    },
    storeTitle: {
        margin: 0,
        fontSize: '1rem',
        color: '#ffffff'
    },
    itemList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px'
    },
    itemCard: {
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.3)'
    },
    itemIcon: {
        width: '24px',
        height: '24px',
        objectFit: 'contain'
    },
    itemName: {
        margin: 0,
        fontSize: '0.9rem',
        color: '#ffffff'
    },
    itemQuantity: {
        color: '#808080',
        fontSize: '0.8rem'
    }
};