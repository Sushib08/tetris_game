export const Action = {
  Left: "Left",
  Right: "Right",
  FastDrop: "FastDrop",
  SlowDrop: "SlowDrop",
  Pause: "Pause",
  Quit: "Quit",
  Rotate: "Rotate",
};

export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowUp: Action.Rotate,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyA: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop,
};

export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

export const actionForKey = (keyCode) => Key[keyCode];
