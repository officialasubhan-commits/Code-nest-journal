const http = require('http');

const routes = [
  '/',
  '/about',
  '/admin/login',
  '/certifications',
  '/contact',
  '/courses',
  '/gallery',
  '/journal',
  '/learning',
  '/maintenance',
  '/projects',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      resolve({ route, status: res.statusCode });
      // consume response data to free up memory
      res.resume();
    }).on('error', (err) => {
      resolve({ route, status: 'ERROR', error: err.message });
    });
  });
}

async function runTests() {
  console.log('Starting route checks...');
  let hasErrors = false;
  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.status >= 400 && result.status !== 401 && result.status !== 403) {
      console.error(`❌ FAILED: ${result.route} (Status: ${result.status})`);
      hasErrors = true;
    } else {
      console.log(`✅ OK: ${result.route} (Status: ${result.status})`);
    }
  }
  
  if (hasErrors) {
    console.error('Some routes failed.');
    process.exit(1);
  } else {
    console.log('All checked routes returned success.');
    process.exit(0);
  }
}

// Give server time to boot
setTimeout(runTests, 5000);
