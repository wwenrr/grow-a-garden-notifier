import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

let audio = null;

const useSettingsStore = create(
  persist(
    (set, get) => ({
      // States
      soundEnabled: false,
      notificationsEnabled: false,
      notificationPermission: 'default',

      // Actions
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setNotificationPermission: (permission) => set({ notificationPermission: permission }),

      // Thêm các actions phức tạp
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),

      // Actions cho notification
      requestNotificationPermission: async () => {
        try {
          const permission = await Notification.requestPermission();
          set({ notificationPermission: permission });
          return permission;
        } catch (error) {
          console.error('Error requesting notification permission:', error);
          return 'denied';
        }
      },

      // Test actions
      testSound: async () => {
        if (!get().soundEnabled) return;

        try {
          if (!audio) {
            audio = new Audio('/notification.mp3');
            // Đợi audio được tải xong
            await new Promise((resolve, reject) => {
              audio.addEventListener('canplaythrough', resolve, { once: true });
              audio.addEventListener('error', reject, { once: true });
              audio.load();
            });
          }
          
          // Thử phát âm thanh
          try {
            await audio.play();
          } catch (playError) {
            toast.error('Please interact with the user before playing the sound');
          }
        } catch (error) {
          toast.error('Fail to play sound:', error);
        }
      },

      testNotification: () => {
        if (!get().notificationsEnabled) return;

        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification('Test Notification', {
              body: 'This is a test notification',
              icon: '/icon.png'
            });
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                new Notification('Test Notification', {
                  body: 'This is a test notification',
                  icon: '/icon.png'
                });
              }
            });
          }
        }
      }
    }),
    {
      name: 'settings-storage', // tên key trong localStorage
      partialize: (state) => ({ 
        soundEnabled: state.soundEnabled,
        notificationsEnabled: state.notificationsEnabled
      }) // chỉ lưu các states cần thiết
    }
  )
);

export default useSettingsStore;
