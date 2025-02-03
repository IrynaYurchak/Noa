import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizationAdminComponent } from './autorization-admin.component';

describe('AutorizationAdminComponent', () => {
  let component: AutorizationAdminComponent;
  let fixture: ComponentFixture<AutorizationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizationAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutorizationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
