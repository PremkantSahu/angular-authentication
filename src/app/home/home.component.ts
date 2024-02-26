import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interface/user.inteface';
import { API_PATH } from '../shared/api-path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
	authService = inject(AuthService);
    http = inject(HttpClient)
	router = inject(Router)
    ngOnInit() {
        this.getUser();
		this.getArticles();
    }
    getUser() {
		this.http.get<{ user: UserInterface }>(API_PATH.getUser).subscribe(
			{
				next: (res) => {
					this.authService.currentUserSignal.set(res.user);
				}, error: (err) => {
					this.authService.currentUserSignal.set(null);
				}
			}
		)
    }

	getArticles() {
		this.http.get(API_PATH.getArtical).subscribe((res)=> console.log(res))
	}
    logout() { 
        localStorage.removeItem('token')
        this.authService.currentUserSignal.set(null);
		this.authService.isUserLoggedIn.set(false);
		this.router.navigate(['/login'])
    }
}
