import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../interface/appState.interface";

export const selectArticles = (state: AppStateInterface) => state.articles;

export const isLoadingSelector = createSelector(selectArticles,
    (state) => state.isLoading
)

export const getArticlesSelector = createSelector(selectArticles,
    (state) => state.articles
)

export const errorSelector = createSelector(selectArticles,
    (state) => state.error
)