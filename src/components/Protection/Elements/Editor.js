import React from 'react'

const Editor = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <header className="bg-dark text-light p-3">
        <h1 className="h4">Editor</h1>
      </header>
      <div className="flex-grow-1 d-flex">
        <aside className="bg-secondary text-light p-3" style={{ minWidth: '250px' }}>
          <h2 className="h5">Tools</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="#formatting">Formatting</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#media">Media</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#settings">Settings</a>
            </li>
          </ul>
        </aside>
        <main className="flex-grow-1 p-3 bg-light">
          <div className="toolbar mb-3">
            <button className="btn btn-primary me-2">Bold</button>
            <button className="btn btn-primary me-2">Italic</button>
            <button className="btn btn-primary">Save</button>
          </div>
          <textarea
            className="form-control"
            rows="15"
            placeholder="Start editing your content here..."
            style={{ resize: 'none' }}
          />
        </main>
      </div>
    </div>
  )
}

export default Editor
