import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../services/services.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  showSpinner: boolean = true;
  programs: any = [];
  constructor(private streamingService: ServicesService) { }

  ngOnInit() {
    this.getPrograms();
  }
  getPrograms() {
    this.streamingService.getPrograms().subscribe(
      (res) => {
        this.programs = res.map((obj) => {
          return {
            id: obj.id,
            nom: obj.nom,
            start_time: obj.start_time,
            end_time: obj.end_time,
            image: obj.image,
          };
        });
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
        this.showSpinner = false;
      }
    );
  }
}
