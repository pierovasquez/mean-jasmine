import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

fdescribe('ApiService', () => {
  let service: ApiService;
  // TestBed creates the component and the new instances
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  it('should be created', () => {
    // const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should execute GET', () => {
      const result = 'testing';
      service.get('/test').subscribe(response => {
        expect(response).toBe(result);
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      console.log(req);
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });
  });
});
