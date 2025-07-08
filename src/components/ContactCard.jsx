import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { deleteContact } from "../store";

export const ContactCard = ({ contact }) => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleDelete = async () => {
        if (!window.confirm("¿Estás seguro de eliminar este contacto?")) return;

        try {
            await deleteContact(dispatch, contact.id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
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


