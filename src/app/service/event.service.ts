import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APP_CONFIG, getApiUrl } from '../app.config';


// API Response interface for loggers
export interface ApiLoggerResponse {
  count: number;
  data: ApiLoggerData[];
  success: boolean;
}

export interface ApiLoggerData {
  id: number;
  match_id: number;
  driver_name: string;
  car_number: string;
  car_type: string;
  logger_id: string;
  // online_status: string;
}

export interface Match {
  id: number;
  name: string;
  tier: string;
  raceCount: string;
  event: string;
  statusName: string;
  startDate: Date;
  endDate: Date;
  trackImage?: string; // รูปภาพ track (optional)
}

export interface ApiMatchResponse {
  count: number;
  data: ApiMatchData[];
  success: boolean;
}

export interface ApiMatchData {
  id: number;
  name: string;
  tier: string;
  event: string;
  race_count: number;
  start_date: string;
  end_date: string;
  created_by: number;
}


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private matchList: Match[] = [];
  constructor(private http: HttpClient) {  }


    getMatch(): Observable<Match[]> {
    const matchesUrl = getApiUrl(APP_CONFIG.API.ENDPOINTS.GET_MATCHES);
    return this.http.get<ApiMatchResponse>(matchesUrl).pipe(
      map(response => {
        // Map API data to Match interface
        this.matchList = response.data.map((apiData) => ({
          id: apiData.id,
          name: apiData.name,
          statusName: "",
          tier: apiData.tier,
          raceCount: apiData.race_count.toString(),
          event: apiData.event,
          startDate: new Date(apiData.start_date),
          endDate: new Date(apiData.end_date),
          trackImage: "assets/map-race/map-pangsan.png"
        }));
        return this.matchList;
      })
    );
  }
}
