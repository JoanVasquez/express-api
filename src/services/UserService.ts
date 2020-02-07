import User from '../models/User';

export default class UserService {
  private users: Array<User>;

  constructor() {
    this.users = new Array();
    for (let i = 0; i <= 20; i++) {
      const user: User = {
        id: i,
        name: `Test ${i}`,
        email: `test${i}@test.com`,
        password: `test${i}`,
        createdDate: new Date(),
        createdBy: `test ${i}`,
        modifiedDate: new Date(),
        modifiedBy: `test ${i}`
      };
      this.users.push(user);
    }
  }

  public save(user: User): User {
    user.id = this.users.length;
    this.users.push(user);
    return user;
  }

  public update(user: User): void {
    this.users.forEach(item => {
      if (item.id == user.id) {
        item = user;
      }
    });
  }

  public remove(id: number): void {
    this.users.forEach(item => {
      if (item.id == id) {
        console.log(item);
        item = null;
      }
    });
  }

  public list(): Array<User> {
    return this.users;
  }

  public login(email: string, password: string): User {
    return this.users.find(user => {
      if (user.email === email && user.password === password) return user;
      return null;
    });
  }
}
