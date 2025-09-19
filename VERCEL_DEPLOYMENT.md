# Vercel Deployment Guide for Chain Guard Funding

This guide provides step-by-step instructions for deploying the Chain Guard Funding application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import the repository: `mint4machine/chain-guard-funding`

### 2. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://1rpc.io/sepolia
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
```

### 3. Build Configuration

#### Vercel Configuration File
Create `vercel.json` in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"]
}
```

### 4. Deployment Steps

1. **Click "Deploy"** in Vercel dashboard
2. Wait for build to complete (usually 2-3 minutes)
3. Check build logs for any errors
4. Once deployed, you'll get a URL like: `https://chain-guard-funding-xxx.vercel.app`

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate to be issued

### 6. Environment Variables Setup

#### In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `VITE_CHAIN_ID` = `11155111`
   - `VITE_RPC_URL` = `https://1rpc.io/sepolia`
   - `VITE_WALLET_CONNECT_PROJECT_ID` = `2ec9743d0d0cd7fb94dee1a7e6d33475`
   - `VITE_INFURA_API_KEY` = `b18fb7e6ca7045ac83c41157ab93f990`

#### For Different Environments:
- **Production**: Use Sepolia testnet
- **Preview**: Use localhost or testnet
- **Development**: Use local development

### 7. Build Optimization

#### Package.json Scripts
Ensure these scripts are in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

#### Vite Configuration
Ensure `vite.config.ts` is optimized:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wallet: ['wagmi', '@rainbow-me/rainbowkit']
        }
      }
    }
  }
})
```

### 8. Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works
- [ ] Environment variables are set correctly
- [ ] Build logs show no errors
- [ ] Custom domain (if used) is working
- [ ] SSL certificate is active

### 9. Monitoring and Maintenance

#### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Check error logs regularly

#### Updates
- Push to main branch triggers automatic deployment
- Use preview deployments for testing
- Monitor build logs for issues

### 10. Troubleshooting

#### Common Issues:

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID
   - Check RPC URL is accessible
   - Ensure chain ID is correct

4. **Performance Issues**
   - Enable Vercel Analytics
   - Check bundle size
   - Optimize images and assets

#### Debug Commands:
```bash
# Local build test
npm run build

# Check bundle size
npm run build && npx vite-bundle-analyzer dist

# Lint check
npm run lint
```

### 11. Security Considerations

- Never commit private keys to repository
- Use environment variables for sensitive data
- Enable Vercel's security features
- Regular dependency updates

### 12. Performance Optimization

- Enable Vercel's Edge Functions
- Use CDN for static assets
- Optimize images with Vercel's Image Optimization
- Enable compression

## Support

For issues with deployment:
1. Check Vercel documentation
2. Review build logs
3. Contact Vercel support if needed
4. Check GitHub repository for updates

## Next Steps

After successful deployment:
1. Test all functionality
2. Set up monitoring
3. Configure custom domain
4. Set up CI/CD pipeline
5. Plan for production scaling
