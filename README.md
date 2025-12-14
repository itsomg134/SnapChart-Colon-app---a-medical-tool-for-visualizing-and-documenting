# SnapChart Colon

> Interactive colonoscopy documentation tool with visual colon mapping

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

SnapChart Colon is a modern, intuitive web application designed for healthcare professionals to document colonoscopy findings with an interactive visual interface. The app features an anatomically organized colon diagram that allows real-time documentation of findings across all eight colon segments.

![SnapChart Colon Screenshot](screenshot.png)

## Features

### 🎯 Interactive Colon Mapping
- Visual representation of all 8 colon segments
- Click-to-document interface
- Color-coded segment identification
- Visual indicators for documented findings

### 📝 Comprehensive Documentation
- Multiple finding types:
  - Polyps
  - Inflammation
  - Diverticula
  - Bleeding
  - Masses
  - Normal findings
- Size tracking (in millimeters)
- Detailed description fields
- Automatic timestamps

### 📊 Real-time Tracking
- Live findings list with color-coded indicators
- Segment-specific documentation
- Edit and delete capabilities
- Organized by anatomical location

### 📄 Report Generation
- One-click export to text format
- Professionally formatted reports
- Organized by colon segment
- Includes all documented findings and timestamps

## Colon Segments

The app covers all standard anatomical segments:

1. **Rectum** - Most distal segment
2. **Sigmoid Colon** - S-shaped segment
3. **Descending Colon** - Left-side descending portion
4. **Splenic Flexure** - Left upper bend
5. **Transverse Colon** - Horizontal portion
6. **Hepatic Flexure** - Right upper bend
7. **Ascending Colon** - Right-side ascending portion
8. **Cecum** - Most proximal segment

## Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snapchart-colon.git
cd snapchart-colon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Adding a Finding

1. **Select a Segment**: Click on any colored circle on the colon diagram
2. **Choose Finding Type**: Select from the dropdown menu (polyp, inflammation, etc.)
3. **Enter Size** (optional): Input the size in millimeters
4. **Add Description** (optional): Include any additional clinical notes
5. **Save**: Click "Save Finding" to document

### Managing Findings

- **View All Findings**: Scroll through the documented findings panel on the right
- **Delete Finding**: Click the trash icon on any finding card
- **Visual Indicators**: Segments with findings show yellow highlighting and red badges

### Exporting Reports

1. Click the "Export Report" button in the header
2. A formatted text file will download automatically
3. Report includes date, all findings organized by segment, and timestamps

## Technology Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **SVG** - Interactive colon diagram rendering

## Project Structure

```
snapchart-colon/
├── src/
│   ├── components/
│   │   └── ColonApp.jsx       # Main application component
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── README.md
```

## Development

### Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Lint code

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Image upload support for findings
- [ ] PDF report generation with diagrams
- [ ] Multi-language support
- [ ] Cloud storage integration
- [ ] Comparison mode for follow-up procedures
- [ ] DICOM image integration
- [ ] Print-friendly report layouts
- [ ] Mobile app version

## Clinical Disclaimer

⚠️ **Important**: This application is designed as a documentation tool and should not replace professional medical judgment. All findings should be reviewed and verified by qualified healthcare professionals. This tool is not intended for diagnosis or treatment decisions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Om Gedam

GitHub: @itsomg134

Email: omgedam123098@gmail.com

Twitter (X): @omgedam

LinkedIn: Om Gedam

Portfolio: https://ogworks.lovable.app

## Acknowledgments

- Inspired by the need for better colonoscopy documentation tools
- Built with modern web technologies for optimal user experience
- Thanks to all healthcare professionals who provided feedback
