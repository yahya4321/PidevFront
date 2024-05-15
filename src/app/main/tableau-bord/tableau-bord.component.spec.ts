import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBordComponent } from './tableau-bord.component';

describe('TableauBordComponent', () => {
  let component: TableauBordComponent;
  let fixture: ComponentFixture<TableauBordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauBordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
