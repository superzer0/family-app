# Familiada - Family Quiz Game

A Polish family quiz game (similar to Family Feud) built with **Angular**.

## About

This application has been **migrated from AngularJS to Angular** while preserving all original functionality:

- Two-family quiz competition
- Multiple rounds with questions and scoring
- Keyboard shortcuts for game control
- Sound effects for correct/incorrect answers and intro music
- Real-time score tracking

## Features

- **Two families compete**: Zbieciowie vs Cieslakowie
- **Question rounds**: Multiple choice questions with point values
- **Scoring system**: Points awarded for correct answers
- **Wrong answer tracking**: Visual "X" marks for incorrect answers
- **Sound effects**: Intro music, success and failure sounds
- **Keyboard controls**: Full keyboard navigation and game control

## Technology Stack

- **Angular** (latest)
- **TypeScript**
- **Bootstrap 3** (for styling)
- **HTML5 Audio API** (for sound effects)

## Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## CI/CD

This project includes GitHub Actions workflows for automated testing and deployment:

### PR Validation
- Automatically runs on pull requests
- Tests on Node.js 18.x and 20.x
- Runs linting, builds, and tests
- Validates code quality before merging

### Build Artifacts
- Runs on pushes to main branch and releases
- Creates production builds
- Uploads downloadable artifacts
- Automatically attaches builds to GitHub releases

The workflows ensure code quality and provide ready-to-deploy builds for each release.

## Keyboard Controls

- **Z**: Switch control to Zbieciowie family
- **C**: Switch control to Cieslakowie family  
- **1-5**: Answer questions (reveal answers)
- **W**: Mark wrong answer (add X)
- **Space**: Next round
- **Click "HELP"**: Show/hide keyboard shortcuts

## Game Rules

1. Select which family is answering (Z or C)
2. Reveal answers by pressing numbers 1-5
3. Points are awarded to the active family
4. Wrong answers (W) add X marks to the family
5. Advance to next round with Space
6. Game continues through all question rounds

## Migration Details

This application was successfully migrated from AngularJS 1.4 to Angular (latest), including:

- ✅ Controller → Component migration
- ✅ Services migration with dependency injection
- ✅ Template syntax updates
- ✅ Event handling modernization
- ✅ Build system upgrade (Grunt → Angular CLI)
- ✅ Testing framework update (Karma/Jasmine → Angular Testing)

## Original Features Preserved

All original AngularJS functionality has been preserved:
- Game logic and scoring
- Keyboard event handling
- Sound effects and audio management
- Visual styling and layout
- Help system
- Round progression