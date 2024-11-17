import React from 'react'

const UnAuthorised = () => {
  return (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center bg-dark text-light">
    <div className="text-center">
      <h1 className="display-1 font-weight-bold text-danger">401</h1>
      <h2 className="h4">Unauthorized Access</h2>
      <p className="lead text-muted">You do not have permission to view this page.</p>
      <a href="/" className="btn btn-primary btn-lg mt-3">Go to Homepage</a>
    </div>
  </div>
  )
}

export default UnAuthorised
