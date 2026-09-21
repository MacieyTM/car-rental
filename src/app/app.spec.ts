import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);

    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Car Rental');
  });

  it('should display a reservation after reserving a car', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button:nth-of-type(2)',
    ) as HTMLButtonElement;

    button.click();

    fixture.detectChanges();

    const reservations = fixture.nativeElement.querySelector('section:last-child');

    expect(reservations.textContent).toContain('Sedan');
    expect(reservations.textContent).toContain('1 day(s)');
  });
});
