import { Component, OnInit } from '@angular/core';
import { IBlog, IUser } from '../shared/interfaces/blog.interface';
import { BlogService } from '../shared/services/blog/blog.service';

@Component({
  selector: 'app-task06',
  templateUrl: './task06.component.html',
  styleUrls: ['./task06.component.scss']
})
export class Task06Component implements OnInit {

  public userName = '';
  public blogs!: IBlog[];
  public users!: IUser[];
  public modal: Modal = {
    modal: false,
    signIn: false,
    signUp: false,
    addPost: false,
    editPost: false
  };
  public currentUser = {
    name: '',
    email: '',
    password: ''
  };
  public currentPost = {
    index: -1,
    topic: '',
    message: ''
  };
  public regExp = {
    name: /^[\w_ \-]{2,20}$/,
    email: /^[a-z0-9_\-.]+@[a-z.]+\.[a-z]+$/,
    password: /^[\w_\-.]{2,20}$/
  }
  public inputWrong = {
    name: false,
    email: false,
    password: false,
    topic: false,
    message: false
  };
  public modalWarning = {
    name: false,
    email: false,
    password: false
  };

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
    this.getUsers();
  }

  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }

  getUsers(): void {
    this.users = this.blogService.getUsers();
  }

  closeModal(): void {
    let key: keyof Modal;
    for (key in this.modal) {
      this.modal[key] = false;
    }
  }

  showSignIn(): void {
    this.modal.signIn = true;
    this.modal.modal = true;
  }

  signIn(): void {
    if(!this.currentUser.email) {
      this.inputWrong.email = true;
      return;
    }
    this.inputWrong.email = false;
    if(!this.currentUser.password) {
      this.inputWrong.password = true;
      return;
    }
    this.inputWrong.password = false;

    for (const user of this.users) {
      if(user.email === this.currentUser.email
        && user.password === this.currentUser.password) {
        this.userName = user.username;
        this.closeModal();
        this.inputWrong.email = false;
        this.inputWrong.password = false;
        this.modalWarning.password = false;
        return;
      }
    }
      this.inputWrong.email = true;
      this.inputWrong.password = true;
      this.modalWarning.password = true;
  }

  showSignUp(): void {
    this.modal.signUp = true;
    this.modal.modal = true;
  }

  signUp(): void {
    for (const user of this.users) {
      if(user.username === this.currentUser.name) {
        this.modalWarning.name = true;
        return;
      }
    }
    this.modalWarning.name = false;
    if(!this.regExp.name.test(this.currentUser.name)) {
      this.inputWrong.name = true;
      return;
    }
    this.inputWrong.name = false;
    for (const user of this.users) {
      if(user.email === this.currentUser.email) {
        this.modalWarning.email = true;
        return;
      }
    }
    this.modalWarning.email = false;
    if(!this.regExp.email.test(this.currentUser.email)) {
      this.inputWrong.email = true;
      return;
    }
    this.inputWrong.email = false;
    if(!this.regExp.password.test(this.currentUser.password)) {
      this.inputWrong.password = true;
      return;
    }
    this.inputWrong.password = false;

    let id = this.users[this.users.length - 1].id + 1;
    let newUser: IUser = {
      id: id,
      username: this.currentUser.name,
      email: this.currentUser.email,
      password: this.currentUser.password
    };
    this.blogService.addUser(newUser);
    this.userName = this.currentUser.name;
    this.closeModal();
  }

  signOut(): void {
    this.userName = '';
    this.currentUser.name = '';
    this.currentUser.email = '';
    this.currentUser.password = '';
  }

  showAddPost(): void {
    this.modal.editPost = false;
    this.modal.addPost = true;
    this.modal.modal = true;
  }

  addPost(): void {
    if(!this.currentPost.topic) {
      this.inputWrong.topic = true;
      return;
    }
    this.inputWrong.topic = false;
    if(!this.currentPost.message) {
      this.inputWrong.message = true;
      return;
    }
    this.inputWrong.message = false;

    let id = this.blogs[this.blogs.length - 1].id + 1;
    let newPost: IBlog = {
      id: id,
      postedBy: this.userName,
      date: new Date(),
      topic: this.currentPost.topic,
      message: this.currentPost.message
    }
    this.blogService.addBlog(newPost);
    this.closeModal();
    this.currentPost.topic = '';
    this.currentPost.message = '';
  }

  showEditPost(index: number): void {
    this.currentPost.index = index;
    this.currentPost.topic = this.blogs[index].topic;
    this.currentPost.message = this.blogs[index].message;
    this.modal.editPost = true;
    this.modal.addPost = false;
    this.modal.modal = true;
  }

  editPost(): void {
    this.blogService.editBlog({
      index: this.currentPost.index,
      topic: this.currentPost.topic,
      message: this.currentPost.message
    });
    this.currentPost.index = -1;
    this.currentPost.topic = '';
    this.currentPost.message = '';
    this.closeModal();
  }

  deletePost(index: number): void {
    this.blogService.deleteBlog(index);
  }

}

interface Modal {
  modal: boolean;
  signIn: boolean;
  signUp: boolean;
  addPost: boolean;
  editPost: boolean;
}
