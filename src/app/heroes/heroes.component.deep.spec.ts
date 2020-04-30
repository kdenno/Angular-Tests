import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA } from "@angular/compiler/src/core";
import { of } from "rxjs";
import { HeroComponent } from "../hero/hero.component";
import { By } from "@angular/platform-browser";
import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }

})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any;
    onClick() {
        this.navigatedTo = this.linkParams;
    }

}

describe('Heroes Component (deep tests)', () => {
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
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [{ profive: HeroService, useValue: mockHeroService }]
        });
        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should render each hero as a hero component', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentsDEs.length).toEqual(3);
        expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual('Spider Dude');

    });

    it(`should call heroService.deleteHero when the Hero component's delete button is clicked`, () => {

        spyOn(fixture.componentInstance, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        heroComponentsDEs[0].query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => { } });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);


    });

    it('should add a new hero to the heroes array when the add button is clicked', () => {
        // Populate heroes
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // trigger ngOnInit
        fixture.detectChanges();
        // create input i.e the new hero
        const name = 'Mr. Ice';
        mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        // set the value of the input
        inputElement.value = name;

        // get a handle to the button
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        // trigger event
        addButton.triggerEventHandler('click', null);

        // update bindings
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);


    });

    // testing the RouterLink
    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerlink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub));
        const instanceofStub = routerlink.injector.get(RouterLinkDirectiveStub);
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(instanceofStub.navigatedTo).toBe('/detail/1');

    });
});