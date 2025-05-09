import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "noboarabel@gmail.com",
        phone: "+34603650744",
        address: "madrid",
        agenda_slug: "rabel" 
    });

    useEffect(() => {
        if (id) {
            const contact = store.contacts.find(c => c.id === parseInt(id));
            if (contact) {
                setFormData(contact);
            }
        }
    }, [id, store.contacts]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const url = id
                ? `https://playground.4geeks.com/apis/fake/contact/${id}`
                : "https://playground.4geeks.com/apis/fake/contact/";
            const method = id ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Error al guardar contacto");

            dispatch({ type: "refresh_needed" }); // usamos esta acción para volver a cargar contactos
            navigate("/contacts");
        } catch (error) {
            console.error("Error al guardar contacto:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        value={formData.full_name}
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
                        type="text"
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
                        type="text"
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
