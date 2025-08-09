# 🧠 NeuraChat - AI Assistant

A modern, premium AI chat application built with Next.js featuring a stunning glassmorphism design inspired by iOS 17-18 aesthetics. Experience seamless AI conversations with a beautiful, responsive interface.

![NeuraChat Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## ✨ Features

- 🤖 **AI-Powered Chat** - Integration with OpenAI GPT models
- 🌓 **Theme System** - Automatic light/dark mode with system detection
- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop
- ⚡ **Real-time Validation** - Character limits with visual feedback
- 💾 **Chat History** - Persistent conversations with localStorage


## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neurachat
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file in root directory
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
   ```
   
   Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts     # OpenAI API endpoint
│   ├── globals.css           # Theme system & glassmorphism
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main chat application
├── components/
│   ├── ChatInput.tsx        # Input with character validation
│   ├── ChatMessage.tsx      # Message bubbles with animations
│   ├── ChatWindow.tsx       # Scrollable message container
│   ├── Header.tsx           # Navigation with theme toggle
│   └── Logo.tsx             # Custom glassmorphism logo
└── hooks/
    └── useChat.ts           # Chat state management
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help setting up the project:

1. Check the [SETUP.md](SETUP.md) guide for detailed instructions
2. Open an issue for bugs or feature requests