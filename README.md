# Resume Maker App

A modern, responsive React application for creating professional resumes with a clean and intuitive interface.

## Features

- **Personal Information**: Name, email, phone, address, LinkedIn, and professional summary
- **Education**: Add multiple education entries with institution, degree, field, dates, and description
- **Work Experience**: Add multiple work experiences with company, position, dates, and description
- **Skills**: Add and remove skills dynamically
- **Real-time Preview**: See your resume as you type
- **Responsive Design**: Works perfectly on all devices
- **Export/Import**: Save and load resume data
- **Print Support**: Print-friendly resume output

## Performance Improvements

### ✅ Fixed Issues
- **Shaking/Animation Bug**: Eliminated infinite re-render loop that caused form shaking
- **Performance**: Optimized with React.memo, useCallback, and useMemo
- **State Management**: Fixed circular dependency in useEffect hooks
- **Responsiveness**: Enhanced mobile and tablet experience

### 🚀 Optimizations Made
- Used `React.memo` to prevent unnecessary component re-renders
- Implemented `useCallback` for all event handlers
- Added `useMemo` for context values
- Removed problematic CSS transitions and animations
- Added hardware acceleration with `transform: translateZ(0)`
- Optimized localStorage operations
- Enhanced responsive breakpoints

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. **Fill Personal Information**: Enter your basic details
2. **Add Education**: Include your educational background
3. **Add Experience**: List your work experience
4. **Add Skills**: Include relevant skills
5. **Preview**: See your resume in real-time
6. **Export/Print**: Save or print your resume

## Responsive Design

The app is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technical Details

- **Framework**: React 18
- **State Management**: React Context + useReducer
- **Styling**: CSS with responsive design
- **Storage**: LocalStorage for data persistence
- **Performance**: Optimized rendering with React hooks

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.