import { Component, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';
import { SourceService } from './source.service';

@Component({
  selector: 'app-rx-state-parent-connect-reactive',
  template: `
    <h2>Update values imperative Solution</h2>

    <div class="case-content">numberOfEmissions{{ selection1$ }}</div>
  `,
  changeDetection: environment.changeDetection
})
export class RxStateParentUpdateReactiveSolutionComponent {
  subscription = new Subscription();
  onDestroy$ = new Subject<void>();

  selection1$ = this.source.$.pipe(scan(numOfEmissions => ++numOfEmissions, 0));

  constructor(private source: SourceService) {}
}