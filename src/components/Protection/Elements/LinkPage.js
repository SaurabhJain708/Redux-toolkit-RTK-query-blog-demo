import React from 'react'
import { Link } from 'react-router-dom'

const LinkPage = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <h1 className="mb-5">Admin & Editor Dashboard</h1>
      <div className="row text-center w-100">
        {/* Admin Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              <h3 className="card-title mb-4">Admin Links</h3>
              <p className="card-text">Manage users, settings, and access critical administrative tasks.</p>
              <Link to="/Admin" className="btn btn-primary mb-2 w-100">Admin Dashboard</Link>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              <h3 className="card-title mb-4">Editor Links</h3>
              <p className="card-text">Create, edit, and manage content efficiently.</p>
              <Link to="/Editor" className="btn btn-primary mb-2 w-100">Editor Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkPage
