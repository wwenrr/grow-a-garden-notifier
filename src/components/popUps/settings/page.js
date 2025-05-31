import { motion } from "framer-motion";
import useSettingsStore from "@/core/stores/settingsStore";
import { useParamsStore } from '@/core/stores/paramsStore';
import styles from "./styles";

export default function Settings() {
    const { soundEnabled, notificationsEnabled, setSoundEnabled, setNotificationsEnabled, testSound, testNotification } = useSettingsStore();
    const { syncToURL, updateParam } = useParamsStore();

    const handleCloseSettings = () => {
        updateParam('settings', '');
        syncToURL();
    };

    const handleTestSound = async () => {
        try {
            await testSound();
        } catch (error) {
            console.log('Không thể phát âm thanh:', error);
        }
    };

    return (
        <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.overlay}
              onClick={handleCloseSettings}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              style={styles.settingsPopup}
            >
              <div style={styles.settingsHeader}>
                <h2 style={styles.settingsTitle}>Settings</h2>
                <button style={styles.closeButton} onClick={handleCloseSettings}>×</button>
              </div>
              
              <div style={styles.toggleContainer}>
                <span style={styles.toggleLabel}>Sound</span>
                <div style={styles.toggleGroup}>
                  <label style={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={soundEnabled}
                      onChange={(e) => setSoundEnabled(e.target.checked)}
                      style={styles.toggleInput}
                    />
                    <span style={{
                      ...styles.toggleSlider,
                      ...(soundEnabled ? styles.toggleInputChecked : {})
                    }}>
                      <span style={{
                        ...styles.toggleSliderBefore,
                        ...(soundEnabled ? styles.toggleInputCheckedBefore : {})
                      }} />
                    </span>
                  </label>
                  <button 
                    style={styles.testButton}
                    onClick={handleTestSound}
                    disabled={!soundEnabled}
                  >
                    Test
                  </button>
                </div>
              </div>

              <div style={styles.toggleContainer}>
                <span style={styles.toggleLabel}>Notifications</span>
                <div style={styles.toggleGroup}>
                  <label style={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      style={styles.toggleInput}
                    />
                    <span style={{
                      ...styles.toggleSlider,
                      ...(notificationsEnabled ? styles.toggleInputChecked : {})
                    }}>
                      <span style={{
                        ...styles.toggleSliderBefore,
                        ...(notificationsEnabled ? styles.toggleInputCheckedBefore : {})
                      }} />
                    </span>
                  </label>
                  <button 
                    style={styles.testButton}
                    onClick={testNotification}
                    disabled={!notificationsEnabled}
                  >
                    Test
                  </button>
                </div>
              </div>
            </motion.div>
        </>
    );
}