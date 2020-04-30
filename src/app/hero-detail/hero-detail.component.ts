import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    /* so lets make a call to this function trigger only after 250s so even if somebody presses
    the same button several times within that time it'll only be triggered once.
     Now to make the code asynchronous,there is a time out on line 63 that makes this all happen 
    lets make the call to this function asynchronous but wrapping it in the debounce function*/
    debounce(() => {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }, 250, false)(); // call to debounce will create a function so we IIFE it

  }
}

/* what is debounce in javascript? 
There are several situations in JavaScript where you want a function that is bound to an event to 
fire only once after a specific amount of time has passed. ... 
Enter the JavaScript debounce function.*/
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callnow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callnow) func.apply(context, args);
  }

}
