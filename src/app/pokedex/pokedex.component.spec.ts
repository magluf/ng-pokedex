import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PokedexComponent } from './pokedex.component'

describe('PokedexComponent', () => {
  let component: PokedexComponent
  let fixture: ComponentFixture<PokedexComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PokedexComponent],
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
