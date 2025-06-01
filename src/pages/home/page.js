import { styles } from './styles';
import { motion, AnimatePresence } from 'framer-motion';
import images from "@/core/data/images.json";
import { useState, useEffect } from 'react';
import { formatDate, getTimeAgo } from '@/core/helpers/timeHelper';
import { useParamsStore } from '@/core/stores/paramsStore';
import useNotifyStore from '@/core/stores/notifyStore';
import useSettingsStore from '@/core/stores/settingsStore';
import { toast } from 'react-toastify';
import { INTERVAL } from '@/core/constants';

const Blood = images.Website.Store.Blood;
const Twilight = images.Website.Store.Twilight;
const Cosmetic = images.Website.Store.Cosmetic;
const Egg = images.Website.Store.Egg;
const Seed = images.Website.Store.Seed;
const Gear = images.Website.Store.Gear;
const ItemsImage = images.Items;
const NotifyIcon = images.Website.Store.Notify || '🔔';

export default function Home({data}) {
    const { CurrentCrops, CurrentSpecCrops, CurrentWeather } = data;
    const { params, updateParam, syncToURL } = useParamsStore();
    const { addNotify, removeNotify, isNotified, getLastUpdate } = useNotifyStore();
    const { notificationsEnabled, soundEnabled, testSound, testNotification } = useSettingsStore();

    const [expandedContainers, setExpandedContainers] = useState({
        event: params.eventStore === 'open',
        shop: params.shopStock === 'open'
    });

    useEffect(() => {
        setExpandedContainers({
            event: params.eventStore === 'open',
            shop: params.shopStock === 'open'
        });
    }, [params.eventStore, params.shopStock]);

    // Kiểm tra thay đổi của CurrentCrops
    useEffect(() => {
        if (!notificationsEnabled || !soundEnabled) return;

        const checkCropsChanges = () => {
            const sections = ['seeds', 'gear', 'egg'];
            sections.forEach(section => {
                CurrentCrops[section].forEach(item => {
                    const key = item.split(' **')[0];
                    if (isNotified(key)) {
                        const savedLastUpdate = getLastUpdate(key);

                        if (savedLastUpdate && savedLastUpdate !== CurrentCrops.updatedAt) {
                            addNotify(key, CurrentCrops.updatedAt);
                            new Notification('Item Updated', {
                                body: `${key} has been updated in Shop Stock`,
                                icon: ItemsImage[key] || ItemsImage.NotFound
                            });
                            if (soundEnabled) {
                                testSound();
                            }
                        }
                    }
                });
            });
        };

        checkCropsChanges();
        const interval = setInterval(checkCropsChanges, INTERVAL.CHECK_DATA);
        return () => clearInterval(interval);
    }, [CurrentCrops, soundEnabled]);

    // Kiểm tra thay đổi của CurrentSpecCrops
    useEffect(() => {
        if (!notificationsEnabled || !soundEnabled) return;

        const checkSpecCropsChanges = () => {
            const sections = ['cosmetics', 'blood', 'twilight'];
            sections.forEach(section => {
                CurrentSpecCrops[section].forEach(item => {
                    const key = item.split(' **')[0];
                    if (isNotified(key)) {
                        const savedLastUpdate = getLastUpdate(key);
                        if (savedLastUpdate && savedLastUpdate !== CurrentSpecCrops.updatedAt) {
                            addNotify(key, CurrentSpecCrops.updatedAt);
                            new Notification('Item Updated', {
                                body: `${key} has been updated in ${section === 'cosmetics' ? 'Shop Stock' : 'Event Store'}`,
                                icon: ItemsImage[key] || ItemsImage.NotFound
                            });
                            if (soundEnabled) {
                                testSound();
                            }
                        }
                    }
                });
            });
        };

        checkSpecCropsChanges();
        const interval = setInterval(checkSpecCropsChanges, INTERVAL.CHECK_DATA);
        return () => clearInterval(interval);
    }, [CurrentSpecCrops]);

    // Kiểm tra thay đổi của CurrentWeather
    useEffect(() => {
        if (!notificationsEnabled || !soundEnabled) return;

        const checkWeatherChanges = () => {
            if (isNotified('weather')) {
                const savedLastUpdate = getLastUpdate('weather');
                if (savedLastUpdate && savedLastUpdate !== CurrentWeather.updatedAt) {
                    addNotify('weather', CurrentWeather.updatedAt);
                    new Notification('Weather Updated', {
                        body: `Current weather: ${CurrentWeather.currentWeather}\n${CurrentWeather.description}`,
                        icon: CurrentWeather.icon
                    });
                    if (soundEnabled) {
                        testSound();
                    }
                }
            }
        };

        checkWeatherChanges();
        const interval = setInterval(checkWeatherChanges, INTERVAL.CHECK_DATA);
        return () => clearInterval(interval);
    }, [CurrentWeather]);

    const toggleContainer = (container) => {
        const newState = !expandedContainers[container];
        setExpandedContainers(prev => ({
            ...prev,
            [container]: newState
        }));
        
        // Update params
        if (container === 'shop') {
            updateParam('shopStock', newState ? 'open' : '');
        } else if (container === 'event') {
            updateParam('eventStore', newState ? 'open' : '');
        }
        syncToURL();
    };

    const handleNotify = (item, lastUpdate) => {
        const key = item.split(' **')[0];
        if (isNotified(key)) {
            toast.error(`${key} has been removed from your notifications`, { autoClose: 500 });
            removeNotify(key);
        } else {
            toast.success(`${key} has been added to your notifications`, { autoClose: 500 });
            addNotify(key, lastUpdate);
        }
    };

    const renderItem = (item, index, lastUpdate) => {
        const key = item.split(' **')[0];
        const isItemNotified = isNotified(key);
        const savedLastUpdate = getLastUpdate(key);
        const hasUpdate = savedLastUpdate && savedLastUpdate !== lastUpdate;

        return (
            <motion.div
                key={index}
                style={{
                    ...styles.itemCard,
                    position: 'relative',
                    cursor: 'pointer',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: isItemNotified ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: isItemNotified ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    maxWidth: '100%',
                    overflow: 'hidden'
                }}
                whileHover={{ 
                    scale: 1.01,
                    background: isItemNotified ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.08)'
                }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleNotify(item, lastUpdate)}
            >
                <img 
                    src={ItemsImage[key] || ItemsImage.NotFound} 
                    alt={key} 
                    style={{
                        ...styles.itemIcon,
                        width: '32px',
                        height: '32px',
                        objectFit: 'contain',
                        flexShrink: 0
                    }}
                />
                <div style={{
                    ...styles.itemInfo,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    minWidth: 0
                }}>
                    <h3 style={{
                        ...styles.itemName,
                        margin: 0,
                        fontSize: '0.95rem',
                        color: isItemNotified ? '#4CAF50' : '#ffffff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {key}
                    </h3>
                    <span style={{
                        ...styles.itemQuantity,
                        fontSize: '0.8rem',
                        color: '#a0a0a0'
                    }}>
                        {item.split('**')[1]}
                    </span>
                </div>
                {isItemNotified && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        flexShrink: 0,
                        marginLeft: '5px'
                    }}>
                        {hasUpdate && (
                            <div style={{
                                background: '#ff4444',
                                color: 'white',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>
                                !
                            </div>
                        )}
                        <span style={{
                            color: '#4CAF50',
                            fontSize: '1rem',
                            flexShrink: 0
                        }}>
                            {NotifyIcon}
                        </span>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <>
            <div style={{...styles.glassCard, ...styles.weatherInfo}}>
            <span style={styles.weatherIcon}>{CurrentWeather.icon}</span>
            <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{CurrentWeather.currentWeather}</h3>
                <p style={{ margin: '0 0 5px 0' }}>{CurrentWeather.description}</p>
                <p style={{ margin: '0 0 5px 0', color: '#a0a0a0' }}>{CurrentWeather.visualCue}</p>
                <p style={{ margin: '0 0 5px 0', color: '#a0a0a0' }}>{CurrentWeather.cropBonuses}</p>
                {CurrentWeather.mutations.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#a0a0a0' }}>Mutations:</p>
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#a0a0a0' }}>
                    {CurrentWeather.mutations.map((mutation, index) => (
                        <li key={index}>{mutation}</li>
                    ))}
                    </ul>
                </div>
                )}
                <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#a0a0a0' }}>
                <p style={{ margin: '0 0 5px 0' }}>Rarity: {CurrentWeather.rarity}</p>
                <p style={{ margin: '0' }}>Effect: {CurrentWeather.effectDescription}</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem' }}>
                    Last update: {formatDate(CurrentWeather.updatedAt)} ({getTimeAgo(CurrentWeather.updatedAt)})
                </p>
                </div>
            </div>
            </div>

            <div style={styles.container}>
            <div 
                style={styles.containerHeader}
                onClick={() => toggleContainer('shop')}
            >
                <div style={styles.containerTitle}>
                <img 
                    src={images.Website.Store.Shop} 
                    alt="Shop" 
                    style={{
                    ...styles.containerIcon,
                    transform: expandedContainers.shop ? 'rotate(0deg)' : 'rotate(-90deg)'
                    }} 
                />
                <h2>Shop Stock</h2>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>
                Last update: {formatDate(CurrentCrops.updatedAt)} ({getTimeAgo(CurrentCrops.updatedAt)})
                </span>
            </div>
            <AnimatePresence>
                {expandedContainers.shop && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={styles.containerContent}
                >
                    <div style={{...styles.glassCard, ...styles.storeSection}}>
                    <div style={styles.storeHeader}>
                        <img src={Cosmetic} alt="Cosmetic" style={styles.storeIcon} />
                        <h2 style={styles.storeTitle}>Cosmetics</h2>
                    </div>
                    <div style={styles.itemList}>
                        {CurrentSpecCrops.cosmetics.map((item, index) => 
                            renderItem(item, index, CurrentSpecCrops.updatedAt)
                        )}
                    </div>
                    </div>

                    <div style={{...styles.glassCard, ...styles.storeSection}}>
                    <div style={styles.storeHeader}>
                        <img src={Seed} alt="Seeds" style={styles.storeIcon} />
                        <h2 style={styles.storeTitle}>Seeds</h2>
                    </div>
                    <div style={styles.itemList}>
                        {CurrentCrops.seeds.map((item, index) => 
                            renderItem(item, index, CurrentCrops.updatedAt)
                        )}
                    </div>
                    </div>

                    <div style={{...styles.glassCard, ...styles.storeSection}}>
                    <div style={styles.storeHeader}>
                        <img src={Gear} alt="Gear" style={styles.storeIcon} />
                        <h2 style={styles.storeTitle}>Gear</h2>
                    </div>
                    <div style={styles.itemList}>
                        {CurrentCrops.gear.map((item, index) => 
                            renderItem(item, index, CurrentCrops.updatedAt)
                        )}
                    </div>
                    </div>

                    <div style={{...styles.glassCard, ...styles.storeSection}}>
                    <div style={styles.storeHeader}>
                        <img src={Egg} alt="Egg" style={styles.storeIcon} />
                        <h2 style={styles.storeTitle}>Eggs</h2>
                    </div>
                    <div style={styles.itemList}>
                        {CurrentCrops.egg.map((item, index) => 
                            renderItem(item, index, CurrentCrops.updatedAt)
                        )}
                    </div>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
            </div>

            <div style={styles.container}>
            <div 
                style={styles.containerHeader}
                onClick={() => toggleContainer('event')}
            >
                <div style={styles.containerTitle}>
                <img 
                    src={images.Website.Store.Event} 
                    alt="Event" 
                    style={{
                    ...styles.containerIcon,
                    transform: expandedContainers.event ? 'rotate(0deg)' : 'rotate(-90deg)'
                    }} 
                />
                <h2>Event Stores</h2>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>
                Last update: {formatDate(CurrentSpecCrops.updatedAt)} ({getTimeAgo(CurrentSpecCrops.updatedAt)})
                </span>
            </div>
            <AnimatePresence>
                {expandedContainers.event && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={styles.containerContent}
                >
                    <div style={{...styles.glassCard, ...styles.storeSection}}>
                    <div style={styles.storeHeader}>
                        <img src={Blood} alt="Blood" style={styles.storeIcon} />
                        <h2 style={styles.storeTitle}>Blood Store</h2>
                    </div>
                    <div style={styles.itemList}>
                        {CurrentSpecCrops.blood.map((item, index) => 
                            renderItem(item, index, CurrentSpecCrops.updatedAt)
                        )}
                    </div>
                    </div>

                    <div style={{...styles.glassCard, ...styles.storeSection}}>
                    <div style={styles.storeHeader}>
                        <img src={Twilight} alt="Twilight" style={styles.storeIcon} />
                        <h2 style={styles.storeTitle}>Twilight Store</h2>
                    </div>
                    <div style={styles.itemList}>
                        {CurrentSpecCrops.twilight.map((item, index) => 
                            renderItem(item, index, CurrentSpecCrops.updatedAt)
                        )}
                    </div>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </>
    );
}

