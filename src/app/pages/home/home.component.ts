import {Component, ElementRef, ViewChild, ChangeDetectionStrategy, signal} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (this.bgVideo) {
      this.bgVideo.nativeElement.muted = true; // Програмно вимикаємо звук
      this.bgVideo.nativeElement.play().catch(error => {
        console.error('Автовідтворення заблоковано', error);
      });
    }
  }

  isExpanded = false;
}
