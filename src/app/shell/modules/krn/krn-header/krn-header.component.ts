import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ClientsService} from "../../bpm/clients.service";

@Component({
  selector: 'app-krn-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './krn-header.component.html',
  styleUrl: './krn-header.component.css'
})
export class KrnHeaderComponent implements OnInit {
  clientId: string | null = null;
  clientName: string = "";
  plusPoints: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
      console.log('Client ID received:', this.clientId);
      this.clientsService.getClient(this.clientId ?? "").then(document => {
        this.clientName = document?.['firstName'] + ' ' +  document?.['lastName'];
        this.plusPoints = document?.['plusPoints'];
      });
    });
  }

  onLeaveClick() {

    this.router.navigate(['/bpm/bpm000']);
  }
}
