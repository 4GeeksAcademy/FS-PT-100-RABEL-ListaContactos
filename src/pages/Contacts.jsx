import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { loadContacts } from "../store";

export const Contacts = () => {
    const { store, dispatch } = useGlobalReducer();

    // Cargar los contactos desde la API cuando se monta el componente
    useEffect(() => {
        loadContacts(dispatch);
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de Contactos</h1>

            <div className="row">
                {store.contacts.length === 0 ? (
                    <p className="text-center">No hay contactos disponibles</p>
                ) : (
                    store.contacts.map(contact => (
                        <div className="col-md-6 col-lg-4 mb-3" key={contact.id}>
                            <ContactCard contact={contact} refreshContacts={() => loadContacts(dispatch)} />
                        </div>
                    ))

                )}
            </div>
        </div>
    );
};

