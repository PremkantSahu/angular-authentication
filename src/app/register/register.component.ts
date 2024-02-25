import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { API_PATH } from '../shared/api-path';
import { UserInterface } from '../interface/user.inteface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
	form = inject(FormBuilder);
	http = inject(HttpClient);
	authService = inject(AuthService);
	router = inject(Router);

	registrationForm = this.form.nonNullable.group({
		username : ['', Validators.required],
		email : ['', Validators.required],
		password: ['', Validators.required]
	})

	onSubmit(): void {
		// console.log('we are here', this.registrationForm.getRawValue())
		this.http.post<{user: UserInterface}>(API_PATH.registerUrl, {
			user:this.registrationForm.getRawValue()
		}).subscribe((res) => {
			localStorage.setItem('token', res.user.token);
			this.authService.currentUserSignal.set(res.user);
			this.router.navigateByUrl('/login')
		});
		this.registrationForm.reset();
	}
}
