import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MeliService } from './meli.service';

describe('MeliService', () => {
  let service: MeliService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MeliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

