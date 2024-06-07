import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function List({ data, handleEdit, handleDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Prodi</th>
            <th>Telpon</th>
            <th>Alamat</th>
            <th width="75">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.prodi}</td>
              <td>{contact.telp}</td>
              <td>{contact.address}</td>
              <td>
                <button 
                  onClick={() => handleEdit(contact.id)} 
                  className="btn btn-warning btn-sm me-2 mb-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(contact.id)} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
