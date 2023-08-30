import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuth: boolean = false;
    @Output() linkEvent = new EventEmitter<'recipes' | 'shoppingList'>();

    userSubscription: Subscription;

    collapsed = true;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.user.subscribe(
            (response: User) => {
                this.isAuth = !!response;
            }
        )
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    onLinkClicked(link: 'recipes' | 'shoppingList') {
        this.linkEvent.emit(link);
    }

    saveData() {
        this.dataStorageService.storeRecipes();
    }

    fetchData() {
        this.dataStorageService.fetchData().subscribe();
    }

    logout() {
        this.authService.logout();
    }


}
