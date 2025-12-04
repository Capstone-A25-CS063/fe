# SPA Routing Configuration for Vercel

This document explains the SPA routing setup for your React + Vite application deployed on Vercel.

## Files Added/Modified

### 1. `vercel.json` (NEW)
Located at project root: `/vercel.json`

**Purpose**: Tells Vercel how to handle SPA routing and configure build/dev commands.

**Key Configuration:**
- `rewrites`: All non-file requests route to `/index.html` (critical for SPA routing)
- `headers`: Optimizes caching strategy for assets vs HTML
- `outputDirectory`: Points to Vite's `dist` folder

### 2. `vite.config.js` (Already Configured)
No changes needed - already optimized with:
- Explicit manualChunks for proper code splitting
- esbuild minification
- optimizeDeps for pre-bundling

### 3. `src/App.jsx` (Already Configured)
React Router setup is correct:
- Uses `<BrowserRouter>` for client-side routing
- Routes all undefined paths to `<RootRedirect />`
- Catch-all route `path="*"` handles 404s gracefully

## How SPA Routing Works

1. **User accesses**: `https://yourdomain.com/dashboard`
2. **Vercel routing** (`vercel.json` rewrites):
   - Checks if `/dashboard` is a static file
   - If not found, serves `/index.html` instead
3. **React Router** in browser:
   - Loads your Vite bundle
   - React Router parses the URL
   - Renders the correct component for `/dashboard`

## Testing Locally

```bash
# Build for production
npm run build

# Preview the production build
npx serve dist

# Test routing by visiting:
# - http://localhost:3000/
# - http://localhost:3000/login
# - http://localhost:3000/dashboard
# - http://localhost:3000/manage-profile
# - http://localhost:3000/data-input
# Refresh page on each route - should NOT get 404
```

## Deployment Steps

1. **Commit changes**:
   ```bash
   git add vercel.json
   git commit -m "Add: Vercel SPA routing configuration"
   git push origin main
   ```

2. **Vercel will automatically**:
   - Detect `vercel.json`
   - Run `npm run build` (creates dist folder)
   - Deploy from `dist` directory
   - Apply the rewrite rules

3. **Test on Vercel**:
   - Visit your deployment URL
   - Navigate to different routes
   - Refresh the page on non-root routes
   - Should load correctly without 404 errors

## Troubleshooting

### Still getting 404 after adding vercel.json?
1. Ensure `vercel.json` is in the **project root** (same level as package.json)
2. Force redeploy: In Vercel dashboard, go to Deployments → click "Redeploy" on latest deployment
3. Check Vercel logs for any configuration errors

### Routes work, but assets don't load?
- Vite already handles asset paths correctly
- The `manualChunks` in `vite.config.js` optimizes this
- Clear browser cache with Ctrl+Shift+Delete

### Authentication/Protected routes showing 404?
- This is expected behavior - the 404 is caught by `path="*"` → `<RootRedirect />`
- `<ProtectedRoute>` and `<RoleProtectedRoute>` will handle auth logic
- Users get redirected based on their token status

## Cache Strategy Explained

**vercel.json headers configuration:**

```json
{
  "source": "/assets/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "max-age=31536000, immutable" }]
}
```
- Vite appends hash to filenames: `/assets/vendor-react-DYFL79yH.js`
- These can be cached forever (1 year) since filename changes when code changes

```json
{
  "source": "/index.html",
  "headers": [{ "key": "Cache-Control", "value": "max-age=3600, must-revalidate" }]
}
```
- HTML is cached only 1 hour + must check with server
- Ensures users get latest version when you deploy

## References

- [Vite - Building for Production](https://vitejs.dev/guide/build.html)
- [React Router - Deployment](https://reactrouter.com/docs/en/v6/guides/deployment)
- [Vercel - Configuration](https://vercel.com/docs/cli/vercel-json)
- [SPA Routing Patterns](https://vercel.com/docs/concepts/deployments/configure-a-build#rewrites)
