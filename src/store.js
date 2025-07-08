const API_ROOT    = "https://playground.4geeks.com/contact";
const API_AGENDAS = `${API_ROOT}/agendas`;

export const AGENDA_SLUG = "rabel";

export const initialStore = { contacts: [] };

export const storeReducer = (state, action) =>
  action.type === "set_contacts"
    ? { ...state, contacts: action.payload }
    : state;

const ensureAgenda = async () => {
  const resp = await fetch(`${API_AGENDAS}/${AGENDA_SLUG}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  if (![201, 400, 409].includes(resp.status))
    throw new Error("Error creando agenda");
};

export const loadContacts = async dispatch => {
  try {
    const resp = await fetch(`${API_AGENDAS}/${AGENDA_SLUG}/contacts`);

    if (resp.status === 404) {
      await ensureAgenda();
      dispatch({ type: "set_contacts", payload: [] });
      return;
    }
    if (!resp.ok) throw new Error("Error cargando contactos");

    const data = await resp.json();                 
    const list = Array.isArray(data) ? data : data.contacts ?? [];

    dispatch({ type: "set_contacts", payload: list });
  } catch (err) {
    console.error(err);
  }
};

export const addContact = async (dispatch, data) => {
  const resp = await fetch(`${API_AGENDAS}/${AGENDA_SLUG}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)          
  });

  if (!resp.ok) throw new Error("Error creando contacto");
  await loadContacts(dispatch);
};

export const updateContact = async (dispatch, id, data) => {
  const resp = await fetch(
    `${API_AGENDAS}/${AGENDA_SLUG}/contacts/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );
  if (!resp.ok) throw new Error("Error actualizando contacto");
  await loadContacts(dispatch);
};

export const deleteContact = async (dispatch, id) => {
  const resp = await fetch(
    `${API_AGENDAS}/${AGENDA_SLUG}/contacts/${id}`,
    { method: "DELETE" }
  );
  if (!resp.ok) throw new Error("Error eliminando contacto");
  await loadContacts(dispatch);
};

