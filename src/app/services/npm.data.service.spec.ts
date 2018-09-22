import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { NpmDataService } from './npm.data.service';

describe('NpmDataService', () => {
  let service: NpmDataService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        NpmDataService
      ]
    });
  });

  beforeEach(inject([NpmDataService, MockBackend], (npmDataService: NpmDataService, mockBackend: MockBackend) => {
    service = npmDataService;
    backend = mockBackend;
  }));

  const data = {
    'npm': { 'downloads': 70872, 'package': 'npm', 'start': '2018-09-15', 'end': '2018-09-15' },
    'express': { 'downloads': 368421, 'package': 'express', 'start': '2018-09-15', 'end': '2018-09-15' },
    'angular': { 'downloads': 14696, 'package': 'angular', 'start': '2018-09-15', 'end': '2018-09-15' }
  };
  const queryNpm = 'npm,express,angular';

  it('should call the npm api and return the search results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(data)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`https://api.npmjs.org/downloads/range/last-day/${queryNpm}`);
    });

    service
      .rangeLastMonth('npm,express,angular')
      .subscribe((res) => {
        expect(res).toEqual(data);
        done();
      });
  });

});
