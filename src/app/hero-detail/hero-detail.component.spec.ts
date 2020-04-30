import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
    // mock the 3 services
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;
    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => '3' } }
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [
                HeroDetailComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
            ]
        });
        // get access to our compoent
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'Super Dude', strength: 200 })); // 
    });

    it('should render a hero name in an h2 tag', () => {
        // trigger bindings
        fixture.detectChanges();

        // tslint:disable-next-line: max-line-length
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');

    });

    it('should call updateHero when save is called', fakeAsync(() => {
        mockHeroService.updateHero.returnValue(of({}));
        fixture.detectChanges();

        // call save();
        fixture.componentInstance.save();

        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));
});