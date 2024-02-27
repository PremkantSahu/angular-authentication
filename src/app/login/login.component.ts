import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserInterface } from '../interface/user.interface';
import { AuthService } from '../service/auth.service';
import { API_PATH } from '../shared/api-path';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    form = inject(FormBuilder);
	http = inject(HttpClient);
	authService = inject(AuthService);
	router = inject(Router);

	loginForm = this.form.nonNullable.group({
		email : ['', Validators.required],
		password: ['', Validators.required]
	})

	onSubmit(): void {
		this.http.post<{user: UserInterface}>(API_PATH.loginUrl, {
			user:this.loginForm.getRawValue()
		}).subscribe((res) => {
			localStorage.setItem('token', res.user.token);
			this.authService.currentUserSignal.set(res.user);
			if(res.user) this.authService.isUserLoggedIn.set(true);
			this.router.navigateByUrl('/');
		});
		this.loginForm.reset();
	}
}
