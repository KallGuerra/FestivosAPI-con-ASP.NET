import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarFestivosComponent } from './verificar-festivos.component';

describe('VerificarFestivosComponent', () => {
  let component: VerificarFestivosComponent;
  let fixture: ComponentFixture<VerificarFestivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarFestivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarFestivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
