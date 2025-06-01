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

function App() {
  const location = useLocation();
  const mockTest = location.search.includes('mockTest=true');
  const { syncFromURL } = useParamsStore();
  const { getCurrentCrops, getCurrentSpecCrops, getCurrentWeather, checkDataEmpty, setDataStore, getDataStore, checkTime, getLastCacheTime } = useDataStore();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      let data = getDataStore();
      const lastCacheTime = getLastCacheTime();

      if(lastCacheTime) {
        const currentTime = new Date();
        const timeDiff = currentTime - lastCacheTime;
        const minutesDiff = timeDiff / (1000 * 60);

        if(minutesDiff <= 2) {
          toast.info('Data was cached, use cached data...', { autoClose: 500 });
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
  }, [mockTest]);

  return (
    <>
      <ToastContainer />
      <PopUps />
      <div style={styles.appContainer}>
        <Header />
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
