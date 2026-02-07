# Blood Donor App - React Frontend

Beautiful and responsive React frontend for the Blood Donor Management System.

## Features

### Public Pages
- **Home Page** - Hero section, features, statistics
- **Donor Registration** - Two-step registration with OTP verification
- **Search Donors** - Search by blood group, city, availability
- **Report Donor** - Report unavailable donors with reason tracking

### Admin Pages
- **Admin Login** - Secure admin authentication
- **Admin Dashboard** - Manage donors, view reports, statistics

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Responsive design (mobile-friendly)

## Prerequisites

- Node.js 14+ and npm
- Backend API running on Railway (Production)

## Installation & Setup

### 1. Install Dependencies

```bash
cd blood-donor-frontend
npm install
```

### 2. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000` during development.
For production access, use the deployed URL.

### 3. Build for Production

```bash
npm run build
```

## Project Structure

```
blood-donor-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar
│   │   ├── Footer.js          # Footer component
│   │   └── Loading.js         # Loading spinner
│   ├── pages/
│   │   ├── Home.js            # Landing page
│   │   ├── DonorRegistration.js  # Donor registration
│   │   ├── SearchDonors.js    # Search functionality
│   │   ├── ReportDonor.js     # Report donor form
│   │   ├── AdminLogin.js      # Admin login
│   │   └── AdminDashboard.js  # Admin panel
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.js                 # Main app with routing
│   ├── index.js               # Entry point
│   └── index.css              # Global styles + Tailwind
├── package.json
└── tailwind.config.js
```

## API Configuration

The frontend connects to the backend API at:
`https://blood-donor-app-production-ab11.up.railway.app/api`

This is configured in `src/services/api.js`.

## Admin Credentials

**Default Admin Login:**
- Username: `admin`
- Password: `admin123`

⚠️ Change these credentials in production!

## Available Pages

### Public Routes
- `/` - Home page
- `/register` - Donor registration
- `/search` - Search donors
- `/report/:donorId` - Report a donor

### Admin Routes
- `/admin-login` - Admin login
- `/admin/dashboard` - Admin dashboard

## Features Overview

### 1. Donor Registration
- Two-step process with OTP verification
- Email validation
- Blood group selection
- Area and city required

### 2. Search Donors
- Filter by blood group
- Filter by city
- Filter by availability status
- Beautiful donor cards with contact info
- Direct call functionality
- Quick report button

### 3. Report Donor
- Select reason for unavailability
- Optional reporter details
- Email notification to donor
- 24-hour auto-confirmation

### 4. Admin Dashboard
- View all donors
- Toggle donor availability
- Delete donors
- View and manage reports
- Statistics overview

## Styling

The app uses Tailwind CSS with a custom color scheme:

```javascript
colors: {
  primary: '#DC2626',    // Blood red
  secondary: '#991B1B',  // Dark red
  accent: '#FCA5A5'      // Light red
}
```

## Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly buttons
- Collapsible navigation on mobile

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Code Formatting

The project uses standard React code formatting.

## Common Issues

### Issue: API connection failed
**Solution**: Make sure the backend service is up and the production URL in `api.js` is correct.

### Issue: CORS errors
**Solution**: Backend has CORS enabled for `http://localhost:3000`

### Issue: Styles not loading
**Solution**: 
```bash
npm install
npm start
```

## Production Deployment

### Build the app
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Update API URL to production backend

### Environment Variables

For production, create `.env.production`:

```
REACT_APP_API_URL=https://your-backend-api.com/api
```

Then update `src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

## Screenshots

### Home Page
- Hero section with call-to-action buttons
- Feature cards
- Statistics section
- Blood groups display

### Search Page
- Search form with filters
- Donor cards with contact info
- Availability indicators
- Call and report buttons

### Admin Dashboard
- Tabbed interface
- Donor management table
- Report management
- Statistics cards

## Contributing

This is a learning project. Feel free to fork and improve!

## Future Enhancements

- [ ] Add donor photos
- [ ] Add maps for location
- [ ] SMS notifications
- [ ] Push notifications
- [ ] Dark mode
- [ ] Multiple languages
- [ ] Advanced filtering
- [ ] Export reports to PDF
- [ ] Blood bank integration
- [ ] Mobile app (React Native)

## License

Free to use for educational purposes.

## Support

For issues or questions, please check:
1. Backend is running
2. API URL is correct
3. Dependencies are installed

## Credits

Built with ❤️ for saving lives through blood donation.
