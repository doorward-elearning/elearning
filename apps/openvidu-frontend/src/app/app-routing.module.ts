import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoRoomComponent } from './video-room/video-room.component';

const routes: Routes = [{ path: '', component: VideoRoomComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
