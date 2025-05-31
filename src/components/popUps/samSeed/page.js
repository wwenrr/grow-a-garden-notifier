import SamSeedData from "@/core/data/samCrops.json";
import useNotifyStore from "@/core/stores/notifyStore";
import { motion } from "framer-motion";
import { useParamsStore } from '@/core/stores/paramsStore';
import styles from "./styles";

export default function SamSeed() {
    const { isNotified, addNotify, removeNotify } = useNotifyStore();
    const { params, syncFromURL, syncToURL, updateParam } = useParamsStore();

    const handleCloseSamSeed = () => {
      updateParam('samSeed', '');
      syncToURL();
    };
  
    const handleNotify = (key) => {
      if (isNotified(key)) {
        removeNotify(key);
      } else {
        addNotify(key, new Date().toISOString());
      }
    };
  
    const getTierColor = (tier) => {
      const colors = {
        'Common': '#ffffff',
        'Uncommon': '#4CAF50',
        'Rare': '#2196F3',
        'Legendary': '#9C27B0',
        'Mythical': '#FF9800',
        'Divine': '#F44336',
        'Prismatic': '#E91E63'
      };
      return colors[tier] || '#ffffff';
    };
  
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.overlay}
          onClick={handleCloseSamSeed}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            background: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '20px',
            width: '400px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
        >
          <div style={styles.settingsHeader}>
            <h2 style={styles.settingsTitle}>Sam's Seeds</h2>
            <button style={styles.closeButton} onClick={handleCloseSamSeed}>×</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(SamSeedData).map(([key, seed]) => (
              <motion.div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: isNotified(key) ? '1px solid #4CAF50' : '1px solid transparent'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNotify(key)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#ffffff' }}>
                    {seed.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>
                    Sheckle: {seed["Sheckle Price"]} | Robux: {seed["Robux Price"]}
                  </div>
                </div>
                {isNotified(key) && (
                  <span style={{ color: '#4CAF50', fontSize: '1.2rem' }}>🔔</span>
                )}
                <div style={{
                  fontSize: '0.8rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: getTierColor(seed.Tier)
                }}>
                  {seed.Tier}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </>
    );
};