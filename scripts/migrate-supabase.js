// Migrate data from old Supabase project to new one
// READ-ONLY on old project, INSERT to new project
// Usage: node scripts/migrate-supabase.js <NEW_SUPABASE_URL> <NEW_ANON_KEY>

const https = require('https');
const http = require('http');

const OLD_URL = 'https://javthknksdcrlhiaaptj.supabase.co';
const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdnRoa25rc2RjcmxoaWFhcHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzUyOTIsImV4cCI6MjA4ODIxMTI5Mn0.APdwuQ-uudyHISBr7Dj6HTylO7qavJ0HhB32E5X434g';

const NEW_URL = process.argv[2];
const NEW_KEY = process.argv[3];

if (!NEW_URL || !NEW_KEY) {
  console.error('Usage: node scripts/migrate-supabase.js <NEW_SUPABASE_URL> <NEW_ANON_KEY>');
  process.exit(1);
}

function supabaseGet(baseUrl, key, table, select, queryParams) {
  return new Promise(function(resolve, reject) {
    var params = 'select=' + encodeURIComponent(select);
    if (queryParams) params += '&' + queryParams;
    var url = baseUrl + '/rest/v1/' + table + '?' + params;
    var parsed = new URL(url);
    var options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json'
      }
    };
    https.get(options, function(res) {
      var data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() {
        if (res.statusCode !== 200) {
          reject(new Error('GET ' + table + ' failed: ' + res.statusCode + ' ' + data));
          return;
        }
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
}

function supabaseInsert(baseUrl, key, table, rows) {
  return new Promise(function(resolve, reject) {
    var url = baseUrl + '/rest/v1/' + table;
    var parsed = new URL(url);
    var body = JSON.stringify(rows);
    var options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    var req = https.request(options, function(res) {
      var data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() {
        if (res.statusCode !== 201 && res.statusCode !== 200) {
          reject(new Error('INSERT ' + table + ' failed: ' + res.statusCode + ' ' + data));
          return;
        }
        resolve();
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function migrate() {
  console.log('=== Neuron Snake Supabase Migration ===');
  console.log('Old:', OLD_URL);
  console.log('New:', NEW_URL);
  console.log('');

  // 1. Export leaderboard from old project
  console.log('Reading leaderboard from old project...');
  var lb = await supabaseGet(OLD_URL, OLD_KEY, 'neuron_snake_leaderboard', 'name,score,platform,created_at', 'order=id.asc&limit=10000');
  console.log('  Found ' + lb.length + ' leaderboard entries');

  // 2. Export gallery from old project
  console.log('Reading gallery from old project...');
  var gallery = await supabaseGet(OLD_URL, OLD_KEY, 'neuron_gallery', 'name,score,branches,soma_x,soma_y,axon_pts,cols,rows,platform,created_at', 'order=id.asc&limit=10000');
  console.log('  Found ' + gallery.length + ' gallery entries');

  // 3. Insert leaderboard into new project (in batches of 500)
  if (lb.length > 0) {
    console.log('Inserting leaderboard into new project...');
    for (var i = 0; i < lb.length; i += 500) {
      var batch = lb.slice(i, i + 500);
      await supabaseInsert(NEW_URL, NEW_KEY, 'neuron_snake_leaderboard', batch);
      console.log('  Inserted ' + Math.min(i + 500, lb.length) + '/' + lb.length);
    }
  }

  // 4. Insert gallery into new project
  if (gallery.length > 0) {
    console.log('Inserting gallery into new project...');
    for (var i = 0; i < gallery.length; i += 500) {
      var batch = gallery.slice(i, i + 500);
      await supabaseInsert(NEW_URL, NEW_KEY, 'neuron_gallery', batch);
      console.log('  Inserted ' + Math.min(i + 500, gallery.length) + '/' + gallery.length);
    }
  }

  console.log('');
  console.log('=== Migration complete! ===');
  console.log('Leaderboard: ' + lb.length + ' entries');
  console.log('Gallery: ' + gallery.length + ' entries');
  console.log('');
  console.log('Old project data was NOT modified (read-only).');
}

migrate().catch(function(err) {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
