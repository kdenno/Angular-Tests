import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Hero Service', () => {
    let mockMessageService;
    let service: HeroService;
    let httptestingControler: HttpTestingController;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroService,
                { provider: MessageService, userValue: mockMessageService }]
        });
        httptestingControler = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);

    });

    // test getHero()

    describe('getHero', () => {
        it('should call getHero with the right url', () => {
            service.getHero(4).subscribe();

            const req = httptestingControler.expectOne('api/heroes/4');
            req.flush({ id: 4, name: 'SuperDude', strength: 100 });
        });
    });

});