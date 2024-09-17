import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-starting',
  standalone: true,
  imports: [],
  templateUrl: './starting.component.html',
  styleUrl: './starting.component.scss'
})
export class StartingComponent implements OnInit {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      const targetRoute: string = resolvedData as string;
      this._router.navigate([targetRoute]);
    })
  }
}
