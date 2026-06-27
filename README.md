# 🚀 Portfolio

A modern, interactive portfolio website built with Next.js, React, and Tailwind CSS. Showcase your projects, skills, experience, and more with stunning animations and a beautiful design.

**Live Demo:** [faizportfoli0.netlify.app](https://faizportfoli0.netlify.app)

---

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with a beautiful starfield background
- ⚡ **Smooth Animations** - Framer Motion animations for seamless interactions
- ✍️ **Typewriter Effect** - Animated text in the hero section
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast Performance** - Built with Next.js for optimal speed
- 🎯 **Multiple Sections**:
  - Hero section with introduction
  - Projects showcase
  - Skills display with badges
  - About section
  - Work experience timeline
  - Blog articles
  - Contact form
  - Navigation and footer

---

## 🛠️ Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Type Animation** - Typewriter effect
- **ESLint** - Code quality

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see your portfolio running!

---

## 📝 Customization

To make this portfolio your own, edit the data files in the `data/` directory:

- **`data/skills.ts`** - Add your skills
- **`data/projects.ts`** - Showcase your projects
- **`data/experience.ts`** - Add your work experience
- **`data/blog.ts`** - Share your blog posts

Update the sections in `components/sections/` for additional customization.

---

## 🏗️ Project Structure

```
my-portfolio/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── skills/            # Skills page
│   ├── experience/        # Experience page
│   ├── blog/              # Blog page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Navbar, Footer, PageWrapper
│   ├── sections/          # Page sections (Hero, Projects, etc.)
│   └── ui/                # Reusable UI components
├── data/                  # Data files for content
├── public/                # Static assets
└── package.json           # Dependencies
```

---

## 🌐 Deployment

This message is to trigger the deployment

### Deploy on Netlify

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

3. **Set up continuous deployment**
   - Every push to `main` will automatically deploy

### Other Deployment Options

- **Vercel** - [vercel.com](https://vercel.com) (recommended for Next.js)
- **GitHub Pages** - Free static hosting
- **AWS, Firebase** - For more advanced deployments

---

## 📦 Build & Production

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Linting
```bash
npm run lint
```

---

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them back to the community!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Faiz Ahmad Khan**

[Portfolio](https://faizportfoli0.netlify.app) | [GitHub](https://github.com/faizahmad-khan)

---

## 📞 Support

If you have questions or need help setting up your portfolio, feel free to reach out or open an issue on GitHub!
