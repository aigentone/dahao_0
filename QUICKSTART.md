# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- A GitHub account
- A GitHub OAuth App (for authentication)

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add:
```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_string_here
```

### How to get GitHub OAuth credentials:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: DAHAO Local
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/github/callback
4. Copy the Client ID and Client Secret

## Step 3: Run the Development Server
```bash
npm run dev
```

## Step 4: Open Your Browser
Navigate to http://localhost:3000

You should see:
- DAHAO homepage
- "Sign in with GitHub" button in the top right
- After login, you can access the Constitution section

## 🎯 What You Can Do Now
1. Click "Sign in with GitHub" to authenticate
2. Navigate to Constitution to browse documents
3. Click on any section to view it
4. Use the Edit button to modify documents
5. See diffs of your changes

## 🔧 Troubleshooting
- **Port 3000 in use**: Change the port with `npm run dev -- -p 3001`
- **GitHub auth error**: Double-check your OAuth app settings and callback URL
- **Dependencies error**: Try `rm -rf node_modules && npm install`

## 📝 Next Steps
- Fork the `dahao-template` repository to create your own DAHAO
- Customize the constitution and governance rules
- Invite members to participate in governance

Happy building! 🎉