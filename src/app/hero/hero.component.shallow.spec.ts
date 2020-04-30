import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/compiler/src/core";

describe('Hero Component (shallow test)', () => {
    let fixture: ComponentFixture<HeroComponent>;
    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        // now create component
        fixture = TestBed.createComponent(HeroComponent);
    });

    // create tests
    it('should have the correct hero', () => {
        // get access to heroComponent class properties
        fixture.componentInstance.hero = { id: 1, name: 'Super Dude', strength: 3 };

        expect(fixture.componentInstance.hero.name).toEqual('Super Dude');
    });

    it('should render the hero name in an anchor tag', () => {
        // create hero object 
        fixture.componentInstance.hero = { id: 1, name: 'Super Dude', strength: 3 };
        // force change detection
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude');

    });

});