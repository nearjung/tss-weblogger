import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // ✅ ตัวนี้คือ provider ของ HttpClient
    // ถ้ามีอินเตอร์เซปเตอร์: provideHttpClient(withInterceptors([myInterceptor]))
    // หรือจะใช้ fetch API: provideHttpClient(withFetch())
  ],
}).catch(err => console.error(err));
