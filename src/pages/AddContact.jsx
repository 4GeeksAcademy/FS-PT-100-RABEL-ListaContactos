import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addContact, updateContact } from "../store";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate  = useNavigate();
    const { id }    = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const found = store.contacts.find(c => c.id === Number(id));
            if (found) setFormData(found);
        }
    }, [id, store.contacts]);

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const normalizedPhone = formData.phone.replace(/[^\d]/g, "");
        const dataToSend = { ...formData, phone: normalizedPhone };

        try {
            if (id) {
                await updateContact(dispatch, id, dataToSend);
            } else {
                await addContact(dispatch, dataToSend);
            }
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Hubo un problema guardando el contacto");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Teléfono</label>
                    <input
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Dirección</label>
                    <input
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    {id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
};





