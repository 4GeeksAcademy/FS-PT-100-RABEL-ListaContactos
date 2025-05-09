export const initialStore = () => ({
  contacts: []  // Lista de contactos
});

const API_URL = "https://playground.4geeks.com/apis/fake/contact";
const AGENDA_SLUG = "Rabel"; 

const storeReducer = (store, action) => {
  switch (action.type) {

      case "load_contacts":
          return {
              ...store,
              contacts: action.payload
          };

      case "refresh_needed":
          
          return { ...store };

      default:
          return store;
  }
};


export const loadContacts = async (dispatch) => {
  try {
      const resp = await fetch(`${API_URL}/agenda/${AGENDA_SLUG}`);
      if (!resp.ok) throw new Error("Error cargando contactos");
      const data = await resp.json();
      dispatch({ type: "load_contacts", payload: data });
  } catch (error) {
      console.error("Error al cargar contactos:", error);
  }
};

export default storeReducer;
