export function selectUser(target, selectedUser) {
  if (selectedUser) selectedUser.classList.remove("highlighted");
    selectedUser = target;
    selectedUser.classList.add("highlighted");
  return selectedUser;
}
