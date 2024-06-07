import "./App.css";
import "./index.css";
import List from "./List";
import { useState } from "react";
import { uid } from "uid";
import logo from './logo.png';

function App() {
  const [contacts, setContacts] = useState ([ ]);
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState ({
    name : "", prodi : "", telp : "", address : ""
  });

  function handleChange(e) {    // Form Data
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleEdit(id) {     // Edit Data
    let data = [ ...contacts ];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({ name: foundData.name, prodi: foundData.prodi, telp: foundData.telp, address: foundData.address });
    setIsUpdate({id: id, status: true});
  }

  function handleDelete(id) {   // Hapus Data
    let data = [ ...contacts ];
    let contactToDelete = data.find((contact) => contact.id === id);
    if (contactToDelete) {
      let confirmDelete = window.confirm(`Apakah ingin menghapus data contact dengan nama ${contactToDelete.name}...?`);
      if (confirmDelete) {
          let filteredData = data.filter((contact) => contact.id !== id);
          alert(`Data contact ${contactToDelete.name} akan dihapus...!!!`)
          setContacts(filteredData);
      }
    } else {
        alert("Kontak tidak ditemukan.");
    }
  }

  function handleSubmit(e) {    // Validasi Input
    e.preventDefault();
    if (formData.name === "" || formData.prodi === "" || formData.telp === "" || formData.address === "") {
      alert("Anda belum mengisi list data contact secara lengkap....!!!");
      return;
    }

    let data = [...contacts];
    let setting;

    if (isUpdate.status) {      // Update Data
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {     // Details Data Contact Yang Akan Diupdate
          contact.name = formData.name;
          contact.prodi = formData.prodi;
          contact.telp = formData.telp;
          contact.address = formData.address;
        }
      });

      setting = "edit";     // Actions dan Alert Edit Data 
      if (window.confirm(`Apakah anda ingin mengubah data contact dengan nama ${formData.name}...?`)) {
          alert(`Data contact ${formData.name} berhasil diubah...!`);
      } else {
          return;
      }
    } else {      
      data.push({       // Details Data Contact Yang Akan Ditambahkan 
        id: uid(),
        name: formData.name,
        prodi: formData.prodi,
        telp: formData.telp,
        address: formData.address
      });

      setting = "add";      // Actions dan Alert Tambah Data
      if (window.confirm(`Apakah anda ingin menambahkan data contact dengan nama ${formData.name}...?`)) {
        alert(`Data contact ${formData.name} berhasil ditambahkan...!`);
      } else {
        return;
      }
    }
    setIsUpdate({ id: null, status: false });
    setContacts(data);
    setFormData({ name: "", prodi: "", telp: "", address: "" });
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
      <h1 className="px-3 py-3">List My Friends</h1>
      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Nama</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.name} name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Prodi</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.prodi} name="prodi" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telpon</label>
          <input type="number" className="form-control" onChange={handleChange} value={formData.telp} name="telp" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Alamat</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.address} name="address" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List 
        handleDelete={handleDelete}
        handleEdit={handleEdit} 
        data={contacts} />
    </div>
  );
}

export default App;
