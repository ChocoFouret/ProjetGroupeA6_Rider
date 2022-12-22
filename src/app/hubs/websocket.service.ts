import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../environments/environment";
import {EventService} from "../company/event.service";
import {SessionService} from "../session/session.service";
import {NotificationsService} from "../util/notifications/notifications.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private connection: HubConnection | undefined;
  private component: any;

  constructor(private es: EventService,
              private session: SessionService,
              private notifications : NotificationsService) {
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.apiUrlServer + '/EventHub')
      .build();

    this.connection.on('updated', (dto) => {
      this.notifications.info("Modification de la demande.");
      this.component.localUpdate(dto);
    });

    this.connection.on('deleted', (id) => {
      this.component.localDelete(id);
    });

    this.connection.on('created', (dto) => {
      this.notifications.success("Création d'une demande.");
      this.component.localCreate(dto);
    });

    this.connection.start().then(() => {
      // console.log("Serveur connecté");
    })
      .then(() => {
        this.es.fetchHasAccount(this.session.getID()).subscribe(res => {
          this.connection?.invoke("JoinGroup", res[0].idCompanies + "").then(() => {
            // console.log("Groupe de la compagnie rejoint");
          });
        })
      })
      .catch(() => {});
  }

  init(component: any){
    this.component = component;
    if(this.connection == undefined){
      this.initWebSocket();
    }
  }
}
