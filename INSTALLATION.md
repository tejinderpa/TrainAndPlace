# 🚀 Complete Installation Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js** (v18+) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v6+) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **VS Code** (Recommended) - [Download](https://code.visualstudio.com/)
- ✅ **Git** (Optional) - [Download](https://git-scm.com/)

### Verify Installation

```bash
# Check Node.js
node --version  # Should show v18.x.x or higher

# Check npm
npm --version   # Should show 9.x.x or higher

# Check MongoDB
mongod --version  # Should show 6.x.x or higher
```

---

## 🔧 Step-by-Step Installation

### 1. Clone/Download Project

```bash
# Option A: If you have Git
git clone <your-repo-url>
cd PlaCen2

# Option B: Download ZIP
# Extract the ZIP file and open terminal in PlaCen2 folder
```

---

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies (this may take 2-3 minutes)
npm install
```

**Expected packages installed:**
- express
- mongoose
- jsonwebtoken
- bcrypt
- cookie-parser
- cors
- helmet
- morgan
- dotenv

#### Create Environment File

Create `backend/.env` file:

**Option A: Copy from example**
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

**Option B: Create manually**

Create new file `backend/.env` with this content:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/campus_placement_portal

# JWT Configuration
ACCESS_TOKEN_SECRET=campus_placement_access_secret_key_2025_change_this
REFRESH_TOKEN_SECRET=campus_placement_refresh_secret_key_2025_change_this
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
EMAIL_VERIFICATION_SECRET=campus_placement_email_secret_2025

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important:** In production, use strong random secrets!

#### Generate Secure Secrets (Optional but Recommended)

```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Use the generated string for your secrets.

---

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies (this may take 2-3 minutes)
npm install
```

**Expected packages installed:**
- react
- react-dom
- react-router-dom
- zustand
- axios
- react-hot-toast
- react-icons
- tailwindcss
- vite

#### Create Environment File

Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

### 4. Database Setup

#### Start MongoDB

**Windows:**

**Option A: Windows Service (Recommended)**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB Server"
4. Right-click → Start

**Option B: Command Line**
```bash
# Run in PowerShell as Administrator
net start MongoDB
```

**Option C: Manual Start**
```bash
# Navigate to MongoDB bin folder (usually)
cd "C:\Program Files\MongoDB\Server\6.0\bin"
mongod
```

**Mac:**
```bash
# If installed with Homebrew
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Start on boot
```

#### Verify MongoDB is Running

```bash
# Open new terminal and run
mongosh

# You should see MongoDB shell
# Type 'exit' to close
```

---

### 5. Run the Application

You need **TWO terminals** open.

#### Terminal 1: Backend Server

```bash
# From backend folder
cd backend
npm run dev
```

**Expected output:**
```
✅ Connected to MongoDB
🚀 Server is running on port 8000
```

**If you see errors:**
- ❌ MongoDB connection error → MongoDB not running
- ❌ Port already in use → Kill process on port 8000
- ❌ Module not found → Run `npm install` again

#### Terminal 2: Frontend Dev Server

```bash
# From frontend folder (new terminal)
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 6. Access the Application

Open your browser and go to:

🌐 **http://localhost:5173**

You should see the **Login page**!

---

## 🧪 Testing the Installation

### Test 1: Register New User

1. Click "Sign up now" or go to `/register`
2. Select role: **Student**
3. Fill form:
   - First Name: `Test`
   - Last Name: `Student`
   - Email: `student@test.com`
   - Password: `student123`
4. Click "Create Account"
5. ✅ Success message should appear

### Test 2: Login

1. Go to `/login`
2. Enter:
   - Email: `student@test.com`
   - Password: `student123`
3. Click "Sign In"
4. ✅ Should redirect to Student Dashboard

### Test 3: Navigation

1. Check sidebar (left) - Should show student menu items
2. Click "Dashboard" - Should see stats cards
3. Check navbar (top) - Should show your name
4. Click logout icon - Should redirect to login

### Test 4: Multiple Roles

Repeat Test 1 & 2 with:
- **TPO**: `tpo@test.com` / `tpo123456`
- **Company**: `company@test.com` / `company123`
- **Alumni**: `alumni@test.com` / `alumni123`

Each should show different dashboard!

---

## 🐛 Troubleshooting

### Backend Issues

#### ❌ MongoDB Connection Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solution:**
1. Start MongoDB (see section 4)
2. Check MongoDB is running: `mongosh`
3. Verify connection string in `backend/.env`

#### ❌ Port 8000 Already in Use

**Windows:**
```bash
# Find process
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

#### ❌ Module Not Found

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

#### ❌ CORS Error in Browser Console

**Solution:**
- Check `FRONTEND_URL` in `backend/.env` matches frontend URL
- Restart backend server

#### ❌ API Connection Failed

**Solution:**
- Check `VITE_API_URL` in `frontend/.env`
- Ensure backend is running
- Check browser console for exact error

#### ❌ Blank Page / React Error

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Database Issues

#### ❌ Database Not Found

**Solution:**
- MongoDB will create database automatically on first write
- No action needed!

#### ❌ Want to Reset Database

```bash
# Open MongoDB shell
mongosh

# Switch to database
use campus_placement_portal

# Drop database
db.dropDatabase()

# Exit
exit
```

---

## 📦 Optional: Install Recommended VS Code Extensions

1. **ES7+ React/Redux/React-Native snippets** - Shortcuts
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind
3. **ESLint** - Code linting
4. **Prettier** - Code formatting
5. **MongoDB for VS Code** - Database viewer

**Install All at Once:**
```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension mongodb.mongodb-vscode
```

---

## 🎯 Next Steps

Once installation is successful:

1. **✅ Read QUICKSTART.md** - Development tips
2. **✅ Read ROADMAP.md** - Feature implementation plan
3. **✅ Read PHASE1_SUMMARY.md** - What's completed
4. **✅ Start building features!** - Follow Phase 2 roadmap

---

## 💡 Pro Tips

### Development Workflow

```bash
# Always keep 2 terminals open
Terminal 1: backend (npm run dev)
Terminal 2: frontend (npm run dev)

# Use a 3rd terminal for git commands, etc.
```

### Hot Reloading

- **Backend**: Auto-restarts on file changes (nodemon)
- **Frontend**: Auto-refreshes on file changes (Vite HMR)

### Testing API Without Frontend

Use **Postman** or **Thunder Client** (VS Code extension):

```
POST http://localhost:8000/api/v1/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User",
  "role": "student"
}
```

### Quick Database Check

```bash
# Open MongoDB shell
mongosh

# Select database
use campus_placement_portal

# Show collections
show collections

# Show all users
db.users.find().pretty()

# Count users by role
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])
```

---

## 🆘 Still Having Issues?

1. **Check all prerequisites** are installed
2. **Verify versions** match requirements
3. **Read error messages** carefully
4. **Check browser console** for frontend errors
5. **Check terminal output** for backend errors

**Common Mistakes:**
- ❌ MongoDB not running
- ❌ Wrong port numbers in .env
- ❌ Forgot to run `npm install`
- ❌ .env files not created
- ❌ Using wrong terminal (not in correct folder)

---

## ✅ Installation Complete Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Backend .env file created
- [ ] Frontend dependencies installed
- [ ] Frontend .env file created
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Successfully registered a test user
- [ ] Successfully logged in
- [ ] Dashboard displays correctly

**If all checked ✅ - You're ready to code! 🎉**

---

## 📞 Quick Reference

| What | URL/Command |
|------|-------------|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000/api/v1 |
| MongoDB Shell | `mongosh` |
| Start Backend | `cd backend && npm run dev` |
| Start Frontend | `cd frontend && npm run dev` |
| Kill Port (Win) | `netstat -ano \| findstr :8000` |
| Kill Port (Mac) | `lsof -ti:8000 \| xargs kill -9` |

---

**Installation complete! Time to build amazing features! 🚀**
