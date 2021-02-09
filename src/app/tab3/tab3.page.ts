import { Component } from "@angular/core";
import { HelpersService } from "../services/helpers.service";
import { ServicesService } from "../services/services.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  showSpinner: boolean = true;
  infoContact: any = [];
  gallery: any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    autoplay: true,
  };
  constructor(private contactService: ServicesService,
    private helperService: HelpersService
    ) {
    this.getContactInfo();
    this.getGalleryImages();
    this.helperService.presentLoadingWithOptions();
  }

  getContactInfo() {
    this.contactService.getContactInfo().subscribe(
      (res) => {
        this.infoContact = res[0];
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGalleryImages() {
    this.contactService.getGalleryImages().subscribe(
      (res) => {
        this.gallery = res.map((obj) => {
          return { id: obj.id, image: obj.image };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateSite() {
    return window.open( "https://" + this.infoContact.site, "_blank");
  }

  contactWhatsaap() {
    let urlWhatsapp;
    urlWhatsapp = "https://wa.me/57" + this.infoContact.whatsapp;

    if (this.isMobileDevice()) {
      urlWhatsapp = "https://wa.me/57" + this.infoContact.whatsapp;
    } else {
      urlWhatsapp = "https://web.whatsapp.com/send?phone=+57" + this.infoContact.whatsapp;
    }
    return window.open(urlWhatsapp, "_blank");
  }

  isMobileDevice() {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/CriOS/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    );
  }
}
