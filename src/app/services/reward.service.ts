import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '../store';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
    env = environment;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private store: Store,
    ) {
    }

    userSummary(userId) {
        return this.http.get(this.env.apiPath + 'rewards/user/summary/' + userId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    rewardsTriggered(params) {
        const dataToSend = {
            params
        };
        return this.http.post(this.env.apiPath + 'rewards/triggered', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getUserGiftTypes(userId) {
        return this.http.get(this.env.apiPath + 'rewards/user/gifttypes/' + userId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    addUserGiftType(typeId, userId) {
        return this.http.put(this.env.apiPath + 'rewards/user/gifttypes/' + typeId + '/' + userId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    removeUserGiftType(typeId, userId) {
        return this.http.delete(this.env.apiPath + 'rewards/user/gifttypes/' + typeId + '/' + userId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    rewardTriggersByUser(userId) {
        return this.http.get(this.env.apiPath + 'rewards/triggers/' + userId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    createRewardTrigger(trigger, user) {
        const dataToSend = {
            trigger,
            user,
        };
        return this.http.post(this.env.apiPath + 'rewards/trigger/reward', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    inviteUserByEmail(emails, user) {
        const dataToSend = {
            emails,
            user,
        };
        return this.http.post(this.env.apiPath + 'rewards/email/invite', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }


 }
