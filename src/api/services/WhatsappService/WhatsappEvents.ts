import { Message, Chat } from "@open-wa/wa-automate";
import playerService from "../PlayerService";
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

    let returnMsg: string;

    if (msg == "skip") {
      try {
        let song = await playerService.next();
        returnMsg = `Skiped, playing now: *${song.title}*`;
      } catch (error) {
        returnMsg = error.message;
      }
    } else if (msg == "prev") {
      try {
        let song = await playerService.prev();
        returnMsg = `Previous, playing now: *${song.title}*`;
      } catch (error) {
        returnMsg = error.message;
      }
    } else if (msg == "play") {
      try {
        await playerService.play();
        returnMsg = `Playig`;
      } catch (error) {
        returnMsg = error.message;
      }
    } else if (msg == "pause") {
      try {
        await playerService.pause();
        returnMsg = `Paused`;
      } catch (error) {
        returnMsg = error.message;
      }
    } else if (msg == "crear") {
      try {
        await playerService.clear();
        returnMsg = `Cleared queue`;
      } catch (error) {
        returnMsg = error.message;
      }
    } else {
      let result = await playerService.append({ query: msg });
      await playerService.play();
      returnMsg = `*${result.qtd_added}* song(s) added`;
      if (result.playlist_name)
        returnMsg += `\nPlaylist name: *${result.playlist_name}*`;
      returnMsg += `\nVia: *${result.service_name}*`;
    }

    const wpp: Whatsapp = appController.Whatsapp;
    wpp.wpp.sendText(message.from, returnMsg);
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
