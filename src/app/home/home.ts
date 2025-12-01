import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  newsList: any[] = [];

  constructor(private newsService: NewsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.newsList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}