import {Component, OnInit} from '@angular/core';
import {ShellSidebarComponent} from "./shell-sidebar/shell-sidebar.component";
import {ShellHeaderComponent} from "./shell-header/shell-header.component";
import {RouterOutlet} from "@angular/router";
import {Auth, user, User} from "@angular/fire/auth";
import {map} from "rxjs";


@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    ShellSidebarComponent,
    ShellHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit {
  username: string = "";

  constructor(private auth: Auth) {
  }

  ngOnInit(): void {
    user(this.auth).pipe(
      map((user: User | null) => {
        if (user) {
          console.log(user)
          this.username = user.email ?? "";
        }
      })
    ).subscribe();
  }
}
