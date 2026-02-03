/**
 * API Service (Create React App)
 *
 * 1) Create `.env` at project root
 * 2) Set: REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com
 * 3) Restart `npm start`
 */
const API_URL = process.env.REACT_APP_API_URL || "";

// Get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

async function handleJsonResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // ignore
  }

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// Fetch all cards (protected)
export async function getCards() {
  const token = getToken();
  const res = await fetch(`${API_URL}/allcards`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // ← send token
    },
  });
  return handleJsonResponse(res);
}

// Add a new card (protected)
export async function addCard(card) {
  const token = getToken();
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // ← send token
    },
    body: JSON.stringify(card),
  });
  return handleJsonResponse(res);
}

// Update card (protected)
export async function updateCard(id, card) {
  const token = getToken();
  const res = await fetch(`${API_URL}/updatecard/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // ← send token
    },
    body: JSON.stringify(card),
  });
  return handleJsonResponse(res);
}

// Delete card (protected)
export async function deleteCard(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}` // ← send token
    },
  });
  return handleJsonResponse(res);
}

// Login user + save token
export async function login(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await handleJsonResponse(res);

  // Save JWT
  localStorage.setItem("token", data.token);

  return data;
}
