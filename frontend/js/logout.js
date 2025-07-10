// logout.js

// Cek jika tidak ada token, langsung ke halaman login
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'index.html';
} else {
  // Hapus token
  localStorage.removeItem('token');

  // Redirect ke halaman login
  window.location.href = 'index.html';
}
