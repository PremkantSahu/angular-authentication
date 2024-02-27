import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ArticleActions from "../articles/action";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ArticleService } from "../../service/article.service";
import { of } from "rxjs/internal/observable/of";

export class ArticlesEffects {
    $actions = inject(Actions);
    articleService = inject(ArticleService);
    getArticles$ = createEffect(() => 
        this.$actions.pipe(ofType(ArticleActions.getArticles), mergeMap(() => {
            return this.articleService.getArticles().pipe(
                map((articles) => ArticleActions.getArticlesSuccess(articles)),
                catchError((error: Error) => of(ArticleActions.getArticlesFailure({ error: error.message })))
            )
        }))
    )
}