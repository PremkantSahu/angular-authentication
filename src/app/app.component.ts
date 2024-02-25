import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserInterface } from './interface/user.inteface';
import { API_PATH } from './shared/api-path';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'myApp';
    authService = inject(AuthService);
    http = inject(HttpClient)
    ngOnInit() {
        this.http.get<{ user: UserInterface }>(API_PATH.getUser).subscribe({
            next: (res) => {
                this.authService.currentUserSignal.set(res.user)
            }, error: (err) => {
                this.authService.currentUserSignal.set(null);
            }
        })
    }
    logout() { 
        localStorage.setItem('token', '');
        this.authService.currentUserSignal.set(null);
    }
}

