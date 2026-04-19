
// ── HELPLYTICS AI — app.js ──

// ── 1. SAVE USER TO LOCALSTORAGE (used on onboarding page) ──
// function saveUser(name, skills, interests, location) {
//   const user = { name, skills, interests, location };
//   localStorage.setItem('helplytics_user', JSON.stringify(user));
// }

// // ── 2. LOAD USER FROM LOCALSTORAGE ──
// function loadUser() {
//   const data = localStorage.getItem('helplytics_user');
//   return data ? JSON.parse(data) : null;
// }

// // ── 3. AI FEATURE — AUTO CATEGORIZE & DETECT URGENCY ──
// // This is the mandatory AI feature for the project.
// // It reads keywords from the user's request title/description
// // and automatically suggests a category and urgency level.
// function aiCategorize(text) {
//   text = text.toLowerCase();

//   let category = 'General';
//   let urgency = 'Low';

//   // Category detection
//   if (text.includes('python') || text.includes('javascript') ||
//       text.includes('code') || text.includes('bug') ||
//       text.includes('react') || text.includes('html') ||
//       text.includes('css') || text.includes('programming') ||
//       text.includes('function') || text.includes('error')) {
//     category = 'Programming';
//   } else if (text.includes('design') || text.includes('figma') ||
//              text.includes('ui') || text.includes('ux') ||
//              text.includes('color') || text.includes('layout')) {
//     category = 'Design';
//   } else if (text.includes('math') || text.includes('algebra') ||
//              text.includes('calculus') || text.includes('equation') ||
//              text.includes('statistics') || text.includes('formula')) {
//     category = 'Math';
//   } else if (text.includes('english') || text.includes('essay') ||
//              text.includes('writing') || text.includes('grammar')) {
//     category = 'Writing';
//   }

//   // Urgency detection
//   if (text.includes('urgent') || text.includes('asap') ||
//       text.includes('exam') || text.includes('tomorrow') ||
//       text.includes('deadline') || text.includes('emergency') ||
//       text.includes('immediately') || text.includes('tonight')) {
//     urgency = 'Urgent';
//   } else if (text.includes('soon') || text.includes('today') ||
//              text.includes('few hours') || text.includes('this week')) {
//     urgency = 'Medium';
//   }

//   return { category, urgency };
// }

// // ── 4. SAVE A HELP REQUEST TO LOCALSTORAGE ──
// function saveRequest(title, description) {
//   const result = aiCategorize(title + ' ' + description);
//   const request = {
//     id: Date.now(),
//     title,
//     description,
//     category: result.category,
//     urgency: result.urgency,
//     status: 'open',
//     date: new Date().toLocaleDateString()
//   };
//   const existing = JSON.parse(localStorage.getItem('helplytics_requests') || '[]');
//   existing.unshift(request);
//   localStorage.setItem('helplytics_requests', JSON.stringify(existing));
//   return request;
// }

// // ── 5. LOAD ALL REQUESTS FROM LOCALSTORAGE ──
// function loadRequests() {
//   return JSON.parse(localStorage.getItem('helplytics_requests') || '[]');
// }

// // ── 6. MARK A REQUEST AS SOLVED ──
// function markSolved(id) {
//   const requests = loadRequests();
//   const updated = requests.map(r => r.id === id ? { ...r, status: 'solved' } : r);
//   localStorage.setItem('helplytics_requests', JSON.stringify(updated));
// }

// // ── 7. GET STATS FOR DASHBOARD ──
// function getStats() {
//   const requests = loadRequests();
//   const user = loadUser();
//   return {
//     posted: requests.length,
//     solved: requests.filter(r => r.status === 'solved').length,
//     open: requests.filter(r => r.status === 'open').length,
//     name: user ? user.name : 'User'
//   };
// }

// // ── 8. ON PAGE LOAD — UPDATE DASHBOARD STATS IF ON DASHBOARD ──
// document.addEventListener('DOMContentLoaded', function () {
//   const statNums = document.querySelectorAll('.stat-num');
//   if (statNums.length > 0) {
//     const stats = getStats();
//     if (statNums[0]) statNums[0].textContent = stats.posted || 12;
//     if (statNums[1]) statNums[1].textContent = stats.solved || 8;
//   }

//   // Update welcome name if user is saved
//   const user = loadUser();
//   const welcomeH1 = document.querySelector('.welcome-banner h1');
//   if (welcomeH1 && user && user.name) {
//     welcomeH1.textContent = 'Welcome back, ' + user.name + ' 👋';
//   }
// ── 1. SAVE USER ──
function saveUser(name, skills, interests, location) {
  const user = { name, skills, interests, location };
  localStorage.setItem('helplytics_user', JSON.stringify(user));
}

// ── 2. LOAD USER ──
function loadUser() {
  const data = localStorage.getItem('helplytics_user');
  return data ? JSON.parse(data) : null;
}

// ── 3. AI CATEGORIZE ──
function aiCategorize(text) {
  text = text.toLowerCase();

  let category = 'General';
  let urgency = 'Low';

  if (
    text.includes('python') || text.includes('javascript') ||
    text.includes('code') || text.includes('bug') ||
    text.includes('react') || text.includes('html') ||
    text.includes('css') || text.includes('programming') ||
    text.includes('function') || text.includes('error')
  ) {
    category = 'Programming';
  } else if (
    text.includes('design') || text.includes('figma') ||
    text.includes('ui') || text.includes('ux') ||
    text.includes('color') || text.includes('layout')
  ) {
    category = 'Design';
  } else if (
    text.includes('math') || text.includes('algebra') ||
    text.includes('calculus') || text.includes('equation') ||
    text.includes('statistics') || text.includes('formula')
  ) {
    category = 'Math';
  } else if (
    text.includes('english') || text.includes('essay') ||
    text.includes('writing') || text.includes('grammar')
  ) {
    category = 'Writing';
  }

  if (
    text.includes('urgent') || text.includes('asap') ||
    text.includes('exam') || text.includes('tomorrow') ||
    text.includes('deadline') || text.includes('emergency') ||
    text.includes('immediately') || text.includes('tonight')
  ) {
    urgency = 'Urgent';
  } else if (
    text.includes('soon') || text.includes('today') ||
    text.includes('few hours') || text.includes('this week')
  ) {
    urgency = 'Medium';
  }

  return { category, urgency };
}

// ── 4. SAVE REQUEST ──
function saveRequest(title, description) {
  const result = aiCategorize(title + ' ' + description);

  const request = {
    id: Date.now(),
    title,
    description,
    category: result.category,
    urgency: result.urgency,
    status: 'open',
    date: new Date().toLocaleDateString()
  };

  const existing = JSON.parse(localStorage.getItem('helplytics_requests') || '[]');
  existing.unshift(request);
  localStorage.setItem('helplytics_requests', JSON.stringify(existing));

  return request;
}

// ── 5. LOAD REQUESTS ──
function loadRequests() {
  return JSON.parse(localStorage.getItem('helplytics_requests') || '[]');
}

// ── 6. MARK SOLVED ──
function markSolved(id) {
  const requests = loadRequests();

  const updated = requests.map(r =>
    r.id === id ? { ...r, status: 'solved' } : r
  );

  localStorage.setItem('helplytics_requests', JSON.stringify(updated));
}

// ── 7. STATS ──
function getStats() {
  const requests = loadRequests();
  const user = loadUser();

  return {
    posted: requests.length,
    solved: requests.filter(r => r.status === 'solved').length,
    open: requests.filter(r => r.status === 'open').length,
    name: user ? user.name : 'User'
  };
}

// ── 8. DASHBOARD UPDATE (FIXED ERROR HERE) ──
document.addEventListener('DOMContentLoaded', function () {
  const statNums = document.querySelectorAll('.stat-num');

  if (statNums.length > 0) {
    const stats = getStats();
    if (statNums[0]) statNums[0].textContent = stats.posted;
    if (statNums[1]) statNums[1].textContent = stats.solved;
  }

  const user = loadUser();
  const welcomeH1 = document.querySelector('.welcome-banner h1');

  if (welcomeH1 && user && user.name) {
    welcomeH1.textContent = 'Welcome back, ' + user.name + ' 👋';
  }
});