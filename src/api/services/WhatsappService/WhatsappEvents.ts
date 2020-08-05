import { Message, Chat } from "@open-wa/wa-automate";
import playerService from "../PlayerService";
import SongDTO from "../../dtos/Player/SongDTO";
import appController from "../../app";
import Whatsapp from "./Whatsapp";

interface IEvent<callback> {
  [propery: string]: callback;
}

const events: IEvent<Function> = {
  onAck: (message: Message) => {},
  onAddedToGroup: (chat: Chat) => {},
  onAnyMessage: async (message: Message) => {
    let msg: string = message.body;
    console.log("message_recived: ", msg);
    let song: SongDTO;
    if (msg == "next") {
      song = await playerService.next();
    } else {
      await playerService.append({ query: msg });
      song = await playerService.play();
    }
    const wpp: Whatsapp = appController.Whatsapp;
    wpp.wpp.sendText(message.from, `Song Added: ${song.title}`);
  },
  onBattery: (battery: number) => {},
  onChatOpened: (chat: Chat) => {},
  // onChatState: (chatState: any) => {},
  // onContactAdded: (data: any) => {},
  onGlobalParicipantsChanged: (participantChangedEvent: any) => {},
  onIncomingCall: (call: any) => {},
  // onLiveLocation: (liveLocationChangedEvent: any) => {},
  onMessage: (message: Message) => {},
  // onParticipantsChanged: (participantChangedEvent: any) => {},
  onPlugged: (plugged: boolean) => {},
  // onRemovedFromGroup: (data: any) => {},
  onStateChanged: (state: string) => {},
  onStory: (story: any) => {},
};

export function registerEvents(client: any) {
  Object.keys(events).forEach((event: string) => {
    const callback: Function = events[event];
    client[event](callback);
  });
}
