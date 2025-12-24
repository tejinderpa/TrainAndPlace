# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Setup Environment Variables

#### Backend (.env)
Create `backend/.env` and add:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/campus_placement_portal
ACCESS_TOKEN_SECRET=your_secret_key_123456789
REFRESH_TOKEN_SECRET=your_refresh_secret_key_987654321
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
EMAIL_VERIFICATION_SECRET=your_email_secret_key
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
Create `frontend/.env` and add:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Step 3: Start MongoDB

**Windows:**
- Make sure MongoDB service is running
- Or start it with: `mongod`

**Mac/Linux:**
```bash
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

### Step 4: Start Servers

Open **TWO** terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Application

- Open browser: `http://localhost:5173`
- Register with different roles
- Explore role-based dashboards

## 📝 Test Accounts

After registration, use these for testing:

| Role | Email | Password |
|------|-------|----------|
| Student | student@test.com | student123 |
| TPO | tpo@test.com | tpo123456 |
| Company | company@test.com | company123 |
| Alumni | alumni@test.com | alumni123 |

## 🎯 Next Steps

1. **Phase 2**: Implement features for each role
2. Start with Student features (easiest)
3. Then TPO, Company, and Alumni
4. Add real data and functionality

## 📚 Folder Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Badge, Card, etc.)
│   ├── layout/          # Navbar, Sidebar, DashboardLayout
│   └── ProtectedRoute   # Route protection
├── pages/
│   ├── student/         # Student pages
│   ├── tpo/             # TPO pages
│   ├── company/         # Company pages
│   └── alumni/          # Alumni pages
├── services/            # API calls (api.js)
├── store/               # State management (authStore.js)
└── utils/               # Helpers & constants
```

## 🛠️ Development Tips

### Adding New Pages

1. Create page in respective folder (e.g., `pages/student/Applications.jsx`)
2. Add route in `App.jsx`
3. Add navigation item in `Sidebar.jsx`
4. Use common components for consistency

### API Integration

```javascript
// services/api.js
export const jobsAPI = {
  getAll: () => api.get('/jobs'),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`)
};
```

### Using Components

```jsx
import { Card, Badge, Spinner } from '@/components/common';

<Card title="My Card" actions={<button>Action</button>}>
  <Badge variant="success">Active</Badge>
</Card>
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`

### CORS Error
- Verify `FRONTEND_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env`

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 8000 (backend)
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9
```

## 📞 Need Help?

- Check the main README.md
- Review existing code examples
- Test with Postman/Thunder Client
- Check browser console for errors

---

**You're all set! Happy coding! 🎉**
