import React from 'react'

const Admin = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <header className="bg-dark text-light p-3">
        <h1 className="h4">Admin Dashboard</h1>
      </header>
      <div className="d-flex flex-grow-1">
        <nav className="bg-secondary text-light p-3" style={{ minWidth: '250px' }}>
          <h2 className="h5">Navigation</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="#users">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#orders">Orders</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#reports">Reports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#settings">Settings</a>
            </li>
          </ul>
        </nav>
        <main className="flex-grow-1 p-3 bg-light">
          <h2 className="h5">Welcome to the Admin Dashboard</h2>
          <p className="text-muted">Manage your application from here.</p>
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">Quick Stats</h3>
              <p className="card-text">Total Users: 150</p>
              <p className="card-text">Total Products: 45</p>
              <p className="card-text">Total Orders: 78</p>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">Recent Activity</h3>
              <ul>
                <li>User John Doe signed up.</li>
                <li>Product XYZ was added.</li>
                <li>Order #123 was completed.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Admin
