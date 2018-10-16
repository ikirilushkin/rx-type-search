const TOKEN = 'e7fa239588f3c9711dbe2fc8f271982ce96c8144';

const API_URL = 'https://api.github.com/search/repositories';

export type Owner = {
    id: number;
    login: string;
    url: string;
}

export type Repo = {
    id: number;
    name: string;
    url: string;
    owner: Owner;
}

export interface SearchResult {
    total: number;
    items: Repo[]
}

export function findRepos(repo: string) {
    // return fetch(`${API_URL}?q=${repo}&access_token=${TOKEN}`)
    return fetch(`${API_URL}?q=${repo}`)
        .then(res => res.json())
        .then(value => {
            return value as SearchResult
        });
}

export function parse(obj: any): SearchResult {
    return {
        total: obj['total_count'],
        items: parseRepos(obj['items'] as Object[])
    }
}

function parseRepos(items: any[]) {
    const repos: Repo[] = [];
    items.forEach((item: any) => {
        repos.push({
            id: item['id'],
            name: item['name'],
            url: item['html_url'],
            owner: parseOwner(item['owner'])
        })
    });
    return repos;
}

function parseOwner(owner: any) {
    return {
        id: owner['id'],
        login: owner['login'],
        url: owner['html_url']
    };
}