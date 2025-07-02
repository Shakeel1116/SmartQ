export const clearOtherRoles = (currentRole) => {
  const roles = ["userData", "vendorData", "adminData"];
  roles.forEach((role) => {
    if (role !== currentRole) {
      localStorage.removeItem(role);
    }
  });
};
