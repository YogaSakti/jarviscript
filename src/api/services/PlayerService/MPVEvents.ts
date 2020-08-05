import playerService from ".";

interface IEventStatus {
  property: string;
  value: any;
}

interface IEvent<callback> {
  [propery: string]: callback;
}

const defaultEvents: Array<string> = [
  "mute",
  "pause",
  "duration",
  "volume",
  "filename",
  "path",
  "media-title",
  "playlist-pos",
  "playlist-count",
  "loop",
];

const events: IEvent<Function> = {
  "eof-reached": (value: any) => {
    if (value) playerService.next();
  },
  pause: (value: any) => {
    console.log("pause", value);
  },
};

function handleEvent({ property, value }: IEventStatus) {
  const callback: Function = events[property];
  if (callback) callback(value);
}

export function registerEvents(mpv: any) {
  Object.keys(events).forEach((property) => {
    if (!defaultEvents.includes(property)) mpv.observeProperty(property);
  });
  mpv.on("status", handleEvent);
}
