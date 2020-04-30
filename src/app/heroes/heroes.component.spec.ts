
import { HeroesComponent } from "./heroes.component";
import { of } from 'rxjs';

describe('Heroes component', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;
    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Spider Dude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'Super Dude', strength: 55 },
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    })

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {


            component.heroes = HEROES;
            mockHeroService.deleteHero.and.returnValue(of(true));


            component.delete(HEROES[2]);


            expect(component.heroes.length).toBe(2);
        })

        it('should check that deleteHero was called', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalled();

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);

        })
    })
})