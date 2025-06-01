import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '@/pages/home/page';
import { useParamsStore } from '@/core/stores/paramsStore';
import Header from '@/components/layouts/header/page';
import PopUps from '@/components/popUps/page';
import mockData from '@/core/data/_mock/mockData';
import useDataStore from '@/core/stores/dataStore';
import apiService from '@/core/services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/styles';
import { INTERVAL } from '@/core/constants';

function App() {
  const location = useLocation();
  const mockTest = location.search.includes('mockTest=true');
  const { syncFromURL } = useParamsStore();
  const { setDataStore, getDataStore, checkTime, getLastCacheTime } = useDataStore();
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(INTERVAL.CHECK_DATA / 1000);

  const fetchData = async () => {
    try {
      let data = getDataStore();
      const lastCacheTime = getLastCacheTime();

      if(lastCacheTime) {
        const currentTime = new Date();
        const timeDiff = currentTime - lastCacheTime;
        const minutesDiff = timeDiff / (1000 * 60);

        if(minutesDiff <= INTERVAL.CACHE_TIME) {
          toast.info(`Data was cached, use cached data...`, { autoClose: 500 });
          console.log('Data was cached, use cached data...', minutesDiff);
          setData(data);
        } else {
          if(data === null || data === undefined) {
            toast.info('Data not in storage, fetching new data...');
            data.CurrentCrops = await apiService.getCurrentCrops();
            data.CurrentSpecCrops = await apiService.getCurrentSpecCrops();
            data.CurrentWeather = await apiService.getCurrentWeather();
          } else {
            const checkCurrentCrops = checkTime('CurrentCrops');
            const checkCurrentSpecCrops = checkTime('CurrentSpecCrops');
            const checkCurrentWeather = checkTime('CurrentWeather');

            if(checkCurrentCrops) {
              data.CurrentCrops = await apiService.getCurrentCrops();
              toast.success('Fetching CurrentCrops', { autoClose: 500 });
            }

            if(checkCurrentSpecCrops) {
              data.CurrentSpecCrops = await apiService.getCurrentSpecCrops();
              toast.success('Fetching CurrentSpecCrops', { autoClose: 500 });
            }

            if(checkCurrentWeather) {
              data.CurrentWeather = await apiService.getCurrentWeather();
              toast.success('Fetching CurrentWeather', { autoClose: 500 });
            }
          }
        }
      } else {
        toast.info('Data not in storage, fetching new data...', { autoClose: 500 });
        data.CurrentCrops = await apiService.getCurrentCrops();
        data.CurrentSpecCrops = await apiService.getCurrentSpecCrops();
        data.CurrentWeather = await apiService.getCurrentWeather();
      }

      setDataStore(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    syncFromURL();
  }, [location.search]);

  useEffect(() => {
    if (mockTest) {
      toast.info('Mock Test active');
      setData(mockData);
    } else {
      fetchData();

      const intervalTimer = setInterval(() => {
        fetchData();
        setCountdown(INTERVAL.CHECK_DATA / 1000);
      }, INTERVAL.CHECK_DATA); 

      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) return INTERVAL.CHECK_DATA / 1000;
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(intervalTimer);
        clearInterval(countdownInterval);
      };
    }
  }, [mockTest]);

  return (
    <>
      <ToastContainer />
      <PopUps />
      <div style={styles.appContainer}>
        <Header />
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.05)',
          position: 'relative',
          marginBottom: '20px',
          borderRadius: '3px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(countdown / (INTERVAL.CHECK_DATA / 1000)) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, rgba(76, 175, 80, 0.8) 0%, rgba(76, 175, 80, 0.4) 100%)',
            transition: 'width 1s linear',
            position: 'absolute',
            left: 0,
            top: 0,
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(76, 175, 80, 0.3)'
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            animation: 'shimmer 0.2s linear infinite',
            transform: 'translateX(-100%) rotate(45deg)'
          }} />
        </div>
        <style>
          {`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%) rotate(45deg);
              }
              100% {
                transform: translateX(100%) rotate(45deg);
              }
            }
          `}
        </style>
        <main>
          {data ? (
            <Home data={data} />
          ) : (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
