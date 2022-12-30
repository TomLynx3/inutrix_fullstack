import {
  Component,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  SidemodalService,
  SideModalState,
} from '../services/sidemodal.service';

@Component({
  selector: 'app-sidemodal',
  templateUrl: './sidemodal.component.html',
  styleUrls: ['./sidemodal.component.scss'],
})
export class SidemodalComponent implements OnInit {
  public isMenuOpened: boolean = false;
  public width: string = '25rem';
  constructor(
    private readonly _sideModalService: SidemodalService,
    private ref: ViewContainerRef
  ) {
    this._sideModalService.subject.subscribe((state: SideModalState) => {
      ref.element.nativeElement.style.setProperty('--width', this.width);

      if (state === SideModalState.OPENING) {
        this.isMenuOpened = true;
      } else if (state === SideModalState.CLOSING) {
        this.isMenuOpened = false;
        this.addCloseAnimation();
      }
    });
  }

  ngOnInit(): void {}

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.isMenuOpened = false;
    this.addCloseAnimation();
  }

  public addCloseAnimation(): void {
    if (this.ref) {
      this.ref.element.nativeElement
        .querySelector('.modal-content')
        .classList.add('close-sidebar');

      setTimeout(() => {
        this._sideModalService.subject.next(SideModalState.CLOSED);
      }, 500);
    }
  }
}
