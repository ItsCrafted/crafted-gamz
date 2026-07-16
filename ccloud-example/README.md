# cCloud

Firebase-based authentication and data storage service running on Cloudflare Workers using Firebase REST APIs (no service account required).

## Features

- User authentication via Google, GitHub, and Email/Password
- Firestore data storage with full CRUD operations
- Serverless architecture (Cloudflare Worker)
- Client SDK for easy integration
- No service account needed - uses Firebase REST APIs

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Set the following secrets in Cloudflare:

```bash
wrangler secret put FIREBASE_API_KEY
wrangler secret put FIREBASE_PROJECT_ID
```

Get these values from your Firebase Console → Project Settings → General → Your apps

### 3. Deploy

```bash
npm run deploy
```

Or run locally:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user (email/password)
- `POST /auth/login` - Login with email/password
- `POST /auth/verify` - Verify Firebase ID token
- `POST /auth/google` - Sign in with Google (requires client-side OAuth first)
- `POST /auth/github` - Sign in with GitHub (requires client-side OAuth first)

### Data Storage

- `GET /data/{path}` - Get document
- `POST /data/{path}` - Set document
- `PUT /data/{path}` - Update document
- `DELETE /data/{path}` - Delete document

All data endpoints require `Authorization: Bearer {token}` header.

## Client SDK Usage

### As Module

```javascript
import CCloud from './client-sdk';

const ccloud = new CCloud({
  workerUrl: 'https://your-worker.workers.dev',
  firebaseConfig: {
    apiKey: 'your-api-key',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    appId: 'your-app-id',
  },
});

await ccloud.init();

// Sign in with Google
const user = await ccloud.signInWithGoogle();

// Store data
await ccloud.setData('users/user123/profile', { name: 'John' });

// Retrieve data
const profile = await ccloud.getData('users/user123/profile');
```

### As Script Tag

```html
<script src="https://your-worker.workers.dev/client-sdk.js"></script>
<script>
  const ccloud = new CCloud({
    workerUrl: 'https://your-worker.workers.dev',
    firebaseConfig: {
      apiKey: 'your-api-key',
      authDomain: 'your-project.firebaseapp.com',
      projectId: 'your-project-id',
      appId: 'your-app-id',
    },
  });

  await ccloud.init();
  const user = await ccloud.signInWithGoogle();
</script>
```

## Firebase Console Setup

1. Enable Authentication providers:
   - Email/Password
   - Google
   - GitHub

2. Configure Firestore database

3. Set Firestore Security Rules:
   - Go to Firestore → Rules
   - Use the rules from `firestore.rules`:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /{path=**} {
         allow read, write: if request.auth != null && 
                               request.path[0] == 'users' && 
                               request.path[1] == request.auth.uid;
       }
     }
   }
   ```

4. Add your authorized domains for OAuth redirects

## Security Notes

- Never commit Firebase API keys
- Use environment variables for all sensitive data
- Implement proper Firestore security rules
- Validate all user inputs on the server side
