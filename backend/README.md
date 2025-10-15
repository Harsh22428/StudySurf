## Features

- **Video Processing**: Upload and extract audio from educational videos
- **AI Transcription + Analysis**: Google Gemini (google-genai) native audio understanding
- **Content Strategy**: Single-pass content strategy tailored to user preferences
- **User Personalization**: Tailor content based on user background (CS student, general, etc.)
- **FastAPI**: Modern, fast web framework with automatic documentation
- **Simple Authentication**: API key-based security
- **CORS Enabled**: Full CORS support for frontend integration

## Quick Start

### Prerequisites

- Python 3.9+
- ffmpeg (for video processing)
- Google Gemini API key
- Virtual environment (venv)

### API Documentation

Once running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

#### Public Endpoints (No Authentication)

- `GET /` - Welcome message
- `GET /health` - Health check

#### User Authentication Endpoints (No API Key Required)

- `POST /api/auth/signup` - User registration with preferences
- `POST /api/auth/signin` - User authentication (returns JWT token)

#### Protected Endpoints (Require API Key)

- `POST /api/process-video` - Single pipeline: upload -> audio -> Gemini analysis + content strategy
- `POST /api/extract-audio` - Extract audio from uploaded video (utility)
- `POST /api/gemini-transcribe` - Run Gemini on an existing audio path (utility)

#### User Management Endpoints (Require API Key + JWT Token)

- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/preferences` - Update user preferences

### Authentication

This API uses **dual authentication system**:

1. **API Key**: For endpoint access control
2. **JWT Tokens**: For user identification and session management

#### Setup Your API Key

1. **Configure**: Set `API_KEY=api_key` in `.env` file (project root)
2. **Use**: Include as `X-API-Key` header in requests

## User Authentication System

### User Registration (Signup)

Create a new user account with preferences:

```bash
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "X-API-Key: dv" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "password": "securepass123",
    "confirmPassword": "securepass123",
    "age": 20,
    "academicLevel": "College",
    "major": "Computer Science",
    "dyslexiaSupport": false,
    "languagePreference": "English",
    "learningStyles": ["visual", "auditory"],
    "metadata": []
  }'
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "username": "johndoe",
    "age": 20,
    "academicLevel": "College",
    "major": "Computer Science",
    "dyslexiaSupport": false,
    "languagePreference": "English",
    "learningStyles": ["visual", "auditory"],
    "metadata": [],
    "created_at": "2025-09-27T20:16:20.930890"
  }
}
```

### User Authentication (Signin)

Authenticate existing user:

```bash
curl -X POST "http://localhost:8000/api/auth/signin" \
  -H "X-API-Key: dv" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepass123"
  }'
```

**Response:** Same format as signup

### User Profile Management

#### Get User Profile

```bash
curl -X GET "http://localhost:8000/api/user/profile" \
  -H "X-API-Key: dv" \
  -H "Authorization: Bearer <jwt_token_from_signup_or_signin>"
```

#### Update User Preferences

```bash
curl -X PUT "http://localhost:8000/api/user/preferences" \
  -H "X-API-Key: dv" \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "academicLevel": "Graduate",
    "major": "Data Science",
    "dyslexiaSupport": true,
    "languagePreference": "Spanish",
    "learningStyles": ["visual", "kinesthetic"],
    "metadata": ["updated_preferences"]
  }'
```

### Data Storage

- **Database**: Google Firestore
- **Table**: `study_surf_users`
- **User ID**: UUID strings (document id)
- **Passwords**: bcrypt hashed
- **Sessions**: JWT tokens (24-hour expiry)

#### User Preferences Structure

The system supports comprehensive user preferences for educational personalization:

```json
{
  "name": "User Name",
  "age": 20,
  "academicLevel": "College",
  "major": "Computer Science",
  "dyslexiaSupport": false,
  "languagePreference": "English",
  "learningStyles": ["visual", "auditory", "kinesthetic"],
  "metadata": []
}
```

**Supported Academic Levels**: Elementary, Middle School, High School, College, Graduate
**Learning Styles**: visual, auditory, kinesthetic, reading/writing
**Languages**: Any language string (English, Spanish, French, etc.)
**Majors**: Any field of study string

#### API Key Usage

```bash
# Include the header on protected endpoints
curl -H "X-API-Key: dv" http://localhost:8000/api/process-video
```

#### Interactive API Documentation

Visit http://localhost:8000/docs to use the Swagger UI:

1. Click the **"Authorize"** button (🔒 icon)
2. Enter your API key from `.env` file
3. Click **"Authorize"**
4. Test all endpoints directly in the browser!

### Video Processing API

#### Single Pipeline (Upload -> Audio -> Gemini)

```bash
curl -X POST "http://localhost:8000/api/process-video" \
  -H "X-API-Key: dv" \
  -H "accept: application/json" \
  -F "video=@sample_video.mp4;type=video/mp4" \
  -F "user_background=general" \
  -F "academic_level=general" \
  -F "mode=speed" \
  -F "work_orders_mode=guided"   # guided | llm
```

#### API Response Structure

```json
{
  "pipeline": "video->audio->gemini",
  "extraction": {
    "audio_path": "/tmp/xyz.wav",
    "video_info": { "duration": 363.3, "format": "mp4" },
    "audio_info": { "sample_rate": 16000, "channels": 1 },
    "extraction_status": "success"
  },
  "analysis": {
    "gemini_analysis": {
      "transcription": "...",
      "educational_analysis": {
        "subject": "Physics",
        "topic": "Projectile Motion",
        "key_concepts": ["Parabolic trajectory", "Kinematic equations"],
        "formulas_mentioned": ["d_x = v_x * t", "d_y = 1/2 * a * t^2"]
      },
      "content_strategy": {
        "target_audience": "AP Physics / Intro College",
        "learning_objectives": ["Define projectile motion", "Apply kinematics"],
        "modules": [
          { "title": "Intro to Projectile Motion", "topics": ["..."] }
        ]
      }
    },
    "provider": "google_genai",
    "model": "models/gemini-2.5-flash",
    "work_orders": {
      "video_generation": { "brief": "Create a short intro framing: Physics" },
      "explanation": { "topics": ["Parabolic trajectory", "..."] },
      "animation_config": {
        "scenes": ["Intro", "Kinematics"],
        "focus_equations": ["..."]
      },
      "code_equation": {
        "examples": ["Compute altitude using dy = 1/2 a t^2"]
      },
      "visualization": { "charts": ["trajectory_parabola"] },
      "application": { "examples": ["sports", "rockets", "sprinklers"] },
      "summary": {
        "key_points": ["Parabolic path", "vx constant", "vy changes"]
      },
      "quiz_generation": { "blueprint": { "num_questions": 8 } }
    }
  }
}
```

## License

This project is released under the [MIT License](LICENSE).
