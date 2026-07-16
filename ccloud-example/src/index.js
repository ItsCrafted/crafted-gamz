// Firebase REST API implementation (no service account required)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve static files from assets
    if (env.ASSETS) {
      const asset = await env.ASSETS.fetch(new Request(request.clone()));
      if (asset && asset.status !== 404) {
        return asset;
      }
    }

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Check environment variables
      if (!env.FIREBASE_API_KEY || !env.FIREBASE_PROJECT_ID) {
        return new Response(JSON.stringify({ error: 'Missing Firebase configuration. Please set FIREBASE_API_KEY and FIREBASE_PROJECT_ID environment variables.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Health check
      if (path === '/health') {
        return new Response(JSON.stringify({ status: 'ok', env: { hasApiKey: !!env.FIREBASE_API_KEY, hasProjectId: !!env.FIREBASE_PROJECT_ID } }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Favicon
      if (path === '/favicon.ico') {
        return new Response(null, { status: 204 });
      }

      // Authentication endpoints - proxy to Firebase Auth REST API
      if (path === '/auth/register' && request.method === 'POST') {
        return handleRegister(request, env, corsHeaders);
      }

      if (path === '/auth/login' && request.method === 'POST') {
        return handleLogin(request, env, corsHeaders);
      }

      if (path === '/auth/verify' && request.method === 'POST') {
        return handleVerifyToken(request, env, corsHeaders);
      }

      if (path === '/auth/google' && request.method === 'POST') {
        return handleGoogleAuth(request, env, corsHeaders);
      }

      if (path === '/auth/github' && request.method === 'POST') {
        return handleGitHubAuth(request, env, corsHeaders);
      }

      if (path === '/auth/delete' && request.method === 'POST') {
        return handleDeleteAccount(request, env, corsHeaders);
      }

      if (path === '/account/update' && request.method === 'POST') {
        return handleUpdateAccount(request, env, corsHeaders);
      }

      if (path === '/account/export' && request.method === 'GET') {
        return handleExportData(request, env, corsHeaders);
      }

      if (path === '/account/import' && request.method === 'POST') {
        return handleImportData(request, env, corsHeaders);
      }

      if (path === '/data/search' && request.method === 'GET') {
        return handleSearchData(request, env, corsHeaders);
      }

      if (path === '/data/bulk' && request.method === 'POST') {
        return handleBulkOperations(request, env, corsHeaders);
      }

      if (path === '/data/history' && request.method === 'GET') {
        return handleDataHistory(request, env, corsHeaders);
      }

      if (path === '/data/rollback' && request.method === 'POST') {
        return handleRollbackData(request, env, corsHeaders);
      }

      if (path === '/schema/save' && request.method === 'POST') {
        return handleSaveSchema(request, env, corsHeaders);
      }

      if (path === '/schema/list' && request.method === 'GET') {
        return handleListSchemas(request, env, corsHeaders);
      }

      if (path === '/schema/delete' && request.method === 'DELETE') {
        return handleDeleteSchema(request, env, corsHeaders);
      }

      // User data endpoints - proxy to Firestore REST API
      if (path.startsWith('/data/') && request.method === 'GET') {
        return handleGetData(request, env, corsHeaders);
      }

      if (path.startsWith('/data/') && request.method === 'POST') {
        return handleSetData(request, env, corsHeaders);
      }

      if (path.startsWith('/data/') && request.method === 'PUT') {
        return handleUpdateData(request, env, corsHeaders);
      }

      if (path.startsWith('/data/') && request.method === 'DELETE') {
        return handleDeleteData(request, env, corsHeaders);
      }

      // 404
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

// Helper to make requests to Firebase REST API
async function firebaseRequest(url, options = {}) {
  console.log('Firebase request:', url, options.method);
  const response = await fetch(url, options);
  const text = await response.text();
  console.log('Firebase response:', response.status, text);
  
  if (!response.ok) {
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
    throw new Error(data.error?.message || data.error || text || 'Firebase request failed');
  }
  
  return JSON.parse(text);
}

// Authentication handlers using Firebase Auth REST API
async function handleRegister(request, env, corsHeaders) {
  const { email, password, displayName } = await request.json();
  
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.FIREBASE_API_KEY}`;
  
  try {
    const data = await firebaseRequest(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        displayName,
        returnSecureToken: true,
      }),
    });

    return new Response(JSON.stringify({ 
      uid: data.localId, 
      email: data.email,
      displayName: data.displayName,
      token: data.idToken,
      refreshToken: data.refreshToken
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleLogin(request, env, corsHeaders) {
  const { email, password } = await request.json();
  
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.FIREBASE_API_KEY}`;
  
  try {
    const data = await firebaseRequest(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    return new Response(JSON.stringify({ 
      uid: data.localId, 
      email: data.email,
      displayName: data.displayName,
      token: data.idToken,
      refreshToken: data.refreshToken
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleVerifyToken(request, env, corsHeaders) {
  try {
    const { idToken } = await request.json();
    console.log('handleVerifyToken: idToken received');

    if (!env.FIREBASE_API_KEY) {
      console.error('handleVerifyToken: FIREBASE_API_KEY not set');
      return new Response(JSON.stringify({ error: 'Server configuration error: Firebase API key not set' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    console.log('handleVerifyToken: calling Firebase API');

    const data = await firebaseRequest(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    console.log('handleVerifyToken: Firebase response received', data);

    if (!data.users || !data.users[0]) {
      console.error('handleVerifyToken: no user data in response');
      return new Response(JSON.stringify({ error: 'Invalid token - no user data returned' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = data.users[0];
    return new Response(JSON.stringify({
      uid: user.localId,
      email: user.email,
      emailVerified: user.emailVerified
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('handleVerifyToken error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleGoogleAuth(request, env, corsHeaders) {
  const { idToken } = await request.json();
  
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
  
  try {
    const data = await firebaseRequest(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!data.users || !data.users[0]) {
      return new Response(JSON.stringify({ error: 'Invalid token - no user data returned' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = data.users[0];
    return new Response(JSON.stringify({ 
      uid: user.localId, 
      email: user.email,
      displayName: user.displayName,
      token: idToken
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleGitHubAuth(request, env, corsHeaders) {
  const { idToken } = await request.json();
  
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
  
  try {
    const data = await firebaseRequest(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!data.users || !data.users[0]) {
      return new Response(JSON.stringify({ error: 'Invalid token - no user data returned' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = data.users[0];
    return new Response(JSON.stringify({ 
      uid: user.localId, 
      email: user.email,
      displayName: user.displayName,
      token: idToken
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleDeleteAccount(request, env, corsHeaders) {
  const { uid } = await request.json();
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    // Delete user from Firebase Auth
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${env.FIREBASE_API_KEY}`;
    await firebaseRequest(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    // Delete all user data from Firestore
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}`;
    await firebaseRequest(firestoreUrl + '?mask.fieldPaths=*', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Firestore data handlers using Firestore REST API
async function handleGetData(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/data/', '');
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}${url.search}`;

  try {
    const data = await firebaseRequest(firestoreUrl, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    });

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSetData(request, env, corsHeaders) {
  console.log('handleSetData called');
  const url = new URL(request.url);
  const path = url.pathname.replace('/data/', '');
  const authHeader = request.headers.get('Authorization');
  console.log('Path:', path, 'Auth:', authHeader ? 'present' : 'missing');

  // Validate path has at least one /
  if (!path.includes('/')) {
    return new Response(JSON.stringify({ error: 'Invalid path. Firestore paths must be in format: collection/document (e.g., users/uid/data/settings)' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Prevent editing 3rd-party field
  const pathParts = path.split('/');
  if (pathParts.length >= 3 && pathParts[2] === '3rd-party') {
    return new Response(JSON.stringify({ error: 'Cannot modify 3rd-party field. This is reserved for external services.' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const data = await request.json();
  console.log('Data:', data);

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`;
  console.log('Firestore URL:', firestoreUrl);

  try {
    // Validate against schema if exists
    const docName = path.split('/').pop();
    const schemaUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${pathParts[1]}/_schemas/${docName}`;
    try {
      const schema = await firebaseRequest(schemaUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const schemaData = schema.fields;
      const validation = validateAgainstSchema(data, schemaData);
      if (!validation.valid) {
        return new Response(JSON.stringify({ error: 'Schema validation failed', errors: validation.errors }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (e) {
      // No schema exists, skip validation
    }

    // Get current data for versioning
    let oldData = null;
    try {
      const currentResponse = await firebaseRequest(firestoreUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      oldData = currentResponse;
    } catch (e) {
      // Document doesn't exist yet, that's ok
    }

    // Save new data
    await firebaseRequest(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: convertToFirestoreFormat(data) }),
    });

    // Create version history entry
    const versionPath = `users/${pathParts[1]}/_history/${Date.now()}`;
    const versionUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${versionPath}`;
    await firebaseRequest(versionUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: convertToFirestoreFormat({
          documentPath: path,
          oldData: oldData,
          newData: data,
          timestamp: new Date().toISOString(),
        })
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('handleSetData error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleUpdateData(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/data/', '');
  const authHeader = request.headers.get('Authorization');
  const data = await request.json();

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}?updateMask.fieldPaths=${Object.keys(data).join(',')}`;

  try {
    await firebaseRequest(firestoreUrl, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: convertToFirestoreFormat(data) }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleDeleteData(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/data/', '');
  const authHeader = request.headers.get('Authorization');

  // Prevent deleting 3rd-party field
  const pathParts = path.split('/');
  if (pathParts.length >= 3 && pathParts[2] === '3rd-party') {
    return new Response(JSON.stringify({ error: 'Cannot delete 3rd-party field. This is reserved for external services.' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`;

  try {
    await firebaseRequest(firestoreUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleUpdateAccount(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const { displayName, email } = await request.json();

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Update display name via Firebase Auth REST API
    if (displayName) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${env.FIREBASE_API_KEY}`;
      await firebaseRequest(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken: token,
          displayName: displayName,
          returnSecureToken: true,
        }),
      });
    }

    // Note: Email change requires additional verification steps in Firebase
    // For now, we'll return a message about email change limitations
    if (email) {
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Display name updated. Email changes require additional verification and are not supported via this API yet.',
        displayName: displayName
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Account updated successfully',
      displayName: displayName
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleExportData(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Get user info from token
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;

    // Get all user data from Firestore
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/data`;
    const firestoreData = await firebaseRequest(firestoreUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // Export data as JSON
    const exportData = {
      user: {
        uid: uid,
        email: userData.users[0].email,
        displayName: userData.users[0].displayName,
        emailVerified: userData.users[0].emailVerified,
        createdAt: userData.users[0].createdAt,
        lastLoginAt: userData.users[0].lastLoginAt,
      },
      data: firestoreData.documents || [],
      exportedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="ccloud-export-${uid}.json"'
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleImportData(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const importData = await request.json();

  if (!importData.data || !Array.isArray(importData.data)) {
    return new Response(JSON.stringify({ error: 'Invalid import data format' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get user info from token
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;

    let importedCount = 0;
    let errors = [];

    // Import each document
    for (const doc of importData.data) {
      try {
        const docName = doc.name;
        const docPath = docName.replace(`projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/`, '');
        const targetPath = `users/${uid}/data/${docName.split('/').pop()}`;

        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${targetPath}`;
        await firebaseRequest(firestoreUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields: doc.fields }),
        });
        importedCount++;
      } catch (e) {
        errors.push({ document: doc.name, error: e.message });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      importedCount,
      errors,
      total: importData.data.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSearchData(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!query) {
    return new Response(JSON.stringify({ error: 'Search query required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;

    // Get all user data
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/data`;
    const firestoreData = await firebaseRequest(firestoreUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // Search through documents
    const results = [];
    const lowerQuery = query.toLowerCase();

    if (firestoreData.documents) {
      for (const doc of firestoreData.documents) {
        const docName = doc.name.split('/').pop();
        const docString = JSON.stringify(doc).toLowerCase();

        if (docString.includes(lowerQuery)) {
          results.push({
            name: docName,
            path: doc.name,
            fields: doc.fields
          });
        }
      }
    }

    return new Response(JSON.stringify({ results, count: results.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleBulkOperations(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const { operation, paths } = await request.json();

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!operation || !paths || !Array.isArray(paths)) {
    return new Response(JSON.stringify({ error: 'Operation and paths array required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;
    let successCount = 0;
    let errors = [];

    for (const path of paths) {
      try {
        const fullPath = `users/${uid}/data/${path}`;

        // Prevent bulk operations on 3rd-party field
        if (path.startsWith('3rd-party')) {
          errors.push({ path, error: 'Cannot modify 3rd-party field' });
          continue;
        }

        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${fullPath}`;

        if (operation === 'delete') {
          await firebaseRequest(firestoreUrl, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
          });
        } else {
          errors.push({ path, error: 'Unsupported operation' });
          continue;
        }

        successCount++;
      } catch (e) {
        errors.push({ path, error: e.message });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      operation,
      successCount,
      errors,
      total: paths.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleDataHistory(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const url = new URL(request.url);
  const documentPath = url.searchParams.get('path');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;

    // Get history entries
    const historyUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/_history`;
    const historyData = await firebaseRequest(historyUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // Filter by document path if specified
    let history = historyData.documents || [];
    if (documentPath) {
      history = history.filter(doc => {
        const docPath = doc.fields.documentPath?.stringValue;
        return docPath === documentPath;
      });
    }

    // Sort by timestamp (newest first)
    history.sort((a, b) => {
      const aTime = a.fields.timestamp?.stringValue || '';
      const bTime = b.fields.timestamp?.stringValue || '';
      return new Date(bTime) - new Date(aTime);
    });

    return new Response(JSON.stringify({ history, count: history.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleRollbackData(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const { historyId } = await request.json();

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!historyId) {
    return new Response(JSON.stringify({ error: 'History ID required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;

    // Get history entry
    const historyUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/_history/${historyId}`;
    const historyEntry = await firebaseRequest(historyUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const documentPath = historyEntry.fields.documentPath.stringValue;
    const oldData = historyEntry.fields.oldData;

    // Restore old data
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${documentPath}`;
    await firebaseRequest(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: oldData }),
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Document rolled back successfully',
      documentPath
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Helper to convert JavaScript objects to Firestore REST API format
function convertToFirestoreFormat(data) {
  const fields = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      fields[key] = { integerValue: value.toString() };
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
    } else if (value === null) {
      fields[key] = { nullValue: null };
    } else if (Array.isArray(value)) {
      fields[key] = { arrayValue: { values: value.map(v => convertToFirestoreFormat({ temp: v }).temp) } };
    } else if (typeof value === 'object') {
      fields[key] = { mapValue: { fields: convertToFirestoreFormat(value) } };
    }
  }

  return fields;
}

// Schema validation helper
function validateAgainstSchema(data, schema) {
  const errors = [];

  for (const [key, schemaField] of Object.entries(schema)) {
    const fieldType = schemaField.stringValue || schemaField.mapValue?.fields?.type?.stringValue;
    const required = schemaField.mapValue?.fields?.required?.booleanValue || false;
    const value = data[key];

    if (required && value === undefined) {
      errors.push(`Field '${key}' is required`);
      continue;
    }

    if (value !== undefined) {
      if (fieldType === 'string' && typeof value !== 'string') {
        errors.push(`Field '${key}' must be a string`);
      } else if (fieldType === 'number' && typeof value !== 'number') {
        errors.push(`Field '${key}' must be a number`);
      } else if (fieldType === 'boolean' && typeof value !== 'boolean') {
        errors.push(`Field '${key}' must be a boolean`);
      } else if (fieldType === 'array' && !Array.isArray(value)) {
        errors.push(`Field '${key}' must be an array`);
      } else if (fieldType === 'object' && typeof value !== 'object') {
        errors.push(`Field '${key}' must be an object`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

// Schema management handlers
async function handleSaveSchema(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const { documentName, schema } = await request.json();

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!documentName || !schema) {
    return new Response(JSON.stringify({ error: 'Document name and schema required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;
    const schemaUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/_schemas/${documentName}`;

    await firebaseRequest(schemaUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: convertToFirestoreFormat(schema) }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleListSchemas(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;
    const schemaUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/_schemas`;
    const schemaData = await firebaseRequest(schemaUrl, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    return new Response(JSON.stringify({ schemas: schemaData.documents || [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleDeleteSchema(request, env, corsHeaders) {
  const authHeader = request.headers.get('Authorization');
  const url = new URL(request.url);
  const documentName = url.searchParams.get('name');

  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!documentName) {
    return new Response(JSON.stringify({ error: 'Document name required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const userUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;
    const userData = await firebaseRequest(userUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const uid = userData.users[0].localId;
    const schemaUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/_schemas/${documentName}`;

    await firebaseRequest(schemaUrl, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
