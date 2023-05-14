import { Injectable } from '@angular/core';
import { IBlog, IUser } from '../../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private users: Array<IUser> = [
    {
      id: 0,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  ];

  private blogs: Array<IBlog> = [
    {
      id: 0,
      postedBy: 'admin',
      date: new Date(2023, 3, 11, 12, 0),
      topic: 'First post',
      message: 'Sign up to create your account and start to Use Angular Blog'
    }
  ];

  constructor() { }

  getUsers(): Array<IUser> {
    return this.users;
  }

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }

  addBlog(blog: IBlog): void {
    this.blogs.push(blog);
  }

  editBlog(blog: {index: number, topic: string, message: string}): void {
    this.blogs[blog.index].topic = blog.topic;
    this.blogs[blog.index].message =blog.message;
  }

  deleteBlog(index: number): void {
    this.blogs.splice(index, 1);
  }
}
