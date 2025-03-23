#!/usr/bin/env node

require('dotenv').config();
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: Vercel CLI is not installed. Install it with:');
  console.error('  npm install -g vercel');
  process.exit(1);
}

// Check if required environment variables are set
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error('Error: Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`  - ${envVar}`));
  console.error('Make sure these are defined in your .env file');
  process.exit(1);
}

console.log('Starting deployment to Vercel...\n');

// Prompt for deployment type
rl.question('Is this a production deployment? (y/N): ', (answer) => {
  const isProduction = answer.toLowerCase() === 'y';
  
  // Ask for environment name if not production
  if (!isProduction) {
    rl.question('Enter environment name (e.g., development, staging): ', (envName) => {
      deploy(isProduction, envName);
    });
  } else {
    deploy(isProduction);
  }
});

function deploy(isProduction, envName = '') {
  try {
    console.log('\nDeploying to Vercel...');
    
    // Build the deploy command
    let deployCommand = 'vercel';
    
    if (isProduction) {
      deployCommand += ' --prod';
    } else if (envName) {
      deployCommand += ` --env ENVIRONMENT=${envName}`;
    }
    
    // Add environment variables
    Object.entries(process.env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_') || key === 'SUPABASE_SERVICE_ROLE_KEY')
      .forEach(([key, value]) => {
        deployCommand += ` --env ${key}="${value}"`;
      });
    
    // Execute the deployment
    console.log(`Running: ${deployCommand.replace(/--env .+?=".*?"/g, '--env [hidden]')}`);
    
    const deployResult = execSync(deployCommand, { stdio: 'inherit' });
    
    console.log('\nDeployment successful!');
    console.log('\nRemember to set up your database by running:');
    console.log('  NEXT_PUBLIC_API_BASE_URL=https://your-deployment-url.vercel.app npm run setup-db');
    
    rl.close();
  } catch (error) {
    console.error('Error during deployment:', error.message);
    rl.close();
    process.exit(1);
  }
} 