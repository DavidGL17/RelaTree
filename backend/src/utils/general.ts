// a function that removes the password from an array of user objects. The user object is of type user, found in prisma
import { User } from "./prisma";

function removePassword(users: User[]): Omit<User, "password">[] {
  return users.map((user) => {
    delete user.password;
    return user;
  });
}

export { removePassword };
