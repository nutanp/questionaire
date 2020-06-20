import { TestBed, inject } from '@angular/core/testing';

import { QuestionnairApiService } from './questionnair-api.service';

describe('QuestionnairApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionnairApiService]
    });
  });

  it('should be created', inject([QuestionnairApiService], (service: QuestionnairApiService) => {
    expect(service).toBeTruthy();
  }));
});
