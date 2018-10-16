import {fromEvent} from "rxjs";
import {filter, map, mergeMap} from "rxjs/operators";
import {findRepos, parse, Repo, SearchResult} from "./github/github";

const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
const repos: HTMLElement = document.getElementById('repos') as HTMLElement;
const loading: HTMLElement = document.getElementById('loading') as HTMLElement;

const inputTyping$ = fromEvent(input, 'keyup').pipe(map((event: Event) => (event.target as HTMLInputElement).value));


const req$ = inputTyping$.pipe(
    filter(value => value.length > 2),
    mergeMap((value) => {
        loading.style.display = 'block';
        return findRepos(value);
    })
);

req$.pipe(map(value => parse(value))).subscribe((result: SearchResult) => {
    console.log(repos);
    loading.style.display = 'none';
    showResult(repos, result.items);
});

function showResult(list: HTMLElement, repos: Repo[]) {
    if (list.hasChildNodes()) {
        list.innerHTML = '';
    }
    repos.forEach((repo: Repo) => {
        const li = document.createElement('li');
        li.innerHTML = `<p>${repo.name}</p>`;
        list.appendChild(li);
    })

}