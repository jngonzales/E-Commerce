# 🔒 SECURITY CHECKLIST - Before Publishing to GitHub

## ⚠️ CRITICAL: Do This BEFORE Your First Commit!

### 1. 🔴 Change ALL Secrets Immediately

**Current secrets that MUST be changed:**

#### MongoDB Database
- [ ] Go to MongoDB Atlas → Database Access
- [ ] Delete or change password for your database user
- [ ] Create a new database user with a NEW password
- [ ] Update your local `.env` with new credentials
- [ ] **Never use the old password again** (it's compromised)

#### JWT Secret
- [ ] Generate a NEW JWT secret:
```bash
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 128 | % {[char]$_})
```
- [ ] Replace the JWT_SECRET in your `.env` file
- [ ] This will invalidate all existing user tokens (users must re-login)

### 2. ✅ Verify .gitignore Protection

Run this command to verify .env is ignored:
```bash
git check-ignore backend/.env frontend/.env
```
Should output:
```
backend/.env
frontend/.env
```

### 3. 🔍 Check for Leaked Secrets

Before committing, search your entire project:
```bash
# Search for any passwords or secrets
Get-ChildItem -Recurse -File | Select-String "your_actual_password_here"

# Search for connection strings
Get-ChildItem -Recurse -File | Select-String "mongodb+srv://"
```

If ANY files show up (except .env), you MUST remove the secrets from those files!

### 4. 📝 Safe Files to Commit

**DO Commit:**
- ✅ All source code (`.ts`, `.tsx`, `.js`, `.jsx`)
- ✅ Configuration files (`package.json`, `tsconfig.json`)
- ✅ `.env.example` files (with placeholder values only)
- ✅ Documentation (`.md` files without secrets)
- ✅ Docker files
- ✅ `.gitignore`

**DO NOT Commit:**
- ❌ `.env` files
- ❌ `node_modules/`
- ❌ `dist/` or `build/` folders
- ❌ Log files
- ❌ Any file containing real passwords/secrets

### 5. 🎯 Safe GitHub Publishing Steps

```bash
# 1. Initialize git (if not already done)
git init

# 2. Verify .gitignore is working
git status
# Should NOT show .env files in the list!

# 3. Add all safe files
git add .

# 4. Double-check what will be committed
git status
# Verify .env is NOT in the list of files to be committed

# 5. Make first commit
git commit -m "Initial commit - BikeHub E-Commerce Platform"

# 6. Create GitHub repository (on GitHub.com)
# - Do NOT initialize with README (you already have one)
# - Keep it public or private as you prefer

# 7. Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 6. 🔐 What to Do if You Already Pushed Secrets

**If you accidentally pushed secrets to GitHub:**

1. **Delete the repository immediately** on GitHub.com
2. Change ALL secrets:
   - MongoDB password
   - JWT secret
   - Any other credentials
3. Create a new repository
4. Follow the steps above carefully

### 7. 📋 Environment Variables Checklist

Create a `.env.example` file for documentation (without real values):

**backend/.env.example:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/your_database
JWT_SECRET=generate_a_long_random_string_at_least_64_characters
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**frontend/.env.example:**
```env
VITE_API_URL=http://localhost:5000
```

### 8. 🌐 Safe Deployment Variables

When deploying to production:

**For Backend (Railway/Render/Heroku):**
- Set environment variables in the hosting platform's dashboard
- Never hardcode secrets in code
- Use different secrets for production vs development

**For Frontend (Vercel/Netlify):**
- Set `VITE_API_URL` to your production backend URL
- All other secrets should be backend-only

### 9. 🔒 MongoDB Atlas Security

After changing password:

1. Go to MongoDB Atlas → Network Access
2. Set IP Whitelist (don't use 0.0.0.0/0 in production)
3. Enable Database Auditing
4. Set up database backups

### 10. ✅ Final Checklist

Before pushing to GitHub, verify:

- [ ] `.env` files are in `.gitignore`
- [ ] No real secrets in any committed files
- [ ] `.env.example` files have placeholder values only
- [ ] MongoDB password has been changed
- [ ] JWT secret has been regenerated
- [ ] Git status shows no `.env` files
- [ ] Ran secret search commands (found nothing)
- [ ] README has no real credentials
- [ ] Documentation files have no real secrets

---

## 🚨 Remember:

**Once secrets are on GitHub, they are COMPROMISED FOREVER!**

Even if you delete a commit, the secrets exist in Git history. Always treat pushed secrets as public information and change them immediately.

---

## ✅ You're Safe to Publish When:

1. All real secrets have been changed
2. `.gitignore` is protecting `.env` files
3. No secrets appear in search results
4. `.env.example` files have placeholders only
5. Git status doesn't show any `.env` files

**Then and only then**, you can safely push to GitHub! 🎉
