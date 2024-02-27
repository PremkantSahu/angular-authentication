import { createAction, props } from "@ngrx/store";
import { ArticleInterface } from "../../interface/article.interface";

export const getArticles = createAction('[Articles] Get Articles');

export const getArticlesSuccess = createAction('[Articles] Get Articles Success',
    props<{ articles: ArticleInterface[] }>()
)

export const getArticlesFailure = createAction('[Articles] Get Articles failure',
    props<{ error: string }>()
) 