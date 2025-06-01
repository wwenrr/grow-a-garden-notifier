import { useParamsStore } from '@/core/stores/paramsStore';
import { motion } from 'framer-motion';
import useNotifyStore from '@/core/stores/notifyStore';
import { toast } from 'react-toastify';

const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    popup: {
      background: 'rgba(30, 30, 30, 0.95)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      padding: '24px',
      width: '450px',
      maxHeight: '80vh',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      cursor: 'default'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      paddingBottom: '12px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#ffffff',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      fontSize: '1.4rem',
      padding: '8px',
      transition: 'all 0.2s ease',
      '&:hover': {
        color: '#ffffff'
      }
    },
    content: {
      maxHeight: 'calc(80vh - 120px)',
      overflowY: 'auto',
      paddingRight: '8px',
      '&::-webkit-scrollbar': {
        width: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    item: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
        transform: 'translateY(-2px)'
      }
    },
    itemTitle: {
      color: '#ffffff',
      margin: '0 0 8px 0',
      fontSize: '1.1rem',
      paddingRight: '30px'
    },
    itemDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem',
      margin: 0
    },
    removeButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      fontSize: '1.2rem',
      padding: '4px',
      transition: 'all 0.2s ease',
      '&:hover': {
        color: '#ffffff',
        transform: 'scale(1.1)'
      }
    }
  };

export default function NotifyItemList() {
  const { updateParam, syncToURL } = useParamsStore();
  const { notify, removeNotify } = useNotifyStore();

  const formatDate = (date) => {
    if (typeof date === 'string') {
      return new Date(date).toLocaleString();
    }
    return new Date(date).toLocaleString();
  };

  const handleClose = () => {
    updateParam('notifyItemList', '');
    syncToURL();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.overlay}
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        style={styles.popup}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Product Notification List</h2>
          <button 
            style={styles.closeButton}
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        <div style={styles.content}>
          {notify?.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#ffffff' }}>No products available</p>
          ) : (
            notify?.map((item, index) => (
              <div key={index} style={styles.item}>
                <button
                  style={styles.removeButton}
                  onClick={() => {
                    removeNotify(item.key);
                    toast.success('Product removed from notification list');
                  }}
                >
                  ×
                </button>
                <h3 style={styles.itemTitle}>{item.key}</h3>
                <p style={styles.itemDescription}>
                  Last update: {formatDate(item.lastUpdate)}
                </p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
