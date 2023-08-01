const sessions = {};

function getSession(sessionId) {
  const session = sessions[sessionId]
  return session && session.valid ? session : null
}

function invalidateSession(sessionId) {
  const session = sessions[sessionId]
  if (session) {
    sessions[sessionId].valid = false
  }

  return sessions[sessionId]
}

function createSession(email, name) {
  const sessionId = String(Object.keys(sessions).length + 1)
  const session = { sessionId, email, valid: true, name }
  sessions[sessionId] = session
  return session
}

module.exports = {sessions, invalidateSession, getSession, createSession};

// export function getUser(email: string) {
//     return users.find((user) => user.email === email);
// }
