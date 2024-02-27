import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interface/user.interface';
import { API_PATH } from '../shared/api-path';
import { Router } from '@angular/router';
import { ArticleInterface } from '../interface/article.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../interface/appState.interface';
import { errorSelector, getArticlesSelector, isLoadingSelector } from '../store/articles/selector';
import * as ArticleActions from "../store/articles/action";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
	isLoading$!: Observable<boolean>;
    isError$!: Observable<string | null>;
    articles$!: Observable<ArticleInterface[]>;
	authService = inject(AuthService);
    http = inject(HttpClient)
	router = inject(Router)
	constructor(private store: Store<AppStateInterface>) {
		this.isLoading$ = this.store.pipe(select(isLoadingSelector));
		this.isError$ = this.store.pipe(select(errorSelector));
		this.articles$ = this.store.pipe(select(getArticlesSelector));
	}
    ngOnInit() {
        this.getUser();
		this.store.dispatch(ArticleActions.getArticles());
		this.articles$.subscribe((response) => console.log('artical mila ki nahi', response))
		// console.log('artical mila ki nahi', this.articles$);
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

	// getArticles() {
	// 	this.http.get(API_PATH.getArtical).subscribe((res)=> console.log(res))
	// }
    logout() { 
        localStorage.removeItem('token')
        this.authService.currentUserSignal.set(null);
		this.authService.isUserLoggedIn.set(false);
		this.router.navigate(['/login'])
    }
}
