import { apiUrl } from '../config';

async function doPost(path, body) {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export async function tutorSignup({ firstName, lastName, email, password, calendlyUrl, sessionPrice }) {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  return doPost('/tutor/signup', { name, email, password, calendlyUrl, sessionPrice });
}

export async function tutorLogin({ email, password }) {
  return doPost('/tutor/login', { email, password });
}

export async function createTutorSession({ tutorId, title, studentId = null, paid = false }) {
  if (!tutorId) throw new Error('Missing tutorId');
  return doPost('/tutor/session', { tutorId, title: title || null, studentId, paid });
}

export async function uploadTranscript({ sessionId, studentId = null, file }) {
  if (!sessionId) throw new Error('Missing sessionId');
  if (!file) throw new Error('Missing transcript file');
  const form = new FormData();
  form.append('sessionId', sessionId);
  if (studentId) form.append('studentId', studentId);
  form.append('transcript', file);
  const res = await fetch(apiUrl('/tutor/process-session'), { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export async function listTutorSessions(tutorId) {
  if (!tutorId) throw new Error('Missing tutorId');
  const res = await fetch(apiUrl(`/tutor/sessions/${tutorId}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { sessions: [...] }
}

export async function getTutorSession(sessionId) {
  if (!sessionId) throw new Error('Missing sessionId');
  const res = await fetch(apiUrl(`/tutor/session/${sessionId}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { session }
}

export async function updateTutorSession(sessionId, patch) {
  if (!sessionId) throw new Error('Missing sessionId');
  const res = await fetch(apiUrl(`/tutor/session/${sessionId}`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { session }
}

export async function listStudents() {
  const res = await fetch(apiUrl('/tutor/students'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { students: [{id,name,email}] }
}

export async function getTutorProfile(tutorId) {
  if (!tutorId) throw new Error('Missing tutorId');
  const res = await fetch(apiUrl(`/tutor/profile/${tutorId}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { user }
}

export async function updateTutorProfile(tutorId, patch) {
  if (!tutorId) throw new Error('Missing tutorId');
  const res = await fetch(apiUrl(`/tutor/profile/${tutorId}`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { user }
}
