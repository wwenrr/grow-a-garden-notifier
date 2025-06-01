# Grow A Garden Notifier

A notification application for the Grow A Garden game, helping players track and receive notifications about in-game products.

## Key Features

- Track product list in the game
- Receive notifications for product updates
- User-friendly interface with smooth animations
- Easy notification list management
- URL parameter integration for state persistence

## Technologies Used

- **Frontend Framework**: React 19.1.0
- **State Management**: Zustand 5.0.5
- **Routing**: React Router DOM 7.6.1
- **Animation**: Framer Motion 12.15.0
- **Styling**: Emotion (React & Styled) 11.14.0
- **Notifications**: React Toastify 11.0.5
- **Build Tool**: CRACO 7.1.0

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── layouts/       # Layout components
│   └── popUps/        # Popup components
├── core/              # Core functionality
│   ├── constants/     # Constants and configurations
│   ├── data/         # Data models and mocks
│   ├── helpers/      # Utility functions
│   ├── models/       # Data models
│   ├── services/     # API services
│   └── stores/       # Zustand stores
├── pages/            # Page components
├── App.js           # Root component
├── index.js         # Entry point
└── styles.js        # Global styles
```

## Installation

1. Clone repository:
```bash
git clone [repository-url]
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
- `settings`: Open settings
- `samSeed`: Open Sam Seed popup

### Stores

- **paramsStore**: Manages URL parameters and URL synchronization
- **notifyStore**: Manages notification list and CRUD operations

## Detailed Features

### NotifyItemList

- Display list of tracked products
- Allow removal of products from the list
- Show last update time
- Smooth open/close animations
- Close by clicking outside

### UI/UX

- Dark interface with blur effects
- Smooth animations for all interactions
- Responsive design
- Custom scrollbar
- Toast notifications for actions

## Development

### Scripts

- `npm start`: Run in development mode
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Best Practices

- Use functional components and hooks
- Separate logic and UI
- Use Zustand for state management
- Optimize performance with React.memo and useCallback
- Clean code and consistent formatting

## Contributing

1. Fork repository
2. Create new branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## License

[MIT License](LICENSE)

## Contact

[Your Name] - [Your Email]

Project Link: [https://github.com/wwenrr/grow-a-garden-notifier](https://github.com/yourusername/grow-a-garden-notifier)
