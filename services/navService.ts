// Simple event emitter for side drawer toggling since we don't have a complex global state manager for UI
import { EventEmitter } from 'events';

export const uiEvents = new EventEmitter();

export const toggleDrawer = () => {
  uiEvents.emit('toggleDrawer');
};