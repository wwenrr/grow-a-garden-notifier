import { useParamsStore } from '@/core/stores/paramsStore';
import { motion } from 'framer-motion';
import images from "@/core/data/images.json";
import styles from "./styles";

const Icon = images.Website.Header.Icon;
const Setting = images.Website.Header.Setting;
const SamSeedIcon = images.Website.Header["Sam's Seed"];
const NotifyIcon = images.Website.Header.Notify;

export default function Header() {
    const { syncToURL, updateParam } = useParamsStore();
    
    return (
        <header style={styles.header}>
          <img src={Icon} alt="Logo" style={styles.logo} />
          <div style={styles.headerRight}>
            <motion.img 
              src={NotifyIcon} 
              alt="NotifyItemList" 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              style={{ ...styles.storeIcon, ...styles.settingButton }}
              onClick={() => {
                updateParam('notifyItemList', 'open');
                syncToURL();
              }}
            />
            <motion.img 
              src={SamSeedIcon} 
              alt="Sam's Seed" 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              style={{ ...styles.storeIcon, ...styles.settingButton }}
              onClick={() => {
                updateParam('samSeed', 'open');
                syncToURL();
              }}
            />
            <motion.img 
              src={Setting} 
              alt="Settings" 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              style={{ ...styles.storeIcon, ...styles.settingButton }}
              onClick={() => {
                updateParam('settings', 'open');
                syncToURL();
              }}
            />
          </div>
        </header>
    );
}

