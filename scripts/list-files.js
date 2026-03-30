const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ukpuarzwkghtyetskpga.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcHVhcnp3a2dodHlldHNrcGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDI4NDMsImV4cCI6MjA5MDQxODg0M30.-bb47jA0zke0IeOYNyga0Xjv5TDBiLRdf6o9XyyuZkE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listFiles() {
  const { data, error } = await supabase.storage
    .from('music')
    .list('', { limit: 100 });

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

listFiles();
