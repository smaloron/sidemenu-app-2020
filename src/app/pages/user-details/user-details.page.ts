import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User, UserListService} from '../../services/user-list.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.page.html',
    styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

    public user: User;

    constructor(private activeRoute: ActivatedRoute,
                private  userService: UserListService) {
    }

    ngOnInit() {
      this.user = this.userService.findOneById(
          this.activeRoute.snapshot.paramMap.get('id')
      );
    }

}
