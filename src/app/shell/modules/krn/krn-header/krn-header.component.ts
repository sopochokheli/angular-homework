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

      // Check if the data is already in localStorage
      const storedClientData = localStorage.getItem('clientData');

      if (storedClientData) {
        const clientData = JSON.parse(storedClientData);

        if (clientData.clientId == this.clientId) {
          this.clientName = clientData.clientName;
          this.plusPoints = clientData.plusPoints;
        } else {
          this.fetchClientDataFromService()
        }
      } else {
        this.fetchClientDataFromService();
      }
    });
  }

  fetchClientDataFromService() {
    this.clientsService.getClient(this.clientId ?? "").then(document => {
      this.clientName = document?.['firstName'] + ' ' + document?.['lastName'];
      this.plusPoints = document?.['plusPoints'];

      // Store in localStorage
      localStorage.setItem('clientData', JSON.stringify({
        clientId: this.clientId,
        clientName: this.clientName,
        plusPoints: this.plusPoints
      }));
    });
  }


  onLeaveClick() {
    localStorage.removeItem('clientData');
    this.router.navigate(['/bpm/bpm000']);
  }

  navigateWithParams(route: string) {
    this.router.navigate([route], {queryParamsHandling: 'preserve'});
  }
}
