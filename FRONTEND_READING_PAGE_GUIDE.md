# Frontend Implementation Guide: Book Reading Page

## Overview
This document explains how to implement a reading page that allows users to access purchased books using reading tokens sent via email receipts.

## The Problem
When users purchase books, they receive an email receipt with a reading link like:
```
http://localhost:9000/read/7474c06a-0cb2-4ebf-be09-e55e6843aa42?token=eyJhbGciOiJIUzI1NiJ9...
```

Currently, this link doesn't work because the frontend doesn't have a `/read/:bookId` route implemented.

## What You Need to Implement

### 1. Create the Reading Page Route

Add a new route to handle `/read/:bookId`:

```javascript
// React Router example
import { Route } from 'react-router-dom';
import ReadingPage from './pages/ReadingPage';

<Route path="/read/:bookId" component={ReadingPage} />

// Or for Next.js
// Create: pages/read/[bookId].js
// Or: app/read/[bookId]/page.js (App Router)
```

### 2. Create the ReadingPage Component

```javascript
// ReadingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function ReadingPage() {
  const { bookId } = useParams(); // Extract book ID from URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Extract token from query params
  
  const [bookContent, setBookContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBookContent();
  }, [bookId, token]);

  const loadBookContent = async () => {
    if (!token) {
      setError('Reading token is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/books/${bookId}/content`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setBookContent(data);
      } else {
        setError(data.error || 'Failed to load book content');
      }
    } catch (err) {
      setError('Network error: Unable to load book content');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading your book...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="reading-page">
      <h1>{bookContent.title}</h1>
      
      {/* For E-books */}
      {bookContent.url && (
        <div className="ebook-viewer">
          <h2>📖 Read Your Book</h2>
          {bookContent.format === 'application/pdf' ? (
            <iframe 
              src={bookContent.url} 
              width="100%" 
              height="800px"
              title="Book Content"
              style={{ border: 'none' }}
            />
          ) : (
            <a 
              href={bookContent.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="download-link"
            >
              📥 Download/View Book ({bookContent.format})
            </a>
          )}
        </div>
      )}
      
      {/* For Audiobooks */}
      {bookContent.audio_files && bookContent.audio_files.length > 0 && (
        <div className="audiobook-player">
          <h2>🎧 Listen to Your Audiobook</h2>
          <audio controls style={{ width: '100%' }}>
            <source src={bookContent.audio_files[0]} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {bookContent.duration && (
            <p>Duration: {Math.floor(bookContent.duration / 60)} minutes</p>
          )}
        </div>
      )}

      {/* Error handling for missing content */}
      {bookContent.error && (
        <div className="error-message">
          <p>❌ {bookContent.error}</p>
          <p>Please contact support if this issue persists.</p>
        </div>
      )}
    </div>
  );
}

export default ReadingPage;
```

### 3. Environment Variables

Make sure you have the backend API URL configured:

```bash
# .env file
REACT_APP_API_URL=http://localhost:3000
```

## Backend API Details

### Endpoint: `GET /api/v1/books/:id/content`

**Headers Required:**
```
Authorization: Bearer <reading_token>
Content-Type: application/json
```

**Response for E-books:**
```json
{
  "title": "Book Title",
  "url": "http://localhost:3000/rails/active_storage/blobs/...",
  "format": "application/pdf"
}
```

**Response for Audiobooks:**
```json
{
  "title": "Book Title",
  "audio_files": ["http://localhost:3000/rails/active_storage/blobs/..."],
  "duration": 3600
}
```

**Error Responses:**
```json
// Missing/invalid token
{
  "error": "Reading token required"
}

// Expired token
{
  "error": "Invalid or expired token"
}

// No purchase found
{
  "error": "Access denied. Valid purchase required."
}

// Content not available
{
  "error": "Book content not available"
}
```

## Token Information

The reading token is a JWT that contains:
- `sub`: Reader ID
- `purchase_id`: Purchase ID
- `book_id`: Book ID
- `content_type`: "ebook" or "audiobook"
- `exp`: Expiration time (4 hours from generation)

## Testing

### Test URL Format:
```
http://localhost:9000/read/BOOK_ID?token=JWT_TOKEN
```

### Test Steps:
1. Make a purchase through your app
2. Check email for receipt with reading link
3. Click the link - it should now work!
4. Verify the book content loads correctly

### Manual Testing:
You can test the backend API directly:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     http://localhost:3000/api/v1/books/BOOK_ID/content
```

## UI/UX Considerations

### Loading States:
- Show loading spinner while fetching content
- Display clear error messages
- Handle network failures gracefully

### Content Display:
- **PDFs**: Use iframe for inline viewing
- **Other formats**: Provide download links
- **Audio**: Use HTML5 audio player with controls

### Error Handling:
- Token expired → Redirect to login or library
- Invalid token → Show error message
- Network error → Show retry button
- Missing content → Contact support message

## Advanced Features (Optional)

### Reading Progress:
- Track reading position for PDFs
- Save audio playback position
- Resume from last position

### Enhanced PDF Viewer:
- Zoom controls
- Page navigation
- Search functionality
- Full-screen mode

### Audio Player Enhancements:
- Playback speed control
- Chapter navigation
- Sleep timer
- Background play

## Security Notes

1. **Token Validation**: Always validate tokens on the backend
2. **CORS**: Ensure proper CORS settings for file access
3. **Content Protection**: Files are temporary URLs that expire
4. **Error Messages**: Don't expose sensitive information in error messages

## Common Issues & Solutions

### Issue: "This site can't be reached"
**Solution**: The frontend route `/read/:bookId` is missing. Implement the route and component.

### Issue: "Reading token required"
**Solution**: Ensure the token is being extracted from URL params and passed in the Authorization header.

### Issue: "Invalid or expired token"
**Solution**: Tokens expire after 4 hours. Generate a new token or redirect to library.

### Issue: CORS errors
**Solution**: Configure CORS in Rails to allow your frontend domain.

## Summary

1. ✅ **Backend is ready** - The `/api/v1/books/:id/content` endpoint works
2. ❌ **Frontend missing** - Need to create `/read/:bookId` route and component
3. 🔧 **Implementation** - Extract bookId and token, call backend API, display content
4. 🎯 **Result** - Users can click email links and read their purchased books

The main task is creating the reading page component that handles the URL structure and calls the existing backend API.
