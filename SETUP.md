# NeuraChat Setup Instructions

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

- 🤖 **AI Chat Assistant** - Powered by GPT-4 models
- 🌓 **Dark/Light Mode** - Automatic theme switching
- 💾 **Chat Persistence** - Conversations saved locally
- 📱 **Responsive Design** - Works on mobile and desktop
- ⚡ **Real-time Streaming** - Live AI responses

## Usage Tips

- Press **Enter** to send messages
- Press **Shift+Enter** for new lines
- Click the moon/sun icon to toggle themes
- Use the refresh icon to clear chat history

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # OpenAI API integration
│   ├── globals.css        # Glassmorphism styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main chat page
├── components/
│   ├── ChatInput.tsx      # Input field with glass styling
│   ├── ChatMessage.tsx    # Message bubbles
│   ├── ChatWindow.tsx     # Chat container
│   └── Header.tsx         # App header with controls
└── hooks/
    └── useChat.ts         # Chat state management
```

## Troubleshooting

**"OpenAI API key not configured" error:**
- Make sure `.env.local` exists and contains `OPENAI_API_KEY=your_key`
- Restart the development server after adding the env file