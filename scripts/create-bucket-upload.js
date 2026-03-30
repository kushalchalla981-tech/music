const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://ukpuarzwkghtyetskpga.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcHVhcnp3a2dodHlldHNrcGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDI4NDMsImV4cCI6MjA5MDQxODg0M30.-bb47jA0zke0IeOYNyga0Xjv5TDBiLRdf6o9XyyuZkE';

const supabase = createClient(supabaseUrl, supabaseKey);
const audioDir = "C:\\Users\\Vamsh\\Music\\SpotiDownloader.com - Risky Ishq";

async function createBucketAndUpload() {
  // Create bucket if not exists
  const { data: bucket, error: bucketError } = await supabase.storage.createBucket('music', {
    public: true
  });
  
  if (bucketError && !bucketError.message.includes('already exists')) {
    console.log('Bucket error:', bucketError.message);
  } else {
    console.log('Bucket ready');
  }

  // List files
  const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
  console.log(`Found ${files.length} files`);

  // Upload first 10 files for testing
  const filesToUpload = files.slice(0, 10);
  
  for (const file of filesToUpload) {
    const filePath = path.join(audioDir, file);
    const fileName = file.replace('.mp3', '').replace(/[^a-zA-Z0-9]/g, '_');
    
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const { data, error } = await supabase.storage
        .from('music')
        .upload(`${fileName}.mp3`, fileBuffer, {
          contentType: 'audio/mpeg',
          upsert: true
        });
      
      if (error) {
        console.log(`❌ ${file}: ${error.message}`);
      } else {
        console.log(`✅ ${file}`);
      }
    } catch (err) {
      console.log(`❌ ${file}: ${err.message}`);
    }
  }

  // List files after upload
  const { data } = await supabase.storage.from('music').list('', { limit: 100 });
  console.log('\nUploaded files:', data.length);
}

createBucketAndUpload();
