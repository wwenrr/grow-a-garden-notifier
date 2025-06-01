# Grow A Garden Notifier

A notification application for the Grow A Garden game, helping players track and receive notifications about in-game products. The app provides real-time updates about shop items, event store items, and weather conditions.

## Links

- **Live Demo**: [https://grow-a-garden-notifier-six.vercel.app](https://grow-a-garden-notifier-six.vercel.app)
- **Mock Test**: [https://grow-a-garden-notifier-six.vercel.app/?mockTest=true](https://grow-a-garden-notifier-six.vercel.app/?mockTest=true)

## Key Features

### Product Tracking
- Track items from Shop Stock (Seeds, Gear, Eggs)
- Track items from Event Stores (Blood Store, Twilight Store)
- Track weather conditions and their effects
- Real-time notifications for item updates
- Customizable notification settings

### Data Management
- Automatic data caching with 2-minute expiration
- Background data refresh every 60 seconds
- Mock data support for testing
- Persistent storage using Zustand persist middleware

### User Interface
- Dark theme with glassmorphism design
- Smooth animations using Framer Motion
- Responsive layout
- Interactive product cards
- Custom scrollbars
- Toast notifications with configurable duration

### Notification System
- Browser notification support
- Sound notifications
- Visual indicators for tracked items
- Notification history
- Easy notification management

## Technologies Used

- **Frontend Framework**: React 19.1.0
- **State Management**: Zustand 5.0.5
  - Persistent storage
  - URL synchronization
  - Multiple stores (data, params, notify, settings)
- **Routing**: React Router DOM 7.6.1
- **Animation**: Framer Motion 12.15.0
- **Styling**: Emotion (React & Styled) 11.14.0
- **Notifications**: React Toastify 11.0.5
- **Build Tool**: CRACO 7.1.0

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── layouts/       # Layout components (Header)
│   └── popUps/        # Popup components (Settings, SamSeed, NotifyItemList)
├── core/              # Core functionality
│   ├── constants/     # Constants and configurations
│   ├── data/         # Data models and mocks
│   │   ├── _mock/    # Mock data for testing
│   │   └── images/   # Image assets
│   ├── helpers/      # Utility functions (time formatting)
│   ├── models/       # Data models
│   ├── services/     # API services
│   └── stores/       # Zustand stores
│       ├── dataStore.js      # Data management
│       ├── notifyStore.js    # Notification tracking
│       ├── paramsStore.js    # URL parameters
│       └── settingsStore.js  # User settings
├── pages/            # Page components
│   └── home/        # Main page with product lists
├── App.js           # Root component with data fetching
├── index.js         # Entry point
└── styles.js        # Global styles
```

## Installation

1. Clone repository:
```bash
git clone https://github.com/wwenrr/grow-a-garden-notifier.git
cd grow-a-garden-notifier
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Configuration

### URL Parameters

The application uses the following URL parameters:
- `notifyItemList`: Display notification list
- `settings`: Open settings panel
- `samSeed`: Open Sam's Seed popup
- `mockTest`: Enable mock data mode

### Stores

#### DataStore
- Manages application data
- Handles data caching
- Provides data fetching methods
- Cache expiration: 2 minutes

#### NotifyStore
- Manages notification list
- Tracks item updates
- Handles notification CRUD operations
- Persistent storage

#### ParamsStore
- Manages URL parameters
- Synchronizes state with URL
- Handles popup states

#### SettingsStore
- Manages user preferences
- Controls notification settings
- Handles sound settings
- Persistent storage

## Features in Detail

### Data Management
- Automatic data refresh every 60 seconds
- Cache validation before fetching
- Mock data support for testing
- Error handling with console logging

### Notification System
- Browser notification support
- Sound notifications with fallback
- Visual indicators for tracked items
- Notification history tracking
- Easy add/remove functionality

### UI Components

#### Header
- Logo display
- Navigation buttons
- Settings access
- Notification list access

#### Popups
- Settings panel
- Notification list
- Sam's Seed information
- Smooth animations
- Click-outside closing

#### Product Cards
- Item images
- Update timestamps
- Notification status
- Interactive hover effects
- Click-to-notify functionality

## Development

### Scripts

- `npm start`: Run in development mode
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Best Practices

- Functional components with hooks
- Separation of concerns
- Zustand for state management
- Performance optimization
- Clean code structure
- Consistent formatting

## Contributing

1. Fork repository
2. Create new branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## License

[MIT License](LICENSE)

## Contact

Project Link: [https://github.com/wwenrr/grow-a-garden-notifier](https://github.com/wwenrr/grow-a-garden-notifier)
