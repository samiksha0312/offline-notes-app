# 📒 Offline Notes App

A fully offline, multi-user notes app built with **React Native** and **AsyncStorage**. Designed for privacy, speed, and simplicity — no internet required.

---

## ✅ Assignment Overview

This app was built as part of a 3-day React Native internship assignment.  
It fulfills all required features including offline authentication, note management, image support, search/sort, and logout.

---

## ✨ Features Implemented

### 🔐 Authentication (Offline Only)
- Local Sign Up and Login screens
- Unique username and password per user
- All user data stored with AsyncStorage
- Logged-in users see only their own notes
- Multiple users supported on the same device

### 📝 Notes Management
- Create, edit, and delete notes
- Each note supports:
  - Title
  - Body text
  - Optional image
- Notes stored locally per user
- Notes list shows title, preview, and thumbnail

### 📷 Image Support
- Add image from gallery or camera
- Images persist after app restart

### 🔍 Search and Sort
- Search notes by title or body
- Sort by:
  - Last Updated (newest → oldest / oldest → newest)
  - Title (A → Z / Z → A)
- Search and sort work together

### 🚪 Logout
- Logout returns to Login screen
- Users can switch accounts

---

## 📱 APK Download

👉 [Download offline-notes-app.apk](release/offline-notes-app.apk)

> To install: Enable “Install from unknown sources” in your Android settings.

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/samiksha0312/offline-notes-app.git
```
---
📦 Libraries Used

- React Native
- Expo
- AsyncStorage
- React Navigation
- Expo Image Picker
- Expo Camera
- UUID
- Moment.js

⚠️ Known Issues / Incomplete Parts

- No backend integration (by design — offline only)
- No persistent image compression (images stored as-is)
- No biometric login (PIN/password only)
---
Made with 💖 by Samiksha Singh

cd offline-notes-app
npm install
npx expo start
