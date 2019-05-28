import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant/restaurant.model';
import { RestaurantsService } from '../restaurants.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  restaurants: Array<Restaurant>;
  constructor(private restaurantService: RestaurantsService, private router: Router,
  private auth: AuthService) { }

  ngOnInit() {
    console.log('HOME');
    this.restaurantService.getRestaurants().subscribe((data: Array<Restaurant>) => {
      this.restaurants = data;
    });
  }

  presentMyBasket() {
    this.router.navigate(['/basket-card']);
  }

  back() {
    this.auth.logout();
    this.router.navigate(['./home']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['./home']);
  }

}
