#!/usr/bin/env node

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env file');
  console.error('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY defined');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  try {
    console.log('Testing connection to Supabase...');
    
    // Try to run a simple query
    const { data, error } = await supabase.from('agents').select('count').limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      console.error('Make sure your Supabase instance is running and the credentials are correct');
      
      if (error.message.includes('not found')) {
        console.log('\nThe "agents" table might not exist yet. Try running:');
        console.log('  npm run setup-db');
      }
      
      process.exit(1);
    }
    
    console.log('✅ Successfully connected to Supabase!');
    
    // Check if tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.error('Error checking tables:', tablesError.message);
    } else {
      const tableNames = tables.map(t => t.table_name);
      
      console.log('\nFound the following tables:');
      console.log(tableNames.join(', ') || 'No tables found');
      
      if (!tableNames.includes('agents') || !tableNames.includes('jobs') || !tableNames.includes('activities')) {
        console.log('\nSome required tables are missing. Run the setup script:');
        console.log('  npm run setup-db');
      } else {
        // Check if there's data in the agents table
        const { data: agentsCount, error: countError } = await supabase
          .from('agents')
          .select('count');
        
        if (!countError && agentsCount && agentsCount.length > 0) {
          console.log('\nDatabase appears to be set up correctly!');
        } else {
          console.log('\nTables exist, but they might be empty. Seed the database:');
          console.log('  npm run setup-db');
        }
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

// Run the test
testConnection()
  .then(() => {
    console.log('\nTest completed.');
  })
  .catch((error) => {
    console.error('Unhandled error during test:', error);
    process.exit(1);
  }); 