const TOKEN_KEY = "arrate_token";
const USER_KEY = "arrate_usuario";

export const guardarSesion = ({ token, usuario }) => {
localStorage.setItem(TOKEN_KEY, token);
localStorage.setItem(USER_KEY, JSON.stringify(usuario));
};

export const obtenerToken = () => {
return localStorage.getItem(TOKEN_KEY);
};

export const obtenerUsuarioGuardado = () => {
const usuario = localStorage.getItem(USER_KEY);

if (!usuario) {
return null;
}

try {
return JSON.parse(usuario);
} catch {
return null;
}
};

export const eliminarSesion = () => {
localStorage.removeItem(TOKEN_KEY);
localStorage.removeItem(USER_KEY);
};

export const haySesion = () => {
return Boolean(obtenerToken());
};