import { MemoryHistory, Location } from 'history';

export interface PageComponent {
  history: MemoryHistory;
  location: Location;
}
