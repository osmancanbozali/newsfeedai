# **NewsFeedAI**

**NewsFeedAI** is an AI-powered platform that transforms how users consume news. It fetches the latest articles, generates concise summaries, and converts them into natural-sounding audio. With personalized news feeds and daily podcasts crafted from the most relevant stories, NewsFeedAI delivers an efficient and engaging news experience in both text and audio formats.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [To Do](#to-do)

---

## **Features**

✨ **AI-Powered Summarization**: Generates concise, meaningful summaries of lengthy news articles using OpenAI GPT.  
🎙️ **Text-to-Speech Conversion**: Converts news summaries into natural-sounding audio files with Google Text-to-Speech.  
📰 **Personalized Feeds**: Dynamically adjusts news feeds based on user preferences and interaction history.  
🎧 **Daily Podcasts**: Creates personalized podcasts by combining the most relevant articles for each user.  
📂 **Category-Based Browsing**: Explore news across categories like Technology, Business, Sports, and more.  
🔒 **User Authentication**: Secure registration and login system using JWT.  
☁️ **Cloud-Based Storage**: Efficiently stores audio files in Google Cloud Storage for scalability.  
📱 **Responsive Design**: Fully responsive frontend, ensuring seamless use across devices.\
✉️ **Email Verification**: Validates user email addresses during registration, adding an extra layer of account security.\
↩️ **Reset Password**: Allows users to initiate a secure password reset process via email if they forget their credentials.

---

## **Tech Stack**

### **Frontend**  
- ⚛️ **React**  
- ⚡ **Vite (Build Tool)**  
- 🎨 **Tailwind CSS**  

### **Backend**  
- 🟢 **Node.js**  
- 🚀 **Express.js**  
- 🗄️ **MongoDB with Mongoose**  

### **External APIs**  
- 🌐 **gnews.io** (News Fetching)  
- 🤖 **OpenAI GPT API** (Summarization)  
- 🎤 **Google Text-to-Speech API** (Voice Synthesis)  
- ☁️ **Google Cloud Storage API** (Audio File Storage)  

### **Automation**  
- ⏰ **Node-Cron** (Scheduled Tasks)

### **Deployment**  
- 💻 **Frontend**: Render  
- 🛠️ **Backend**: Render  
- 🗃️ **Database**: MongoDB Atlas  
- 📂 **Audio Storage**: Google Cloud Storage  

---

## **Screenshots**

### 1️⃣ **Landing Page**  
*The landing page introduces NewsFeedAI's core features—personalized news feeds, AI-powered summaries, and daily podcasts—while encouraging users to get started with a clear call-to-action.*  
<img width="1609" alt="landing_page" src="https://github.com/user-attachments/assets/e50b93bb-03b5-4d1e-bf46-9d9c5374abc0" />

### 2️⃣ **Register Page**  
*The registration page allows users to create an account by providing their full name, email, and password, ensuring secure access to personalized news feeds and daily podcasts.*  
<img width="1609" alt="register" src="https://github.com/user-attachments/assets/1b0aeeaa-03c0-492b-9dd5-643099bd7f1c" />

### 3️⃣ **Login Page**  
*The login page provides a secure interface for existing users to access their personalized news feeds and podcasts, with options to reset forgotten passwords or navigate to registration for new users.*  
<img width="1609" alt="login" src="https://github.com/user-attachments/assets/a65c0a3b-4aec-4a3e-a394-83ee9c52489d" />

### 4️⃣ **Feed Page with Daily Podcast Section**  
*The feed page greets users personally and showcases the latest news based on their preferences. Users can access their personalized daily podcast for a quick overview of yesterday’s most relevant stories.*  
<img width="1609" alt="feed_podcast" src="https://github.com/user-attachments/assets/5cc36beb-8c06-4b61-a243-594533166871" />

### 5️⃣ **News Feed with Category Filtering**  
*The news feed displays articles organized by categories like Technology, Business, and Sports. Users can explore news interactively and expand articles for a detailed view.*  
<img width="1609" alt="categories" src="https://github.com/user-attachments/assets/3875a851-7138-4a34-aafb-183af20e65e9" />

### 6️⃣ **Expanded News View with Audio Playback**  
*Users can expand any article to read its full summary and listen to the AI-generated audio version, providing a distraction-free and immersive news experience.*  
<img width="1609" alt="newsModal" src="https://github.com/user-attachments/assets/ba4a23c6-873b-46a2-9b70-f8cd85930d38" />

### 7️⃣ **Settings Page**  
*The settings page allows users to manage their account preferences, including changing their fullname, updating passwords, resetting personalized recommendations, and deleting their account. Users are prompted for confirmation before performing critical actions like resetting preferences or deleting their account.*
<img width="1609" alt="settings" src="https://github.com/user-attachments/assets/b0b33c2b-0791-4a3d-9819-0cd05abfb0b7" />

---

## **To Do**

- 🛠️ **Enhancing Prompt Engineering**: Refine the summarization prompts for OpenAI GPT to improve summary accuracy and coherence.  

---
