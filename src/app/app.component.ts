import { BasketService } from './services/basket.service';
import {
    Component,
    OnInit,
    HostListener,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { Store } from './store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookie.service';
import { AlertService } from './services/alert.service';
import { OverlayService } from './services/overlay.service';
import { NotificationService } from './services/notification.service';
import { ChatService } from './services/chat.service';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from './services/seo.service';
import { CmsService } from './services/cms.service';
import { MenuService } from './services/menu.service';
import { Title } from '@angular/platform-browser';
import { ToolsService } from './services/tools.service';
import { DeviceDetectorService } from 'ngx-device-detector';

// tslint:disable-next-line:ban-types
declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'public';
    overlays$ = this.store.select<any>('overlays');
    asideOpen$ = this.store.select<boolean>('asideOpen');
    isMobile = true;
    user$ = this.store.select<any>('user');

    currentURL = '';
    colouredBackground = false;
    noPaddedTop = false;
    offset = false;
    showFooter = false;

    // route: string;
    activeRoute$ = this.store.select<string>('activeRoute');
    page;
    pageSnippets$ = this.store.select<any[]>('pageSnippets');
    mobileMenu$ = this.store.select<boolean>('mobileMenu');
    device$ = this.store.select<any>('device');
    navigationHistory$ = this.store.select<any[]>('navigationHistory');
    alerts$ = this.store.select<any>('alerts');

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
        event: KeyboardEvent
    ) {
        this.overlayService.closeAll();
    }

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private cookieService: CookieService,
        private alertService: AlertService,
        private overlayService: OverlayService,
        private notificationService: NotificationService,
        private chatService: ChatService,
        private seoService: SeoService,
        private cmsService: CmsService,
        private menuService: MenuService,
        private titleService: Title,
        private toolsService: ToolsService,
        private deviceService: DeviceDetectorService,
        private basketService: BasketService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.epicFunction();
        router.events.subscribe((val) => {
            // see also
            if (val instanceof NavigationEnd) {
                const activeRoute = val.url.replace(/^\/|\/$/g, '');


                this.store.set('activeRoute', activeRoute);
                this.menuByRoute(activeRoute.replace(/\//g, '-'));

                if (isPlatformBrowser(this.platformId)) {
                    const scrollToTop = window.setInterval(() => {
                        const pos = window.pageYOffset;
                        if (pos > 0) {
                            window.scrollTo(0, pos - 50); // how far to scroll on each step
                        } else {
                            window.clearInterval(scrollToTop);
                        }
                    }, 16);
                }

            }
        });

        if (this.cookieService.checkUser()) {
            this.notificationService.listenToNotifications();
        }
    }

    ngOnInit() {
        const sessionId = this.toolsService.sessionId();
        this.store.set('sessionId', sessionId);

        this.cmsService.getSettings().subscribe();
        const user = localStorage.getItem('user');

        this.cookieService.check();
        this.cookieService.checkUser();

        if (this.cookieService.checkUser()) {
            this.chatService.receiveChat();
        }

        this.menuService.menuGroups();
        // this.authService.authTimeout();
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.route),
            map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                    return route;
                }
            }),
            filter((route) => route.outlet === 'primary'),
            mergeMap((route) => route.data))
            .subscribe((event) => {
                if (event.colouredBackground) {
                    this.colouredBackground = event.colouredBackground;
                } else {
                    this.colouredBackground = false;
                }
                if (event.noPaddedTop) {
                    this.noPaddedTop = event.noPaddedTop;
                } else {
                    this.noPaddedTop = false;
                }
                if (event.offset) {
                    this.offset = event.offset;
                } else {
                    this.offset = false;
                }
                this.showFooter = event.showFooter;
                if (event instanceof NavigationEnd) {
                }
            });
        console.log(this.store);

        this.pollCookieExpiration();
    }

    epicFunction() {
        const device = {
            info: this.deviceService.getDeviceInfo(),
            isMobile: this.deviceService.isMobile(),
            isTablet: this.deviceService.isTablet(),
            isTabletV: this.deviceService.isTablet(),
            isTabletH: false,
            isDesktopDevice: this.deviceService.isDesktop(),
            mobileVersion: true,
        };
        if (this.deviceService.isDesktop()) {
            device.mobileVersion = false;
        }

        const innerWidth = window.innerWidth;
        if (device.isTablet || device.isMobile) {
            if (innerWidth > 767) {
                device.mobileVersion = true;
                device.isMobile = false;
                device.isTablet = true;
                device.isTabletV = true;
                device.isTabletH = false;
            }
            if (innerWidth > 1020) {
                device.mobileVersion = false;
                device.isMobile = false;
                device.isTablet = true;
                device.isTabletV = false;
                device.isTabletH = true;
            }
        }
        this.store.set('device', device);
    }

    checkSignInStatus(url) {
        if (!this.store.selectForLocal('user')) {
            this.router.navigate(['']);
        } else {
            if (!url) {
                this.router.navigate(['/account']);
            }
        }
    }


    pollCookieExpiration() {
        setInterval(async () => {
            const protectedRoute = this.store.selectForLocal('protectedRoute');
            const validCookie = await this.cookieService.isAuthenticated();
            if (!validCookie && protectedRoute) {
                this.cookieService.remove();
                this.alertService.error(['Your login session has expired']);
                this.router.navigate(['/']);
            }
        }, 15000);
    }

    onActivate(event) {
        window.scroll(0, 0);
    }

    closeAll() {
        this.overlayService.closeAll();
    }

    menuByRoute(route) {
        this.menuService.menuByRoute(route);
    }
}
