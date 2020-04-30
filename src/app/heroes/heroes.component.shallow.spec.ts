import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA } from "@angular/compiler/src/core";
import { of } from "rxjs";

describe('Heroes Component (shallow tests)', () => {
    // create a fixture
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Spider Dude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'Super Dude', strength: 55 },
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        // create module for the component we want to test
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [{ profive: HeroService, useValue: mockHeroService }],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // trigger change detection for ngOnInit() to fire
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);

    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('li').length).toBe(3);
    });

});