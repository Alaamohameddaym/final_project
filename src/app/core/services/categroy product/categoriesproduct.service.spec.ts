import { TestBed } from '@angular/core/testing';

import { CategoriesproductService } from './categoriesproduct.service';

describe('CategoriesproductService', () => {
  let service: CategoriesproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
