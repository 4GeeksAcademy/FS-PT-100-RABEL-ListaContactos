import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar este contacto?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Error al eliminar contacto");

            dispatch({ type: "refresh_needed" }); // Se dispara la recarga en useEffect
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{contact.full_name}</h5>
                <p className="card-text">
                    📍 {contact.address}<br />
                    📞 {contact.phone}<br />
                    📧 {contact.email}
                </p>
                <div className="d-flex justify-content-end gap-2">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/edit-contact/${contact.id}`)}>
                        Editar
                    </button>
                    <button className="btn btn-outline-danger" onClick={handleDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

