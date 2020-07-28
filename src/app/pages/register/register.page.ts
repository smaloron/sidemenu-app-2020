import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    public userName = '';

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    validate(){
      console.log(this.userName);
      this.userService.register({name: this.userName});
    }

}
