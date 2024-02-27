import { createReducer, on } from "@ngrx/store";
import { ArticleStateInterface } from "../../interface/articleState.interface";
import * as ArticlesActions from './action';

// slice 
export const initialState: ArticleStateInterface = {
    isLoading: false,
    articles: [],
    error: null
};

export const ArticlesReducers = createReducer(initialState,
    on(ArticlesActions.getArticles,
        (state) => (
            {
                ...state,
                isLoading: true
            })
    ),
    on(ArticlesActions.getArticlesSuccess,
        (state, action) => (
            {
                ...state,
                isLoading: false,
                articles: action.articles

            })
    ),
    on(ArticlesActions.getArticlesFailure,
        (state, action) => (
            {
                ...state,
                isLoading: false,
                error: action.error
            })
    )
);