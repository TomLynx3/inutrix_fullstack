import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHintsPageComponent } from './settings-hints-page.component';

describe('SettingsHintsPageComponent', () => {
  let component: SettingsHintsPageComponent;
  let fixture: ComponentFixture<SettingsHintsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsHintsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsHintsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
