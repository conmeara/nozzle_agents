# Nozzle Agents

A virtual office UI for AI agents that manage sales, support, marketing, and research tasks.

## Features

- Dashboard view of all agents and their tasks
- Individual agent pages with job management
- Recent activity tracking
- Supabase integration for data storage
- Ready for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/pnpm
- A Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nozzle_agents.git
cd nozzle_agents
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Set up environment variables by creating a `.env` file in the root directory:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Test the connection to your Supabase instance:
```bash
npm run test-db
```

5. Set up the Supabase database:
```bash
npm run setup-db
```

This script will:
- Create the necessary tables in your Supabase project
- Add sample data for agents, jobs, and activities

6. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production build
- `npm run lint` - Run ESLint to check for code issues
- `npm run test-db` - Test the connection to your Supabase database
- `npm run setup-db` - Set up the Supabase database schema and seed data
- `npm run deploy` - Deploy the application to Vercel (requires Vercel CLI)

## Deploying to Vercel

### Option 1: Using the Deploy Script

The easiest way to deploy is by using our deploy script:

```bash
npm run deploy
```

This script will:
1. Check if Vercel CLI is installed
2. Verify your environment variables
3. Ask if you want a production or preview deployment
4. Deploy your application with all necessary environment variables

### Option 2: Deploy through Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click on "New Project" and import your repository.
4. Configure the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_BASE_URL` (set to your Vercel deployment URL)
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click "Deploy".

### Option 3: Deploy using Vercel CLI Manually

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

4. Follow the prompts to set up your project and environment variables.

### Post-Deployment Setup

After deploying to Vercel, you need to seed your database. You can do this in two ways:

1. Run the setup script locally, but with the NEXT_PUBLIC_API_BASE_URL set to your Vercel deployment URL:
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-deployment-url.vercel.app npm run setup-db
```

2. Manually execute the SQL scripts in the Supabase dashboard:
   - Go to the Supabase dashboard for your project
   - Navigate to the SQL Editor
   - Copy the contents of `supabase/schema.sql` and run it
   - Then, make a GET request to `https://your-deployment-url.vercel.app/api/seed` to populate the database

## Manual Supabase Setup

If you're having trouble with the automatic database setup, follow these steps to set up your database manually:

1. Log in to the [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to the SQL Editor
4. Copy the contents of `supabase/schema.sql` from this repo
5. Paste it into the SQL Editor and run it
6. Then run the following API call to seed your database with data:

```bash
curl http://localhost:3000/api/seed
```

Or navigate to `http://localhost:3000/api/seed` in your browser.

This will create sample agents, jobs, and activities in your database.

## Project Structure

- `app/` - Next.js application pages and API routes
- `components/` - Reusable UI components
- `lib/` - Utility functions and types
- `styles/` - CSS and styling files
- `public/` - Static assets
- `supabase/` - Supabase-related files (schema, migrations)
- `scripts/` - Utility scripts for database setup

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Vercel](https://vercel.com/)
- [shadcn/ui](https://ui.shadcn.com/) 