import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../environments/environment";
import {EventService} from "../company/event.service";
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private connection: HubConnection | undefined;
  private component: any;

  constructor(private es: EventService,
              private session: SessionService) {
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.apiUrlServer + '/EventHub')
      .build();

    this.connection.on('updated', (dto) => {
      this.component.localUpdate(dto);
    });

    this.connection.on('deleted', (id) => {
      this.component.localDelete(id);
    });

    this.connection.on('created', (dto) => {
      this.component.localCreate(dto);
    });

    this.connection.start().then(() => {
      console.log("Join hub");
    })
      .then(() => {
        this.es.fetchHasAccount(parseInt(this.session.getID())).subscribe(res => {
          this.connection?.invoke("JoinGroup", res[0].idCompanies + "").then(() => {
            console.log("Join group");
          });
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  init(component: any){
    this.component = component;
    this.initWebSocket();
  }
}
