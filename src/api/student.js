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

export async function studentSignup({ firstName, lastName, email, password }) {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim();
  return doPost('/student/signup', { name, email, password });
}

export async function studentLogin({ email, password }) {
  return doPost('/student/login', { email, password });
}

export async function listStudentSessions(studentId) {
  if (!studentId) throw new Error('Missing studentId');
  const res = await fetch(apiUrl(`/student/sessions/${studentId}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { sessions }
}

export async function listTutorsWithCalendly() {
  const res = await fetch(apiUrl('/student/tutors'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data && data.error ? data.error : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data; // { tutors: [{id,name,email,calendlyUrl}] }
}
