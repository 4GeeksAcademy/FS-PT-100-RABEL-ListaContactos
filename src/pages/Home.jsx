import { useEffect } from "react";
import { ContactCard } from "../components/ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { loadContacts } from "../store";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    
    useEffect(() => { loadContacts(dispatch); }, [dispatch]);

    if (!Array.isArray(store.contacts)) {
        return <p className="text-center mt-5">Cargando la agenda…</p>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de Contactos</h1>

            <div className="row">
                {store.contacts.length === 0 ? (
                    <p className="text-center">No hay contactos</p>
                ) : (
                    store.contacts.map(c => (
                        <div className="col-md-6 col-lg-4 mb-3" key={c.id}>
                            <ContactCard contact={c} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


