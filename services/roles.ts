const LOCAL_STORAGE_ROLE = 'identified-role';
const USER_ROLE = 'USER';
const SYSTEM_ADMINISTRATOR_ROLE = 'SYSTEM_ADMINISTRATOR';

type Role = { id: number; name: string };

let _roles: Role[];

const setIdentifiedRoles = (value: boolean) => {
  localStorage.setItem(LOCAL_STORAGE_ROLE, JSON.stringify(value));
};
const clearRoles = () => {
  _roles = [];
  localStorage.removeItem(LOCAL_STORAGE_ROLE);
};

const setRoles = (payload: { [x: string]: string }) => {
  try {
    const roles = JSON.parse(payload?.['roles']) as Role[];
    _roles = roles;
    setIdentifiedRoles(true);
    // console.log('store.arguments(): ', store.arguments());
  } catch {
    return null;
  }
};

const getRole = () => {
  return _roles;
  // const identifiedRoles = localStorage.getItem(LOCAL_STORAGE_ROLE);
  // const parseIdentifiedRoles = identifiedRoles ? JSON.parse(identifiedRoles) : false;

  // try {
  //   const token = (await TokenService.getToken()) as string;
  //   const decodeToken = jwt_decode(token);
  //   const roles = JSON.parse(decodeToken?.['roles']);
  //   setIdentifiedRoles(true);
  //   return { roles, isAlreadyIdentifiedRole: parseIdentifiedRoles, isAdmin: isAdminRole(roles) };
  // } catch {
  //   return null;
  // }
};

const isAdminRole = () => _roles.some((x) => x.name === SYSTEM_ADMINISTRATOR_ROLE);

export default {
  getRole,
  clearRoles,
  setRoles,
  isAdminRole,
  USER_ROLE,
  SYSTEM_ADMINISTRATOR_ROLE,
};
