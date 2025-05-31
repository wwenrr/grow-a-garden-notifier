import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '@/pages/home/page';
import { useParamsStore } from '@/core/stores/paramsStore';
import Header from '@/components/layouts/header/page';
import PopUps from '@/components/popUps/page';
import mockData from '@/core/data/_mock/mockData';
import useDataStore from '@/core/stores/dataStore';
import apiService from '@/core/services/apiService';

const styles = {
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

function App() {
  const location = useLocation();
  const { params, syncFromURL } = useParamsStore();
  const { getCurrentCrops, getCurrentSpecCrops, getCurrentWeather, checkDataEmpty, setDataStore, getDataStore, checkTime } = useDataStore();
  const [data, setData] = useState(null);

  useEffect(() => {
    syncFromURL();
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = getDataStore();
        
        const checkCurrentCrops = checkTime('CurrentCrops');
        const checkCurrentSpecCrops = checkTime('CurrentSpecCrops');
        const checkCurrentWeather = checkTime('CurrentWeather');

        if(checkCurrentCrops) {
          console.log('Fetch CurrentCrops');
          data.CurrentCrops = await apiService.getCurrentCrops();
        }

        if(checkCurrentSpecCrops) {
          console.log('Fetch CurrentSpecCrops');
          data.CurrentSpecCrops = await apiService.getCurrentSpecCrops();
        }

        if(checkCurrentWeather) {
          console.log('Fetch CurrentWeather');
          data.CurrentWeather = await apiService.getCurrentWeather();
        }

        setDataStore(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    if(params.mockTest === 'true') {
      setData(mockData);
    } else {
      fetchData();
    }

    if(params.mockTest !== 'true') {
      const interval = setInterval(() => {
          console.log('Check Data Interval');

          if(checkDataEmpty()) {
            fetchData();
          } else {
            setDataStore({
              CurrentCrops: getCurrentCrops(),
              CurrentSpecCrops: getCurrentSpecCrops(),
              CurrentWeather: getCurrentWeather()
            });
          }
        }, 60000); 

      return () => clearInterval(interval);
    }
  }, [params.mockTest]);
  
  useEffect(() => {
    console.log(data);  
  }, [data])

  if(data)
    return (
      <>
        <PopUps />
        <div style={styles.appContainer}>
          <Header />
          <main>
            <Home data={data} />
          </main>
        </div>
      </>
    );
}

export default App;
