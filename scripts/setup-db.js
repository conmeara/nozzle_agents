#!/usr/bin/env node

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env file');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Read the schema SQL file
const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Execute SQL schema
    const { error: schemaError } = await supabase.rpc('exec_sql', { 
      sql_string: schemaSql 
    });
    
    if (schemaError) {
      console.error('Error setting up database schema:', schemaError);
      return;
    }
    
    console.log('Database schema created successfully');
    
    // Now seed the database by calling our API endpoint
    console.log('Seeding database with sample data...');
    
    // Use either fetch in Node.js version that supports it, or node-fetch
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/api/seed`);
      const data = await response.json();
      
      if (response.ok) {
        console.log('Database seeded successfully');
        console.log(`Created ${data.agents?.length || 0} agents`);
        console.log(`Created ${data.jobCount || 0} jobs`);
        console.log(`Created ${data.activitiesCount || 0} activities`);
      } else {
        console.error('Error seeding database:', data.error);
      }
    } catch (fetchError) {
      console.error('Error calling seed API:', fetchError);
    }
    
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the setup
setupDatabase()
  .then(() => {
    console.log('Setup complete');
  })
  .catch((error) => {
    console.error('Unhandled error during setup:', error);
    process.exit(1);
  }); 