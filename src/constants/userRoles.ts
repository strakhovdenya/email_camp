export const ROLE_ADMIN = 'admin';
export const ROLE_STAFF = 'staff';
export const ROLE_CAMPER = 'camper';

export const USER_ROLES = [
  { value: ROLE_ADMIN, label: 'Администратор', canRegister: true },
  { value: ROLE_STAFF, label: 'Сотрудник', canRegister: true },
  { value: ROLE_CAMPER, label: 'Camper', canRegister: false },
];
