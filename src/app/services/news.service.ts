import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private apiUrl = 'http://localhost/wp2-api';

    constructor(private http: HttpClient) { }

    getNews(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/get_news.php`);
    }
    addNews(news: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/add_news.php`, news);
    }
    updateNews(news: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/update_news.php`, news);
    }
    deleteNews(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete_news.php?id=${id}`);
    }
}