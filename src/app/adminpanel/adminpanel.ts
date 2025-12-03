import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminpanel.html',
  styleUrl: './adminpanel.css'
})
export class AdminPanelComponent implements OnInit {
  newsList: any[] = [];

  currentNews: any = {
    id: null,
    naslov: '',
    sadrzaj: '',
    kategorija: '',
    slika_url: ''
  };

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const user = this.authService.currentUserValue;
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/']);
      return;
    }
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.newsList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  saveNews() {
    if (this.currentNews.id) {
      this.newsService.updateNews(this.currentNews).subscribe(() => {
        alert('Uspješno ažurirano!');
        this.resetForm();
        this.loadNews();
        this.cdr.detectChanges();
      });
    } else {
      this.newsService.addNews(this.currentNews).subscribe(() => {
        alert('Uspješno dodano!');
        this.resetForm();
        this.loadNews();
      });
    }
  }

  editNews(item: any) {
    this.currentNews = { ...item };
  }

  deleteNews(id: number) {
    if (confirm('Sigurno želiš obrisati ovu vijest?')) {
      this.newsService.deleteNews(id).subscribe(() => {
        this.loadNews();
      });
    }
  }

  resetForm() {
    this.currentNews = { id: null, naslov: '', sadrzaj: '', kategorija: '', slika_url: '' };
  }
}